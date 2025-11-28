import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { CardGrid } from '@site/src/components/MnemonicaStack/CardGrid';
import { PegImageWithLabel } from '@site/src/components/MnemonicaStack/PegImageWithLabel';
import mnemonicaData from '@site/src/data/mnemonicaData.json';
import { getStandardDeckOrder, getMnemonicaPosition } from '@site/src/utils/mnemonicaUtils';

export default function PegsRevealedPage() {
  const standardDeck = getStandardDeckOrder(mnemonicaData);

  const cardsWithPositions = standardDeck.map((cardData) => ({
    card: cardData.card,
    position: getMnemonicaPosition(cardData, mnemonicaData),
  }));

  return (
    <Layout title="Mnemonica Stack - Pegs Revealed" description="View all 52 mnemonic images with their corresponding cards">
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <Heading as="h1">Pegs Revealed</Heading>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
          All 52 mnemonic peg images with their corresponding cards. Images shown in standard deck order.
        </p>
        <CardGrid
          cards={cardsWithPositions}
          cardComponent={PegImageWithLabel}
          columns={4}
          cardSize={250}
          gap="2rem"
        />
      </div>
    </Layout>
  );
}
