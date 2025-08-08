import React from 'react';
import Layout from '@theme/Layout';
import MnemonicaRevealedMode from '@site/src/components/MnemonicaStack/MnemonicaRevealedMode';

export default function RevealedPage() {
  return (
    <Layout title="Mnemonica Stack - Revealed" description="See all cards in Mnemonica order with their positions">
      <MnemonicaRevealedMode />
    </Layout>
  );
}
