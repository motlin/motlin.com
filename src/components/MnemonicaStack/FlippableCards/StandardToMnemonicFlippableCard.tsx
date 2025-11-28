import React from 'react';
import { FlippableCard } from './FlippableCard';
import { StandardCard } from '../CardSide/StandardCard';
import { MnemonicCard } from '../CardSide/MnemonicCard';

export interface StandardToMnemonicFlippableCardProps {
  card: string;
  position?: number;
  size?: number;
  className?: string;
}

export const StandardToMnemonicFlippableCard: React.FC<StandardToMnemonicFlippableCardProps> = ({
  card,
  size = 200,
  className = '',
}) => {
  return (
    <FlippableCard
      frontComponent={<StandardCard card={card} size={size} />}
      backComponent={<MnemonicCard card={card} size={size} showPosition={true} />}
      size={size}
      className={className}
    />
  );
};

export default StandardToMnemonicFlippableCard;
