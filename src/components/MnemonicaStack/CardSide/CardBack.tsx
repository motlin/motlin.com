import React from 'react';
import { CardFrame } from '../CardFrame';

export interface CardBackProps {
  size?: number;
  className?: string;
}

export const CardBack: React.FC<CardBackProps> = ({
  size = 200,
  className = '',
}) => {
  const svgPath = '/img/mnemonica/cards/standard/2B.svg';

  return (
    <CardFrame size={size} className={className}>
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
    </CardFrame>
  );
};

export default CardBack;
