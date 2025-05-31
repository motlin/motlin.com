import {usePluginData} from '@docusaurus/useGlobalData';
import { z } from 'zod';

// GitHub Profile schema based on actual API response
export const GitHubProfileSchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string(),
  html_url: z.string(),
  name: z.string().nullable(),
  company: z.string().nullable(),
  blog: z.string().nullable(),
  location: z.string().nullable(),
  email: z.string().nullable(),
  bio: z.string().nullable(),
  public_repos: z.number(),
  public_gists: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type GitHubProfile = z.infer<typeof GitHubProfileSchema>;

export function useGitHubUserProfile(): GitHubProfile {
  const data = usePluginData('github-user-profile-plugin');
  return GitHubProfileSchema.parse(data || {});
}
