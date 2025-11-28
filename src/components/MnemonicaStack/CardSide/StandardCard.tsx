import React from 'react';
import { getCardSvgPath } from '../../../utils/mnemonicaUtils';
import { CardFrame } from '../CardFrame';

export interface StandardCardProps {
  card: string;
  size?: number;
  className?: string;
}

export const StandardCard: React.FC<StandardCardProps> = ({
  card,
  size = 200,
  className = '',
}) => {
  const svgPath = getCardSvgPath(card, 'standard');

  return (
    <CardFrame size={size} className={className}>
      <img
        src={svgPath}
        alt={`Playing card ${card}`}
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

export default StandardCard;
