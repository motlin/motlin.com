import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  "stories": [
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "staticDirs": ["../static"],
  viteFinal: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@site': path.resolve(__dirname, '../'),
      '@theme': path.resolve(__dirname, '../src/theme'),
      '@theme/Heading': path.resolve(__dirname, '../src/mocks/theme/Heading.tsx'),
      '@docusaurus/Link': path.resolve(__dirname, '../src/mocks/docusaurus/Link.tsx'),
      '@docusaurus/useGlobalData': path.resolve(__dirname, '../src/mocks/docusaurus/useGlobalData.ts'),
    };
    return config;
  }
};
export default config;
