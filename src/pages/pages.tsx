import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

interface PageItem {
  title: string;
  description: string;
  link: string;
  emoji?: string;
}

const pages: PageItem[] = [
  {
    title: 'Portfolio',
    description: 'Professional work, open source projects, and talks',
    link: '/portfolio',
    emoji: '💼'
  },
  {
    title: 'Sick Picks',
    description: 'Personal recommendations for tools, products, and resources',
    link: '/sick-picks',
    emoji: '🎧'
  },
  {
    title: 'Grid Lines',
    description: 'A puzzle game where you draw lines through all connections on a grid',
    link: '/lines',
    emoji: '🎮'
  },
  {
    title: 'Mnemonica Stack',
    description: 'Interactive card magic trainer for memorizing deck positions',
    link: '/mnemonica-stack',
    emoji: '🃏'
  }
];

export default function PagesIndex() {
  return (
    <Layout
      title="Pages"
      description="Explore all pages on motlin.com">
      <main className="container margin-vert--lg">
        <Heading as="h1">📑 Pages Index</Heading>
        <p className="text--lg margin-bottom--lg">
          Explore various tools, games, and resources available on this site.
        </p>

        <div className="row">
          {pages.map((page, idx) => (
            <div key={idx} className="col col--6 margin-bottom--lg">
              <div className="card shadow--md">
                <div className="card__header">
                  <Heading as="h2">
                    {page.emoji && <span className="margin-right--sm">{page.emoji}</span>}
                    {page.title}
                  </Heading>
                </div>
                <div className="card__body">
                  <p>{page.description}</p>
                </div>
                <div className="card__footer">
                  <Link
                    className="button button--primary button--block"
                    to={page.link}>
                    Visit Page
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
