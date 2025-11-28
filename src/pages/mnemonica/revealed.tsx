import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { CardGrid } from '@site/src/components/MnemonicaStack/CardGrid';
import { CompactCardWithLabel } from '@site/src/components/MnemonicaStack/CompactCardWithLabel';
import mnemonicaData from '@site/src/data/mnemonicaData.json';

export default function RevealedPage() {
  const cardsWithPositions = mnemonicaData.map((cardData, index) => ({
    card: cardData.card,
    position: index + 1,
  }));

  return (
    <Layout title="Mnemonica Stack - Revealed" description="See all cards in Mnemonica order with their positions">
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <Heading as="h1">Mnemonica Revealed</Heading>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
          All 52 cards shown in Mnemonica stack order with positions and mnemonic pegs.
        </p>
        <CardGrid
          cards={cardsWithPositions}
          cardComponent={CompactCardWithLabel}
          columns={4}
          cardSize={250}
          gap="2rem"
        />
      </div>
    </Layout>
  );
}
