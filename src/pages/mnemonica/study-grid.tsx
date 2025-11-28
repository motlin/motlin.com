import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { StudyGridWithTransitions } from '@site/src/components/MnemonicaStack/StudyGridWithTransitions';
import mnemonicaData from '@site/src/data/mnemonicaData.json';

export default function StudyGridPage() {
  return (
    <Layout title="Mnemonica Stack - Study Grid" description="Study the Mnemonica Stack with cards and transitions">
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <Heading as="h1" style={{ textAlign: 'center', marginBottom: '1rem' }}>Study Grid with Transitions</Heading>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
          8-column grid showing all 52 cards interleaved with 52 transition images (104 items total).
          Cards start showing position numbers and flip to reveal the standard playing card.
          Transitions start blank and flip to reveal the transition image linking consecutive cards.
        </p>
        <StudyGridWithTransitions
          mnemonicaData={mnemonicaData}
          cardSize={120}
          transitionSize={80}
          gap="0.75rem"
        />
      </div>
    </Layout>
  );
}
