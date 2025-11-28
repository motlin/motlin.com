import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { PositionQuiz } from '@site/src/components/MnemonicaStack/PositionQuiz';
import mnemonicaData from '@site/src/data/mnemonicaData.json';

const mnemonicaCards = mnemonicaData.map((entry, index) => ({
  card: entry.card,
  position: index + 1,
}));

export default function QuizPage() {
  return (
    <Layout title="Mnemonica Stack - Quiz" description="Test your knowledge of the Mnemonica Stack">
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Heading as="h1" style={{ textAlign: 'center', marginBottom: '1rem' }}>Mnemonica Quiz</Heading>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
          Test your recall of the Mnemonica Stack. Answer by typing the card (e.g., 4C, QH) or position number.
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
