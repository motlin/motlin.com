#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fetch from 'node-fetch';
import portfolioData from '../src/data/portfolio.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = path.join(__dirname, '..', '.github-cache');

interface Repository {
  full_name: string;
  openGraphImageUrl?: string;
  usesCustomOpenGraphImage?: boolean;
  [key: string]: any;
}

interface GitHubSearchResponse {
  items: Repository[];
  total_count: number;
}

interface GraphQLResponse {
  data?: {
    repository?: {
      openGraphImageUrl: string;
      usesCustomOpenGraphImage: boolean;
    };
  };
}

interface GitHubProfile {
  login: string;
  name: string;
  [key: string]: any;
}

async function ensureCacheDirectory() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    console.log(`Created cache directory: ${CACHE_DIR}`);
  }
}

async function downloadUserProfile(username: string): Promise<void> {
  console.log(`\n📥 Downloading GitHub profile for ${username}...`);

  const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    ...(githubToken && { 'Authorization': `token ${githubToken}` })
  };

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub profile: ${response.status} ${response.statusText}`);
    }

    const profile = await response.json() as GitHubProfile;
    const cachePath = path.join(CACHE_DIR, 'user-profile.json');

    fs.writeFileSync(cachePath, JSON.stringify(profile, null, 2));
    console.log(`✅ Saved user profile to ${cachePath}`);
  } catch (error) {
    console.error(`❌ Error downloading user profile:`, error);
    throw error;
  }
}

async function downloadRepositories(): Promise<void> {
  console.log('\n📥 Downloading repository data...');

  const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  console.log(`GitHub token available: ${githubToken ? 'Yes' : 'No'}`);

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    ...(githubToken && { 'Authorization': `token ${githubToken}` })
  };

  const repos = new Map<string, Repository>();
  const hardCodedOpenGraphUrls: Record<string, string> = portfolioData.openGraphImageUrls || {};

  const searchQuery = 'user:motlin user:liftwizard user:FactorioBlueprints is:public fork:false archived:false';
  const searchUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&per_page=100&sort=created&order=asc`;

  try {
    const searchResponse = await fetch(searchUrl, { headers });

    if (!searchResponse.ok) {
      throw new Error(`Failed to search repositories: ${searchResponse.status} ${searchResponse.statusText}`);
    }

    const searchData = await searchResponse.json() as GitHubSearchResponse;
    console.log(`Found ${searchData.items.length} repositories via search`);

    for (const repo of searchData.items) {
      try {
        const fullRepoResponse = await fetch(`https://api.github.com/repos/${repo.full_name}`, { headers });

        if (fullRepoResponse.ok) {
          const fullRepoData = await fullRepoResponse.json() as Repository;

          if (githubToken) {
            await fetchOpenGraphData(repo.full_name, fullRepoData, githubToken, hardCodedOpenGraphUrls);
          }

          repos.set(repo.full_name, fullRepoData);
          console.log(`✅ Fetched ${repo.full_name}`);
        } else {
          console.warn(`⚠️  Failed to fetch full data for ${repo.full_name}`);
          repos.set(repo.full_name, repo);
        }
      } catch (error) {
        console.warn(`⚠️  Error fetching ${repo.full_name}:`, error);
        repos.set(repo.full_name, repo);
      }
    }

    const portfolioProjects = [
      ...portfolioData.sections.flatMap((section: any) =>
        section.projects.filter((project: any) => project.githubRepo)
          .map((project: any) => project.githubRepo)
      )
    ];

    const additionalRepos = portfolioProjects.filter((repoName: string) =>
      !repos.has(repoName)
    );

    console.log(`\nFetching ${additionalRepos.length} additional repos from portfolio...`);

    for (const repoName of additionalRepos) {
      try {
        const response = await fetch(`https://api.github.com/repos/${repoName}`, { headers });

        if (response.ok) {
          const data = await response.json() as Repository;

          if (githubToken) {
            await fetchOpenGraphData(repoName, data, githubToken, hardCodedOpenGraphUrls);
          }

          repos.set(repoName, data);
          console.log(`✅ Fetched ${repoName}`);
        } else {
          console.warn(`⚠️  Failed to fetch ${repoName}: ${response.statusText}`);
        }
      } catch (error) {
        console.warn(`⚠️  Error fetching ${repoName}:`, error);
      }
    }

    const cachePath = path.join(CACHE_DIR, 'repositories.json');
    const reposObject = Object.fromEntries(repos);
    fs.writeFileSync(cachePath, JSON.stringify(reposObject, null, 2));
    console.log(`\n✅ Saved ${repos.size} repositories to ${cachePath}`);

    const reposWithOpenGraph = Array.from(repos.entries())
      .filter(([, data]) => data.openGraphImageUrl)
      .length;

    console.log(`\n📊 Summary:`);
    console.log(`   Total repos: ${repos.size}`);
    console.log(`   Repos with openGraphImageUrl: ${reposWithOpenGraph}`);

  } catch (error) {
    console.error(`❌ Error downloading repositories:`, error);
    throw error;
  }
}

async function fetchOpenGraphData(
  repoFullName: string,
  repoData: Repository,
  githubToken: string,
  hardCodedUrls: Record<string, string>
): Promise<void> {
  try {
    const [owner, name] = repoFullName.split('/');
    const graphqlQuery = {
      query: `
        query($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            openGraphImageUrl
            usesCustomOpenGraphImage
          }
        }
      `,
      variables: { owner, name }
    };

    const graphqlResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${githubToken}`
      },
      body: JSON.stringify(graphqlQuery)
    });

    if (graphqlResponse.ok) {
      const graphqlData = await graphqlResponse.json() as GraphQLResponse;
      if (graphqlData.data?.repository) {
        repoData.openGraphImageUrl = graphqlData.data.repository.openGraphImageUrl;
        repoData.usesCustomOpenGraphImage = graphqlData.data.repository.usesCustomOpenGraphImage;

        if (hardCodedUrls[repoFullName]) {
          const hardCoded = hardCodedUrls[repoFullName];
          const fetched = repoData.openGraphImageUrl;
          if (hardCoded !== fetched) {
            console.warn(`   ⚠️  OpenGraph URL mismatch for ${repoFullName}`);
          }
        }
      }
    }
  } catch {
    console.warn(`   ⚠️  Failed to fetch GraphQL data for ${repoFullName}`);
  }
}

async function main() {
  try {
    console.log('🚀 GitHub Data Downloader');
    console.log('========================\n');

    await ensureCacheDirectory();

    const username = portfolioData.profile.username;
    await downloadUserProfile(username);
    await downloadRepositories();

    console.log('\n✅ Download complete!');

    console.log(`\n💡 Tip: Set GITHUB_TOKEN environment variable to avoid rate limits.`);

  } catch (error) {
    console.error('\n❌ Download failed:', error);
    process.exit(1);
  }
}

main();
