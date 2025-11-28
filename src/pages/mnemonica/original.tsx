import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { CardGrid, CardData } from '@site/src/components/MnemonicaStack/CardGrid';
import { StandardToMnemonicFlippableCard } from '@site/src/components/MnemonicaStack/FlippableCards/StandardToMnemonicFlippableCard';
import mnemonicaData from '@site/src/data/mnemonicaData.json';

export default function MnemonicaOriginalPage() {
  const cards: CardData[] = mnemonicaData.map((item, index) => ({
    card: item.card,
    position: index + 1,
  }));

  return (
    <Layout title="Mnemonica Stack - Original" description="Interactive tool to learn and practice the Mnemonica Stack card order">
      <main style={{ padding: '2rem' }}>
        <Heading as="h1">Mnemonica Stack</Heading>
        <p>Click any card to reveal its mnemonic peg image.</p>
        <CardGrid
          cards={cards}
          cardComponent={StandardToMnemonicFlippableCard}
          cardSize={150}
          gap="1.5rem"
        />
      </main>
    </Layout>
  );
}
