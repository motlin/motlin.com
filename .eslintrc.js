module.exports = {
  root: true,
  extends: ['plugin:@docusaurus/recommended'],
  plugins: ['@docusaurus'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    {
      files: ['*.md', '*.mdx'],
      extends: ['plugin:mdx/recommended'],
      parser: 'eslint-mdx',
    },
  ],
  rules: {
    '@docusaurus/no-html-links': 'error',
    '@docusaurus/prefer-docusaurus-heading': 'error',
  },
};