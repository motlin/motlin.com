import React from 'react';
import { CardGrid } from './CardGrid';
import { IndexWithStandardCard } from './FlippableCards/IndexWithStandardCard';

export interface TestGridIndexToCardProps {
  mnemonicaData: Array<{ card: string; mnemonic: string }>;
  cardSize?: number;
  gap?: string;
  className?: string;
}

export const TestGridIndexToCard: React.FC<TestGridIndexToCardProps> = ({
  mnemonicaData,
  cardSize = 150,
  gap = '1.5rem',
  className = '',
}) => {
  const cards = mnemonicaData.map((entry, index) => ({
    card: entry.card,
    position: index + 1,
  }));

  return (
    <CardGrid
      cards={cards}
      cardComponent={IndexWithStandardCard}
      columns={4}
      cardSize={cardSize}
      gap={gap}
      className={className}
    />
  );
};

export default TestGridIndexToCard;
