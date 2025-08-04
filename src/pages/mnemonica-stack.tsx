import React from 'react';
import Layout from '@theme/Layout';
import MnemonicaStack from '@site/src/components/MnemonicaStack';

export default function MnemonicaStackPage() {
  return (
    <Layout title="Mnemonica Stack" description="Interactive tool to learn and practice the Mnemonica Stack card order">
      <div style={{ backgroundColor: '#0a5f0a', minHeight: 'calc(100vh - 60px)', padding: '20px', display: 'flex', alignItems: 'center' }}>
        <MnemonicaStack />
      </div>
    </Layout>
  );
}
