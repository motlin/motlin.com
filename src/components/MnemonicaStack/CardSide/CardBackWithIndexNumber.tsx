import React from 'react';
import { CardFrame } from '../CardFrame';

export interface CardBackWithIndexNumberProps {
  position: number;
  size?: number;
  className?: string;
  textColor?: string;
}

export const CardBackWithIndexNumber: React.FC<CardBackWithIndexNumberProps> = ({
  position,
  size = 200,
  className = '',
  textColor = 'RoyalBlue',
}) => {
  if (position < 1 || position > 52) {
    throw new Error('Position must be between 1 and 52');
  }

  const svgPath = '/img/mnemonica/cards/standard/2B.svg';

  return (
    <CardFrame size={size} className={className}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <img
          src={svgPath}
          alt="Card back"
          width={size}
          height={size * 1.4}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${size * 0.4}px`,
            fontWeight: 'bold',
            color: textColor,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
            pointerEvents: 'none',
          }}
        >
          {position}
        </div>
      </div>
    </CardFrame>
  );
};

export default CardBackWithIndexNumber;
