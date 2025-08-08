import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './index.module.css';

export default function MnemonicaIndex() {
  const modes = [
    {
      title: 'Original Mode',
      path: '/mnemonica/original',
      description: 'Interactive card grid with flip animations to explore the Mnemonica Stack'
    },
    {
      title: 'Pegs Test',
      path: '/mnemonica/pegs-test',
      description: 'Test your memory by seeing cards in standard deck order and recalling their mnemonic images'
    },
    {
      title: 'Pegs Revealed',
      path: '/mnemonica/pegs-revealed',
      description: 'View all 52 mnemonic images with their corresponding cards'
    },
    {
      title: 'Ordinals',
      path: '/mnemonica/ordinals',
      description: 'Practice with ordinal positions (1-52) and reveal their corresponding cards'
    },
    {
      title: 'Revealed',
      path: '/mnemonica/revealed',
      description: 'See all cards in Mnemonica order with their positions and mnemonic names'
    },
    {
      title: 'Pegs Navigation',
      path: '/mnemonica/pegs',
      description: 'Navigate through the stack with previous/next cards and transition images'
    },
    {
      title: 'Study Mode',
      path: '/mnemonica/study',
      description: 'Slideshow of all 104 peg and transition images for memorization'
    }
  ];

  return (
    <Layout title="Mnemonica Stack" description="Master the Mnemonica Stack with various practice modes">
      <div className={styles.container}>
        <Heading as="h1" className={styles.title}>Mnemonica Stack Practice Modes</Heading>
        <p className={styles.subtitle}>Choose a practice mode to master the Mnemonica Stack</p>

        <div className={styles.modeGrid}>
          {modes.map((mode) => (
            <Link key={mode.path} to={mode.path} className={styles.modeCard}>
              <Heading as="h3" className={styles.modeTitle}>{mode.title}</Heading>
              <p className={styles.modeDescription}>{mode.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
