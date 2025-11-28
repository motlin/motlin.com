import React from 'react';
import { CardGrid } from './CardGrid';
import { StandardToMnemonicFlippableCard } from './FlippableCards/StandardToMnemonicFlippableCard';
import { getStandardDeckOrder } from '../../utils/mnemonicaUtils';

export interface TestGridCardToMnemonicProps {
  mnemonicaData: Array<{ card: string; mnemonic: string }>;
  cardSize?: number;
  gap?: string;
  className?: string;
}

export const TestGridCardToMnemonic: React.FC<TestGridCardToMnemonicProps> = ({
  mnemonicaData,
  cardSize = 150,
  gap = '1.5rem',
  className = '',
}) => {
  const standardOrder = getStandardDeckOrder(mnemonicaData);

  const cards = standardOrder.map((entry, index) => ({
    card: entry.card,
    position: index + 1,
  }));

  return (
    <CardGrid
      cards={cards}
      cardComponent={StandardToMnemonicFlippableCard}
      columns={4}
      cardSize={cardSize}
      gap={gap}
      className={className}
    />
  );
};

export default TestGridCardToMnemonic;
