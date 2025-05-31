import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import portfolioData from './src/data/portfolio.json';

const config: Config = {
  title: 'motlin.com',
  tagline: 'developer productivity blog',
  favicon: 'img/motlin.com.png',

  url: 'https://motlin.com',
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'motlin',
  projectName: 'motlin.com',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Google Ads configuration
  headTags: [
    {
      tagName: 'script',
      attributes: {
        async: 'true',
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3146575260211386',
        crossorigin: 'anonymous',
      },
    },
  ],

  // Google Analytics configuration
  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'UA-4967748-1',
        anonymizeIP: true,
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
    ['./src/plugins/github-user-profile-plugin.ts', { username: portfolioData.profile.username }],
    './src/plugins/github-repos-plugin.ts',
  ],

  // Enable Mermaid diagrams
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid', '@saucelabs/theme-github-codeblock'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/motlin/motlin.com/edit/main/',
          // Show last update author and time
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          routeBasePath: 'docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/motlin/motlin.com/edit/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All our posts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/motlin-social-card.png',
    navbar: {
      title: 'motlin.com',
      logo: {
        alt: 'motlin.com Logo',
        src: 'img/motlin.com.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/portfolio', label: 'Portfolio', position: 'left'},
        {to: '/sick-picks', label: 'Sick Picks', position: 'left'},
        {
          href: 'https://github.com/motlin/motlin.com',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Git',
              to: '/docs/category/git',
            },
            {
              label: 'Maven',
              to: '/docs/category/maven',
            },
            {
              label: 'Logging',
              to: '/docs/category/logging',
            },
            {
              label: 'IntelliJ',
              to: '/docs/category/intellij',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Documentation',
              to: '/docs/',
            },
          ],
        },
        {
          title: 'Connect',
          items: portfolioData.profile.socialLinks
            .filter(link => ['GitHub', 'LinkedIn', 'Stack Overflow', 'Medium'].includes(link.platform))
            .map(link => ({
              label: link.platform,
              href: link.url,
            })),
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ${portfolioData.profile.name}. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.oneDark,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['java', 'shell-session', 'bash', 'toml', 'markdown', 'json'],
    },
    algolia: {
      appId: 'C2FFLRAS9H',
      apiKey: 'e55dde7380a510c51b3748b4bffdd9d1',
      indexName: 'motlin',
      contextualSearch: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
