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
      const fetch = (await import('node-fetch')).default;

      const profileResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!profileResponse.ok) {
        if (profileResponse.status === 403 || profileResponse.status === 429) {
          console.warn(`⚠️  GitHub API rate limit exceeded for ${username}, using fallback data`);
          return {
            login: username,
            id: 0,
            avatar_url: `https://github.com/${username}.png`,
            html_url: `https://github.com/${username}`,
            name: username,
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
            updated_at: new Date().toISOString(),
          };
        }
        throw new Error(`Failed to fetch GitHub profile for ${username}: ${profileResponse.statusText}`);
      }

      const profile = await profileResponse.json();

      return profile;
    },
    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData(content);
    },
  };
}
