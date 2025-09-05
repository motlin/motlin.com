import React from 'react';
import Layout from '@theme/Layout';
import MnemonicaPegsMode from '@site/src/components/MnemonicaStack/MnemonicaPegsMode';

export default function PegsNavigationPage() {
  return (
    <Layout title="Mnemonica Stack - Pegs Navigation" description="Navigate through the stack with previous/next cards and transitions">
      <MnemonicaPegsMode />
    </Layout>
  );
}
