import React from 'react';
import Layout from '@theme/Layout';
import PegsTestMode from '@site/src/components/MnemonicaStack/PegsTestMode';

export default function PegsTestPage() {
  return (
    <Layout title="Mnemonica Stack - Pegs Test" description="Test your memory of mnemonic images for each card">
      <PegsTestMode />
    </Layout>
  );
}
