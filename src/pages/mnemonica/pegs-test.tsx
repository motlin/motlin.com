import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { CardGrid } from '@site/src/components/MnemonicaStack/CardGrid';
import { StandardToMnemonicFlippableCard } from '@site/src/components/MnemonicaStack/FlippableCards/StandardToMnemonicFlippableCard';
import mnemonicaData from '@site/src/data/mnemonicaData.json';
import { getStandardDeckOrder, getMnemonicaPosition } from '@site/src/utils/mnemonicaUtils';

export default function PegsTestPage() {
  const standardDeck = getStandardDeckOrder(mnemonicaData);

  const cardsWithPositions = standardDeck.map((cardData) => ({
    card: cardData.card,
    position: getMnemonicaPosition(cardData, mnemonicaData),
  }));

  return (
    <Layout title="Mnemonica Stack - Pegs Test" description="Test your memory of mnemonic images for each card">
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <Heading as="h1">Pegs Test Mode</Heading>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
          Click any card to reveal its mnemonic peg. Cards are shown in standard deck order.
        </p>
        <CardGrid
          cards={cardsWithPositions}
          cardComponent={StandardToMnemonicFlippableCard}
          columns={13}
          cardSize={120}
          gap="1rem"
        />
      </div>
    </Layout>
  );
}
