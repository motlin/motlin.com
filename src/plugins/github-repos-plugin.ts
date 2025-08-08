import type { Plugin } from '@docusaurus/types';
import fs from 'node:fs';
import path from 'node:path';


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

export default function githubReposPlugin(): Plugin {
  return {
    name: 'github-repos-plugin',
    async loadContent() {
      console.log('\n📦 GitHub Repos Plugin: Initializing...');

      const cacheDir = path.join(process.cwd(), '.github-cache');
      const cachePath = path.join(cacheDir, 'repositories.json');

      if (fs.existsSync(cachePath)) {
        console.log(`📦 GitHub Repos Plugin: Using cached data from ${cachePath}`);
        const cachedData = fs.readFileSync(cachePath, 'utf-8');
        const repos = JSON.parse(cachedData);

        const repoCount = Object.keys(repos).length;
        const reposWithOpenGraph = Object.values(repos).filter((repo: any) => repo.openGraphImageUrl).length;

        console.log(`📦 GitHub Repos Plugin: ${repoCount} repos cached (${reposWithOpenGraph} with OpenGraph images)`);

        return repos;
      }

      console.warn('📦 GitHub Repos Plugin: No cache found, fetching from API...');

      const fetch = (await import('node-fetch')).default;

      const repos = new Map<string, Repository>();

      const portfolioData = require('../data/portfolio.json');
      const hardCodedOpenGraphUrls: Record<string, string> = portfolioData.openGraphImageUrls;

      const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
      console.log(`GitHub token available: ${githubToken ? 'Yes' : 'No'}`);

      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        ...(githubToken && { 'Authorization': `token ${githubToken}` })
      };

      const headersNoAuth: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json'
      };

      const graphqlUrl = 'https://api.github.com/graphql';

      const searchQuery = 'user:motlin user:liftwizard user:FactorioBlueprints is:public fork:false archived:false';
      const searchUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&per_page=100&sort=created&order=asc`;

      let searchData: GitHubSearchResponse;

      const searchResponse = await fetch(searchUrl, { headers });
      if (!searchResponse.ok) {
        console.warn(`📦 GitHub Repos Plugin: Search failed - ${searchResponse.statusText}`);
        if (searchResponse.status === 401 && githubToken) {
          console.log('📦 GitHub Repos Plugin: Retrying without authentication token...');
          const retryResponse = await fetch(searchUrl, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
          });
          if (!retryResponse.ok) {
            console.warn(`📦 GitHub Repos Plugin: Retry also failed - ${retryResponse.statusText}`);
            return {};
          }
          searchData = await retryResponse.json() as GitHubSearchResponse;
        } else {
          return {};
        }
      } else {
        searchData = await searchResponse.json() as GitHubSearchResponse;
      }

      for (const repo of searchData.items) {
        try {
          let fullRepoResponse = await fetch(`https://api.github.com/repos/${repo.full_name}`, { headers });
          if (!fullRepoResponse.ok && fullRepoResponse.status === 401 && githubToken) {
            fullRepoResponse = await fetch(`https://api.github.com/repos/${repo.full_name}`, { headers: headersNoAuth });
          }

          if (fullRepoResponse.ok) {
            const fullRepoData = await fullRepoResponse.json() as Repository;

            if (githubToken) {
              try {
                const [owner, name] = repo.full_name.split('/');
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

                const graphqlResponse = await fetch(graphqlUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${githubToken}`
                  },
                  body: JSON.stringify(graphqlQuery)
                });

                if (graphqlResponse.ok) {
                  const graphqlData = await graphqlResponse.json() as GraphQLResponse;
                  if (graphqlData.data && graphqlData.data.repository) {
                    fullRepoData.openGraphImageUrl = graphqlData.data.repository.openGraphImageUrl;
                    fullRepoData.usesCustomOpenGraphImage = graphqlData.data.repository.usesCustomOpenGraphImage;

                    console.log(`[${repo.full_name}] GraphQL openGraphImageUrl: ${fullRepoData.openGraphImageUrl}`);
                    console.log(`[${repo.full_name}] Uses custom image: ${fullRepoData.usesCustomOpenGraphImage}`);

                    if (hardCodedOpenGraphUrls[repo.full_name]) {
                      const hardCoded = hardCodedOpenGraphUrls[repo.full_name];
                      const fetched = fullRepoData.openGraphImageUrl;
                      if (hardCoded !== fetched) {
                        console.warn(`[${repo.full_name}] MISMATCH in openGraphImageUrl:`);
                        console.warn(`  Hard-coded: ${hardCoded}`);
                        console.warn(`  Fetched:    ${fetched}`);
                      } else {
                        console.log(`[${repo.full_name}] ✓ openGraphImageUrl matches hard-coded value`);
                      }
                    }
                  }
                }
              } catch (graphqlError: any) {
                console.warn(`Failed to fetch GraphQL data for ${repo.full_name}:`, graphqlError.message);
              }
            }

            repos.set(repo.full_name, fullRepoData);
          } else {
            repos.set(repo.full_name, repo);
          }
        } catch (error) {
          console.warn(`Failed to fetch full data for ${repo.full_name}:`, error);
          repos.set(repo.full_name, repo);
        }
      }

      console.log(`📦 GitHub Repos Plugin: Found ${searchData.items.length} repositories via search`);
      if (!githubToken) {
        console.log('📦 GitHub Repos Plugin: Note - Set GITHUB_TOKEN or GH_TOKEN environment variable to fetch repository social preview images');
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

      console.log(`📦 GitHub Repos Plugin: Fetching ${additionalRepos.length} additional repos from portfolio...`);

      for (const repoName of additionalRepos) {
        try {
          let response = await fetch(`https://api.github.com/repos/${repoName}`, { headers });
          if (!response.ok && response.status === 401 && githubToken) {
            response = await fetch(`https://api.github.com/repos/${repoName}`, { headers: headersNoAuth });
          }

          if (response.ok) {
            const data = await response.json() as Repository;
            console.log(`📦 GitHub Repos Plugin: ✓ Fetched ${repoName}`);

            if (githubToken) {
              try {
                const [owner, name] = repoName.split('/');
                const graphqlQuery = {
                  query: `
                    query {
                      repository(owner: "${owner}", name: "${name}") {
                        openGraphImageUrl
                        usesCustomOpenGraphImage
                      }
                    }
                  `
                };

              const graphqlResponse = await fetch(graphqlUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `bearer ${githubToken}`
                },
                body: JSON.stringify(graphqlQuery)
              });

                if (graphqlResponse.ok) {
                  const graphqlData = await graphqlResponse.json() as GraphQLResponse;
                  if (graphqlData.data && graphqlData.data.repository) {
                    data.openGraphImageUrl = graphqlData.data.repository.openGraphImageUrl;
                    data.usesCustomOpenGraphImage = graphqlData.data.repository.usesCustomOpenGraphImage;

                    console.log(`[${repoName}] GraphQL openGraphImageUrl: ${data.openGraphImageUrl}`);
                    console.log(`[${repoName}] Uses custom image: ${data.usesCustomOpenGraphImage}`);
                  }
                }
              } catch (graphqlError: any) {
                console.warn(`Failed to fetch GraphQL data for ${repoName}:`, graphqlError.message);
              }
            }

            repos.set(repoName, data);
            console.log(`Stored ${repoName} with language: ${data.language || 'none'}, license: ${data.license?.name || 'none'}`);
          } else {
            console.warn(`📦 GitHub Repos Plugin: Failed to fetch ${repoName} - ${response.statusText}`);
          }
        } catch (error) {
          console.warn(`📦 GitHub Repos Plugin: Failed to fetch ${repoName} -`, error);
        }
      }

      console.log('\n=== OpenGraph Image URL Summary ===');
      const reposWithOpenGraph = Array.from(repos.entries())
        .filter(([, data]) => data.openGraphImageUrl)
        .map(([name, data]) => ({
          name,
          url: data.openGraphImageUrl,
          custom: data.usesCustomOpenGraphImage
        }));

      console.log(`Total repos: ${repos.size}`);
      console.log(`Repos with openGraphImageUrl: ${reposWithOpenGraph.length}`);

      if (reposWithOpenGraph.length > 0) {
        console.log('\nRepositories with OpenGraph images:');
        reposWithOpenGraph.forEach(repo => {
          console.log(`  - ${repo.name}: ${repo.custom ? 'Custom' : 'Default'} image`);
          console.log(`    URL: ${repo.url}`);
        });
      }

      return Object.fromEntries(repos);
    },
    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData(content);
    },
  };
}
