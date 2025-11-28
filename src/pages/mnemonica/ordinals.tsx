import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { PositionQuiz } from '@site/src/components/MnemonicaStack/PositionQuiz';
import mnemonicaData from '@site/src/data/mnemonicaData.json';

const convertCardNotation = (unicodeCard: string): string => {
  return unicodeCard
    .replace('♠', 'S')
    .replace('♥', 'H')
    .replace('♣', 'C')
    .replace('♦', 'D');
};

export default function OrdinalsPage() {
  const mnemonicaCards = mnemonicaData.map((entry, index) => ({
    card: convertCardNotation(entry.card),
    position: index + 1,
  }));

  return (
    <Layout title="Mnemonica Stack - Ordinals" description="Practice with ordinal positions and their corresponding cards">
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Heading as="h1">Position Practice Mode</Heading>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
          Test your knowledge of all 52 positions in the mnemonica stack. Given a position number, identify which card is at that position.
        </p>
        <PositionQuiz
          cards={mnemonicaCards}
          mode="position-to-card"
          showFeedback={true}
          shuffleQuestions={true}
          size={200}
        />
      </div>
    </Layout>
  );
}
