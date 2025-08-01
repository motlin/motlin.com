const js = require('@eslint/js');
const docusaurus = require('@docusaurus/eslint-plugin');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');
const globals = require('globals');

module.exports = [
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
