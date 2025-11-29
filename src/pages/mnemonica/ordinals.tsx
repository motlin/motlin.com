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
      <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
        <Heading as="h1" style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Position Practice Mode</Heading>
        <p style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
          Test your knowledge of all 52 positions in the mnemonica stack. Given a position number, identify which card is at that position.
        </p>
        <PositionQuiz
          cards={mnemonicaCards}
          mode="position-to-card"
          showFeedback={true}
          shuffleQuestions={true}
          size={140}
        />
      </div>
    </Layout>
  );
}
