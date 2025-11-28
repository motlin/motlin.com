import React from 'react';
import { CardGrid } from './CardGrid';
import { IndexWithMnemonicCard } from './FlippableCards/IndexWithMnemonicCard';

export interface TestGridIndexToPegProps {
  mnemonicaData: Array<{ card: string; mnemonic: string }>;
  cardSize?: number;
  gap?: string;
  className?: string;
}

export const TestGridIndexToPeg: React.FC<TestGridIndexToPegProps> = ({
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
      cardComponent={IndexWithMnemonicCard}
      columns={4}
      cardSize={cardSize}
      gap={gap}
      className={className}
    />
  );
};

export default TestGridIndexToPeg;
