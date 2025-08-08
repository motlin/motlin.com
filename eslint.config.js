const js = require('@eslint/js');
const docusaurus = require('@docusaurus/eslint-plugin');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');
const mdx = require('eslint-plugin-mdx');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    ignores: [
      'build/',
      '.docusaurus/',
      'node_modules/',
      'storybook-static/',
      'blog/2025-06-08-claude-code-configuration.mdx',
      'blog/2025-06-09-claude-code-configuration.mdx',
      'blog/2025-06-10-claude-code-workflow-commands.mdx',
      'blog/2025-06-11-claude-code-utility-commands.mdx',
      'blog/2025-07-07-claude-code-worktree.mdx',
      'blog/2025-07-08-claude-code-merge-conflicts.mdx',
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
    files: ['**/*.md', '**/*.mdx'],
    plugins: {
      mdx: mdx,
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
      parser: require('eslint-mdx'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    processor: 'mdx/remark',
    settings: {
      'mdx/code-blocks': true,
      'mdx/language-mapper': {},
    },
    rules: {
      ...docusaurus.configs.recommended.rules,
      'import/no-webpack-loader-syntax': 'off',
      '@docusaurus/no-html-links': 'error',
      '@docusaurus/prefer-docusaurus-heading': 'error',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'mdx/no-unused-expressions': 'off',
      'mdx/no-unescaped-entities': 'off',
    },
  },
  {
    files: ['eslint.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
];
