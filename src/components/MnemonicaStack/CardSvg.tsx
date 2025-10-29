import React from 'react';

interface CardSvgProps {
  card: string;
  className?: string;
}

export default function CardSvg({ card, className }: CardSvgProps) {
  const [rank, suit] = card.length === 3 ? [card.slice(0, 2), card[2]] : [card[0], card[1]];
  const isRed = suit === '♥' || suit === '♦';
  const fillColor = isRed ? 'var(--card-red)' : 'var(--card-black)';

  return (
    <svg
      className={className}
      viewBox="0 0 100 140"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="98"
        height="138"
        fill="white"
        stroke="black"
        strokeWidth="2"
        rx="5"
      />
      <text
        x="10"
        y="30"
        fontSize="24"
        fontWeight="bold"
        fill={fillColor}
      >
        {rank}
      </text>
      <text
        x="90"
        y="130"
        fontSize="24"
        fontWeight="bold"
        fill={fillColor}
        textAnchor="end"
        transform="rotate(180 90 130)"
      >
        {rank}
      </text>
    </svg>
  );
}
