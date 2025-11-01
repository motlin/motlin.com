import type { LoadContext, Plugin } from '@docusaurus/types';
import fs from 'node:fs';
import path from 'node:path';

interface GitHubProfilePluginOptions {
  username: string;
}

export default function githubProfilePlugin(
  context: LoadContext,
  options: GitHubProfilePluginOptions
): Plugin {
  const { username } = options;

  if (!username) {
    throw new Error('github-user-profile-plugin requires a username option');
  }

  return {
    name: 'github-user-profile-plugin',
    async loadContent() {
      const cacheDir = path.join(context.siteDir, '.github-cache');
      const cachePath = path.join(cacheDir, 'user-profile.json');

      if (fs.existsSync(cachePath)) {
        console.log(`📝 GitHub User Profile Plugin: Using cached data from ${cachePath}`);
        const cachedData = fs.readFileSync(cachePath, 'utf-8');
        return JSON.parse(cachedData);
      }

      console.warn('📝 GitHub User Profile Plugin: No cache found, fetching from API...');

      const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        ...(githubToken && { 'Authorization': `token ${githubToken}` })
      };

      try {
        const profileResponse = await fetch(`https://api.github.com/users/${username}`, { headers });

        if (!profileResponse.ok) {
          const rateLimitRemaining = profileResponse.headers.get('x-ratelimit-remaining');
          if (profileResponse.status === 403 && rateLimitRemaining === '0') {
            console.warn(`⚠️  GitHub API rate limit exceeded for user profile fetch. Using fallback empty profile.`);
            return {
              login: username,
              id: 0,
              avatar_url: `https://github.com/${username}.png`,
              html_url: `https://github.com/${username}`,
              name: null,
              company: null,
              blog: null,
              location: null,
              email: null,
              bio: null,
              public_repos: 0,
              public_gists: 0,
              followers: 0,
              following: 0,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
          }

          console.warn(`Failed to fetch GitHub profile for ${username}: ${profileResponse.statusText}`);
          return {
            login: username,
            id: 0,
            avatar_url: `https://github.com/${username}.png`,
            html_url: `https://github.com/${username}`,
            name: null,
            company: null,
            blog: null,
            location: null,
            email: null,
            bio: null,
            public_repos: 0,
            public_gists: 0,
            followers: 0,
            following: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
        }

        const profile = await profileResponse.json();
        return profile;
      } catch (error) {
        console.warn(`Error fetching GitHub profile for ${username}:`, error);
        return {
          login: username,
          id: 0,
          avatar_url: `https://github.com/${username}.png`,
          html_url: `https://github.com/${username}`,
          name: null,
          company: null,
          blog: null,
          location: null,
          email: null,
          bio: null,
          public_repos: 0,
          public_gists: 0,
          followers: 0,
          following: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      }
    },
    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData(content);
    },
  };
}
