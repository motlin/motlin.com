import React from 'react';
import Layout from '@theme/Layout';
import PegsRevealedMode from '@site/src/components/MnemonicaStack/PegsRevealedMode';

export default function PegsRevealedPage() {
  return (
    <Layout title="Mnemonica Stack - Pegs Revealed" description="View all 52 mnemonic images with their corresponding cards">
      <PegsRevealedMode />
    </Layout>
  );
}
