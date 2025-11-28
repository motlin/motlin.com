import React from 'react';
import styles from './CardSvg.module.css';

interface CardSvgProps {
  card: string;
  className?: string;
}

export default function CardSvg({ card, className = '' }: CardSvgProps) {
  const rank = card.slice(0, -1);
  const suit = card.slice(-1);

  const isRed = suit === '♥' || suit === '♦';

  const suitPaths: { [key: string]: React.ReactElement } = {
    '♠': <path d="M0 -500C100 -250 355 -100 355 185A150 150 0 0 1 55 185A10 10 0 0 0 35 185C35 385 85 400 130 500L-130 500C-85 400 -35 385 -35 185A10 10 0 0 0 -55 185A150 150 0 0 1 -355 185C-355 -100 -100 -250 0 -500Z" transform="scale(0.045)" />,
    '♥': <path d="M0 -300C0 -400 100 -500 200 -500C300 -500 400 -400 400 -250C400 0 0 400 0 500C0 400 -400 0 -400 -250C-400 -400 -300 -500 -200 -500C-100 -500 0 -400 0 -300Z" transform="scale(0.045)" fill={isRed ? 'var(--card-red)' : 'var(--card-black)'} />,
    '♦': <path d="M0 -400L200 0L0 400L-200 0Z" transform="scale(0.045)" fill={isRed ? 'var(--card-red)' : 'var(--card-black)'} />,
    '♣': <path d="M30 150C35 385 85 400 130 500L-130 500C-85 400 -35 385 -30 150A10 10 0 0 0 -50 150A210 210 0 1 1 -124 -51A10 10 0 0 0 -127 -60A10 10 0 0 1 -127 -60A210 210 0 1 1 150 -150A10 10 0 0 0 150 -150A10 10 0 0 1 150 -150A210 210 0 1 1 124 -51A10 10 0 0 0 127 -60A10 10 0 0 1 127 -60A210 210 0 1 1 50 150A10 10 0 0 0 30 150Z" transform="scale(0.045)" />
  };

  return (
    <svg
      className={`${styles.cardSvg} ${className}`}
      viewBox="-120 -168 240 336"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect
        width="239"
        height="335"
        x="-119.5"
        y="-167.5"
        rx="12"
        ry="12"
        fill="transparent"
        stroke="var(--card-border)"
        strokeWidth="2"
        className={styles.cardBorder}
      />

      <text
        x="-100"
        y="-130"
        fontSize="32"
        fontWeight="bold"
        fill={isRed ? 'var(--card-red)' : 'var(--card-black)'}
        className={styles.cardText}
      >
        {rank}
      </text>
      <g transform="translate(-100, -105)">
        {suitPaths[suit]}
      </g>

      <g transform="rotate(180)">
        <text
          x="-100"
          y="-130"
          fontSize="32"
          fontWeight="bold"
          fill={isRed ? 'var(--card-red)' : 'var(--card-black)'}
          className={styles.cardText}
        >
          {rank}
        </text>
        <g transform="translate(-100, -105)">
          {suitPaths[suit]}
        </g>
      </g>
    </svg>
  );
}
