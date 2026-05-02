import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const BLOG_DIR = join(__dirname, '../../blog');
const GITHUB_ORGS = ['motlin', 'liftwizard', 'eclipse-collections'];
const URL_REGEX = /https?:\/\/github\.com\/[^\s)"'>]+/g;

function extractGitHubUrls(): Map<string, string[]> {
  const urlToFiles = new Map<string, string[]>();

  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  for (const file of files) {
    const content = readFileSync(join(BLOG_DIR, file), 'utf-8');
    const matches = content.match(URL_REGEX) ?? [];

    for (const rawUrl of matches) {
      const url = rawUrl.replace(/[.),]+$/, '');

      const orgMatch = url.match(/github\.com\/([^/]+)/);
      if (!orgMatch || !GITHUB_ORGS.includes(orgMatch[1])) continue;

      const existing = urlToFiles.get(url) ?? [];
      if (!existing.includes(file)) {
        existing.push(file);
      }
      urlToFiles.set(url, existing);
    }
  }

  return urlToFiles;
}

const urlToFiles = extractGitHubUrls();

describe('blog external GitHub links', { timeout: 30_000 }, () => {
  const entries = [...urlToFiles.entries()];

  it.concurrent.each(entries)('%s', async (url: string) => {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
    });

    expect(response.status, `${url} returned ${response.status}`).not.toBe(404);
  });
});
