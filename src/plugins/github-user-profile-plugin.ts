import type { LoadContext, Plugin } from '@docusaurus/types';

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
      const fetch = (await import('node-fetch')).default;

      const profileResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!profileResponse.ok) {
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
