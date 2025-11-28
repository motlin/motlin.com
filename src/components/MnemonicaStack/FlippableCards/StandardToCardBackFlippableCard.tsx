import React from 'react';
import { FlippableCard } from './FlippableCard';
import { StandardCard } from '../CardSide/StandardCard';
import { CardBack } from '../CardSide/CardBack';

export interface StandardToCardBackFlippableCardProps {
  card: string;
  position?: number;
  size?: number;
  className?: string;
}

export const StandardToCardBackFlippableCard: React.FC<StandardToCardBackFlippableCardProps> = ({
  card,
  size = 200,
  className = '',
}) => {
  return (
    <FlippableCard
      frontComponent={<StandardCard card={card} />}
      backComponent={<CardBack />}
      size={size}
      className={className}
    />
  );
};

export default StandardToCardBackFlippableCard;
