import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { StudyCarousel } from '@site/src/components/MnemonicaStack/StudyCarousel';
import mnemonicaData from '@site/src/data/mnemonicaData.json';

const convertCardNotation = (unicodeCard: string): string => {
  return unicodeCard
    .replace('♠', 'S')
    .replace('♥', 'H')
    .replace('♣', 'C')
    .replace('♦', 'D');
};

const mnemonicaCards = mnemonicaData.map((entry, index) => ({
  card: convertCardNotation(entry.card),
  position: index + 1,
}));

export default function StudyModePage() {
  return (
    <Layout title="Mnemonica Stack - Study Mode" description="Slideshow of all peg and transition images for memorization">
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Heading as="h1" style={{ textAlign: 'center', marginBottom: '1rem' }}>Mnemonica Study Mode</Heading>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
          Slideshow cycling through all 52 peg images and 52 transition images (104 slides total).
          Use the controls to navigate or enable autoplay for continuous review.
        </p>
        <StudyCarousel
          cards={mnemonicaCards}
          autoplay={false}
          interval={3000}
          showControls={true}
          size={400}
        />
      </div>
    </Layout>
  );
}
