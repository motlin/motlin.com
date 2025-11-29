import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { TestGridIndexToCard } from '@site/src/components/MnemonicaStack/TestGridIndexToCard';
import mnemonicaData from '@site/src/data/mnemonicaData.json';
import styles from './test-grid.module.css';

export default function TestGridPage() {
  return (
    <Layout title="Mnemonica Stack - Test Grid" description="Test your recall of card positions in the Mnemonica Stack">
      <div className={styles.container}>
        <Heading as="h1" className={styles.heading}>Position to Card Test Grid</Heading>
        <p className={styles.description}>
          4×13 grid showing all 52 positions. Click any position number to reveal the card at that position in the Mnemonica Stack.
        </p>
        <div className={styles.gridWrapper}>
          <TestGridIndexToCard
            mnemonicaData={mnemonicaData}
            cardSize={150}
            gap="1.5rem"
          />
        </div>
      </div>
    </Layout>
  );
}
