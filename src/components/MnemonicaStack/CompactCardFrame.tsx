import React from 'react';
import Heading from '@theme/Heading';
import styles from './CompactCardFrame.module.css';

interface CompactCardFrameProps {
  card: string;
  imageSrc: string;
  mnemonic: string;
  position: number;
  title?: string;
  className?: string;
}

export default function CompactCardFrame({
  card,
  imageSrc,
  mnemonic,
  position,
  title,
  className = ''
}: CompactCardFrameProps) {
  const rank = card.slice(0, -1);
  const suit = card.slice(-1);

  const isRed = suit === '♥' || suit === '♦';

  return (
    <div className={`${styles.compactCard} ${className}`}>
      {title && <Heading as="h4" className={styles.title}>{title}</Heading>}
      <div className={styles.cardFrame}>
        <div className={styles.cardHeader}>
          <span className={`${styles.rank} ${isRed ? styles.red : styles.black}`}>
            {rank}
          </span>
          <span className={`${styles.suit} ${isRed ? styles.red : styles.black}`}>
            {suit}
          </span>
        </div>
        <div className={styles.cardContent}>
          <img
            src={imageSrc}
            alt={mnemonic}
            className={styles.mnemonicImage}
          />
        </div>
        <p className={styles.position}>Position {position}</p>
        <p className={styles.mnemonic}>{mnemonic}</p>
      </div>
    </div>
  );
}
