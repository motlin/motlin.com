import {usePluginData} from '@docusaurus/useGlobalData';
import { z } from 'zod';

export const GitHubRepoSchema = z.object({
  id: z.number(),
  node_id: z.string(),
  name: z.string(),
  full_name: z.string(),
  owner: z.object({
    login: z.string(),
    id: z.number(),
    node_id: z.string(),
    avatar_url: z.string(),
    gravatar_id: z.string(),
    url: z.string(),
    html_url: z.string(),
    type: z.string(),
  }),
  private: z.boolean(),
  html_url: z.string(),
  description: z.string().nullable(),
  fork: z.boolean(),
  url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),
  homepage: z.string().nullable(),
  size: z.number(),
  stargazers_count: z.number(),
  watchers_count: z.number(),
  language: z.string().nullable(),
  has_issues: z.boolean(),
  has_projects: z.boolean(),
  has_downloads: z.boolean(),
  has_wiki: z.boolean(),
  has_pages: z.boolean(),
  has_discussions: z.boolean().optional(),
  forks_count: z.number(),
  mirror_url: z.string().nullable(),
  archived: z.boolean(),
  disabled: z.boolean(),
  open_issues_count: z.number(),
  license: z.object({
    key: z.string(),
    name: z.string(),
    spdx_id: z.string(),
    url: z.string().nullable(),
    node_id: z.string(),
  }).nullable(),
  allow_forking: z.boolean().optional(),
  is_template: z.boolean().optional(),
  web_commit_signoff_required: z.boolean().optional(),
  topics: z.array(z.string()),
  visibility: z.string(),
  forks: z.number(),
  open_issues: z.number(),
  watchers: z.number(),
  default_branch: z.string(),
  score: z.number().optional(),
  openGraphImageUrl: z.string().optional(),
  open_graph_image_url: z.string().optional(),
  usesCustomOpenGraphImage: z.boolean().optional(),
});

export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

export function useGitHubRepos(): Record<string, GitHubRepo> {
  const data = usePluginData('github-repos-plugin') as Record<string, unknown>;
  if (!data) return {};

  const validRepos: Record<string, GitHubRepo> = {};

  for (const [key, value] of Object.entries(data)) {
    try {
      validRepos[key] = GitHubRepoSchema.parse(value);
    } catch (error) {
      console.error(`Failed to parse repo data for ${key}:`, error);
      throw error;
    }
  }

  return validRepos;
}
