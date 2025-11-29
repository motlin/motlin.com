import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { TestGridCardToMnemonic } from '@site/src/components/MnemonicaStack/TestGridCardToMnemonic';
import mnemonicaData from '@site/src/data/mnemonicaData.json';
import styles from './test-grid.module.css';

export default function TestMnemonicPage() {
  return (
    <Layout title="Mnemonica Stack - Card to Mnemonic" description="Test your recall of mnemonic peg images">
      <div className={styles.container}>
        <Heading as="h1" className={styles.heading}>Card to Mnemonic Test Grid</Heading>
        <p className={styles.description}>
          Cards shown in standard deck order. Click any card to reveal its mnemonic peg image.
          Test your recall of what mnemonic image is associated with each card.
        </p>
        <div className={styles.gridWrapper}>
          <TestGridCardToMnemonic
            mnemonicaData={mnemonicaData}
            cardSize={150}
            gap="1.5rem"
          />
        </div>
      </div>
    </Layout>
  );
}
