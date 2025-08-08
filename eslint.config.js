// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from '@eslint/js';
import docusaurus from '@docusaurus/eslint-plugin';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    ignores: [
      'build/',
      '.docusaurus/',
      'node_modules/',
      'storybook-static/',
      '**/*.mdx',
      '**/*.md',
    ],
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      '@docusaurus': docusaurus,
      'import': importPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...docusaurus.configs.recommended.rules,
      '@docusaurus/no-html-links': 'error',
      '@docusaurus/prefer-docusaurus-heading': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
      '@docusaurus': docusaurus,
      'import': importPlugin,
    },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      ...docusaurus.configs.recommended.rules,
      '@docusaurus/no-html-links': 'error',
      '@docusaurus/prefer-docusaurus-heading': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
        }
      ],
    },
  },
  {
    files: ['src/stories/**/*', '.storybook/**/*'],
    rules: {
      '@docusaurus/no-html-links': 'off',
      '@docusaurus/prefer-docusaurus-heading': 'off',
    },
  },
  {
    files: ['eslint.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
];
