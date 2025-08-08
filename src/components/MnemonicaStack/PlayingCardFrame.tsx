import React from 'react';
import styles from './PlayingCardFrame.module.css';

interface PlayingCardFrameProps {
  card: string;
  imageSrc: string;
  mnemonic: string;
  position?: number;
  className?: string;
}

export default function PlayingCardFrame({
  card,
  imageSrc,
  mnemonic,
  position,
  className = ''
}: PlayingCardFrameProps) {
  const rank = card.slice(0, -1);
  const suit = card.slice(-1);

  const isRed = suit === '♥' || suit === '♦';

  const suitPaths: { [key: string]: React.ReactElement } = {
    '♠': <path d="M0 -500C100 -250 355 -100 355 185A150 150 0 0 1 55 185A10 10 0 0 0 35 185C35 385 85 400 130 500L-130 500C-85 400 -35 385 -35 185A10 10 0 0 0 -55 185A150 150 0 0 1 -355 185C-355 -100 -100 -250 0 -500Z" />,
    '♥': <path d="M0 -300C0 -400 100 -500 200 -500C300 -500 400 -400 400 -250C400 0 0 400 0 500C0 400 -400 0 -400 -250C-400 -400 -300 -500 -200 -500C-100 -500 0 -400 0 -300Z" fill={isRed ? 'var(--card-red)' : 'var(--card-black)'} />,
    '♦': <path d="M0 -400L200 0L0 400L-200 0Z" fill={isRed ? 'var(--card-red)' : 'var(--card-black)'} />,
    '♣': <path d="M30 150C35 385 85 400 130 500L-130 500C-85 400 -35 385 -30 150A10 10 0 0 0 -50 150A210 210 0 1 1 -124 -51A10 10 0 0 0 -127 -60A10 10 0 0 1 -127 -60A210 210 0 1 1 150 -150A10 10 0 0 0 150 -150A10 10 0 0 1 150 -150A210 210 0 1 1 124 -51A10 10 0 0 0 127 -60A10 10 0 0 1 127 -60A210 210 0 1 1 50 150A10 10 0 0 0 30 150Z" />
  };

  return (
    <div className={`${styles.playingCard} ${className}`}>
      <svg
        className={styles.cardSvg}
        viewBox="0 0 240 336"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          width="239"
          height="335"
          x="0.5"
          y="0.5"
          rx="12"
          ry="12"
          fill="var(--card-bg)"
          stroke="var(--card-border)"
          strokeWidth="2"
        />

        <text
          x="20"
          y="40"
          fontSize="32"
          fontWeight="bold"
          fill={isRed ? 'var(--card-red)' : 'var(--card-black)'}
          className={styles.cardRank}
        >
          {rank}
        </text>
        <g transform="translate(20, 50) scale(0.04)">
          {suitPaths[suit]}
        </g>

        <g transform="translate(220, 296) rotate(180)">
          <text
            x="0"
            y="0"
            fontSize="32"
            fontWeight="bold"
            fill={isRed ? 'var(--card-red)' : 'var(--card-black)'}
            className={styles.cardRank}
          >
            {rank}
          </text>
          <g transform="translate(0, 10) scale(0.04)">
            {suitPaths[suit]}
          </g>
        </g>

        <foreignObject x="20" y="70" width="200" height="196">
          <div className={styles.contentWrapper}>
            <img
              src={imageSrc}
              alt={mnemonic}
              className={styles.mnemonicImage}
            />
          </div>
        </foreignObject>

        <text
          x="120"
          y="285"
          fontSize="20"
          fontWeight="bold"
          textAnchor="middle"
          fill="var(--card-text)"
          className={styles.mnemonicText}
        >
          {mnemonic}
        </text>

        {position && (
          <text
            x="120"
            y="310"
            fontSize="16"
            textAnchor="middle"
            fill="var(--card-text-secondary)"
            className={styles.positionText}
          >
            Position: {position}
          </text>
        )}
      </svg>
    </div>
  );
}
