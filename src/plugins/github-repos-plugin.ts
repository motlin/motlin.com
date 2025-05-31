import type { LoadContext, Plugin } from '@docusaurus/types';

interface GitHubReposPluginOptions {
  // Add options here if needed
}

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

export default function githubReposPlugin(
  context: LoadContext,
  options: GitHubReposPluginOptions
): Plugin {
  return {
    name: 'github-repos-plugin',
    async loadContent() {
      console.log('\n🚀 GitHub Repos Plugin: Starting to fetch repository data...');

      const fetch = (await import('node-fetch')).default;

      const repos = new Map<string, Repository>();

      // Load hard-coded openGraphImageUrl values from portfolio.json
      const portfolioData = require('../data/portfolio.json');
      const hardCodedOpenGraphUrls: Record<string, string> = portfolioData.openGraphImageUrls;

      // Check for GitHub token in environment variables
      const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
      console.log(`GitHub token available: ${githubToken ? 'Yes' : 'No'}`);

      // Headers for API requests
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        ...(githubToken && { 'Authorization': `token ${githubToken}` })
      };

      // Headers without auth for fallback
      const headersNoAuth: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json'
      };

      // GraphQL endpoint
      const graphqlUrl = 'https://api.github.com/graphql';

      // Use GitHub search API to find all public, non-fork, non-archived repos for motlin, liftwizard, and FactorioBlueprints
      const searchQuery = 'user:motlin user:liftwizard user:FactorioBlueprints is:public fork:false archived:false';
      const searchUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&per_page=100&sort=created&order=asc`;

      let searchData: GitHubSearchResponse;

      const searchResponse = await fetch(searchUrl, { headers });
      if (!searchResponse.ok) {
        console.warn(`Failed to search repositories: ${searchResponse.statusText}`);
        // If unauthorized, try without token
        if (searchResponse.status === 401 && githubToken) {
          console.log('Retrying without authentication token...');
          const retryResponse = await fetch(searchUrl, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
          });
          if (!retryResponse.ok) {
            console.warn(`Retry also failed: ${retryResponse.statusText}`);
            return {};
          }
          searchData = await retryResponse.json() as GitHubSearchResponse;
        } else {
          return {};
        }
      } else {
        searchData = await searchResponse.json() as GitHubSearchResponse;
      }

      // Fetch full repository data for each repo
      for (const repo of searchData.items) {
        try {
          let fullRepoResponse = await fetch(`https://api.github.com/repos/${repo.full_name}`, { headers });
          if (!fullRepoResponse.ok && fullRepoResponse.status === 401 && githubToken) {
            // Retry without auth
            fullRepoResponse = await fetch(`https://api.github.com/repos/${repo.full_name}`, { headers: headersNoAuth });
          }

          if (fullRepoResponse.ok) {
            const fullRepoData = await fullRepoResponse.json() as Repository;

            // Try to fetch openGraphImageUrl via GraphQL if we have a token
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

                    // Log the fetched openGraphImageUrl for debugging
                    console.log(`[${repo.full_name}] GraphQL openGraphImageUrl: ${fullRepoData.openGraphImageUrl}`);
                    console.log(`[${repo.full_name}] Uses custom image: ${fullRepoData.usesCustomOpenGraphImage}`);

                    // Compare with hard-coded value if available
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
            // Fallback to search data if individual fetch fails
            repos.set(repo.full_name, repo);
          }
        } catch (error) {
          console.warn(`Failed to fetch full data for ${repo.full_name}:`, error);
          repos.set(repo.full_name, repo);
        }
      }

      console.log(`Found ${searchData.items.length} repositories via search`);
      if (!githubToken) {
        console.log('Note: Set GITHUB_TOKEN or GH_TOKEN environment variable to fetch repository social preview images');
      }

      // Extract all GitHub repos referenced in portfolio.json
      const portfolioProjects = [
        ...portfolioData.sections.flatMap((section: any) =>
          section.projects.filter((project: any) => project.githubRepo)
            .map((project: any) => project.githubRepo)
        )
      ];

      // Find repos that weren't included in the search results
      const additionalRepos = portfolioProjects.filter((repoName: string) =>
        !repos.has(repoName)
      );

      console.log(`\nFetching ${additionalRepos.length} additional repos from portfolio...`);

      // Fetch each additional repo
      for (const repoName of additionalRepos) {
        try {
          let response = await fetch(`https://api.github.com/repos/${repoName}`, { headers });
          if (!response.ok && response.status === 401 && githubToken) {
            // Retry without auth
            response = await fetch(`https://api.github.com/repos/${repoName}`, { headers: headersNoAuth });
          }

          if (response.ok) {
            const data = await response.json() as Repository;
            console.log(`✓ Fetched ${repoName}`);

            // Try to fetch openGraphImageUrl via GraphQL if we have a token
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

                    // Log the fetched openGraphImageUrl for debugging
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
            console.warn(`Failed to fetch ${repoName}: ${response.statusText}`);
          }
        } catch (error) {
          console.warn(`Failed to fetch ${repoName}:`, error);
        }
      }

      // Summary of repositories with openGraphImageUrl
      console.log('\n=== OpenGraph Image URL Summary ===');
      const reposWithOpenGraph = Array.from(repos.entries())
        .filter(([_, data]) => data.openGraphImageUrl)
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
