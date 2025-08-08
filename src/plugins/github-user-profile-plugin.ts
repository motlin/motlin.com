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
        console.log(`✅ Using cached GitHub profile from ${cachePath}`);
        const cachedData = fs.readFileSync(cachePath, 'utf-8');
        return JSON.parse(cachedData);
      }

      console.warn('⚠️  No cached GitHub profile found, fetching from API...');

      try {
        const fetch = (await import('node-fetch')).default;

        const profileResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!profileResponse.ok) {
          if (profileResponse.status === 403 && profileResponse.statusText === 'rate limit exceeded') {
            console.warn(`GitHub API rate limit exceeded for user ${username}, using fallback data`);
            return {
              login: username,
              id: 1,
              avatar_url: 'https://github.com/github.png',
              html_url: `https://github.com/${username}`,
              name: 'Craig Motlin',
              company: null,
              blog: null,
              location: null,
              email: null,
              bio: 'Software Engineer',
              public_repos: 0,
              public_gists: 0,
              followers: 0,
              following: 0,
              created_at: '2000-01-01T00:00:00Z',
              updated_at: '2000-01-01T00:00:00Z',
            };
          }
          throw new Error(`Failed to fetch GitHub profile for ${username}: ${profileResponse.statusText}`);
        }

        const profile = await profileResponse.json();
        return profile;
      } catch (error: any) {
        if (error.message?.includes('rate limit exceeded')) {
          console.warn(`GitHub API rate limit exceeded for user ${username}, using fallback data`);
          return {
            login: username,
            id: 1,
            avatar_url: 'https://github.com/github.png',
            html_url: `https://github.com/${username}`,
            name: 'Craig Motlin',
            company: null,
            blog: null,
            location: null,
            email: null,
            bio: 'Software Engineer',
            public_repos: 0,
            public_gists: 0,
            followers: 0,
            following: 0,
            created_at: '2000-01-01T00:00:00Z',
            updated_at: '2000-01-01T00:00:00Z',
          };
        }
        throw error;
      }
    },
    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData(content);
    },
  };
}
