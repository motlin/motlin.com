import React from 'react';
import styles from './CardFrame.module.css';

interface CardFrameProps {
  card: string;
  children: React.ReactNode;
  className?: string;
}

export default function CardFrame({ card, children, className = '' }: CardFrameProps) {
  const rank = card.slice(0, -1);
  const suit = card.slice(-1);

  const isRed = suit === '♥' || suit === '♦';

  return (
    <div className={`${styles.cardFrame} ${className}`}>
      <div className={styles.cardHeader}>
        <span className={`${styles.rank} ${isRed ? styles.red : styles.black}`}>
          {rank}
        </span>
        <span className={`${styles.suit} ${isRed ? styles.red : styles.black}`}>
          {suit}
        </span>
      </div>
      <div className={styles.cardContent}>
        {children}
      </div>
      <div className={styles.cardFooter}>
        <span className={`${styles.rank} ${isRed ? styles.red : styles.black}`}>
          {rank}
        </span>
        <span className={`${styles.suit} ${isRed ? styles.red : styles.black}`}>
          {suit}
        </span>
      </div>
    </div>
  );
}
