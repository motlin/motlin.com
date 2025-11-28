import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { TestGridCardToMnemonic } from '@site/src/components/MnemonicaStack/TestGridCardToMnemonic';
import mnemonicaData from '@site/src/data/mnemonicaData.json';

export default function TestMnemonicPage() {
  return (
    <Layout title="Mnemonica Stack - Card to Mnemonic" description="Test your recall of mnemonic peg images">
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Heading as="h1" style={{ textAlign: 'center', marginBottom: '1rem' }}>Card to Mnemonic Test Grid</Heading>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
          Cards shown in standard deck order. Click any card to reveal its mnemonic peg image.
          Test your recall of what mnemonic image is associated with each card.
        </p>
        <TestGridCardToMnemonic
          mnemonicaData={mnemonicaData}
          cardSize={150}
          gap="1.5rem"
        />
      </div>
    </Layout>
  );
}
