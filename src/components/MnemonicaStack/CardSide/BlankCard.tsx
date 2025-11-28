import React from 'react';
import { getCardSvgPath } from '../../../utils/mnemonicaUtils';
import { CardFrame } from '../CardFrame';

export interface BlankCardProps {
  card: string;
  size?: number;
  className?: string;
}

export const BlankCard: React.FC<BlankCardProps> = ({
  card,
  size = 200,
  className = '',
}) => {
  const svgPath = getCardSvgPath(card, 'outline');

  return (
    <CardFrame size={size} className={className}>
      <img
        src={svgPath}
        alt={`Blank card ${card}`}
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

export default BlankCard;
