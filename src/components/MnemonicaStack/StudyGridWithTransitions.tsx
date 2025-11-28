import React from 'react';
import { FlippableCard } from './FlippableCards/FlippableCard';
import { CardBackWithIndexNumber } from './CardSide/CardBackWithIndexNumber';
import { StandardCard } from './CardSide/StandardCard';
import { TransitionImage } from './TransitionImage';

export interface StudyGridWithTransitionsProps {
  mnemonicaData: Array<{ card: string; mnemonic: string }>;
  cardSize?: number;
  transitionSize?: number;
  gap?: string;
  className?: string;
}

export const StudyGridWithTransitions: React.FC<StudyGridWithTransitionsProps> = ({
  mnemonicaData,
  cardSize = 150,
  transitionSize = 100,
  gap = '1rem',
  className = '',
}) => {
  const gridItems: React.ReactNode[] = [];

  for (let index = 0; index < mnemonicaData.length; index++) {
    const entry = mnemonicaData[index];
    const position = index + 1;
    const nextEntry = mnemonicaData[(index + 1) % mnemonicaData.length];

    const cardItem = (
      <FlippableCard
        key={`card-${position}`}
        frontComponent={<CardBackWithIndexNumber position={position} size={cardSize} />}
        backComponent={<StandardCard card={entry.card} size={cardSize} />}
        size={cardSize}
      />
    );

    const transitionItem = (
      <FlippableCard
        key={`transition-${position}`}
        frontComponent={
          <div
            style={{
              width: transitionSize,
              height: transitionSize * 1.4,
              border: '2px dashed #ccc',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
            }}
          />
        }
        backComponent={
          <TransitionImage
            fromCard={entry.card}
            toCard={nextEntry.card}
            fromPosition={position}
            size={transitionSize}
          />
        }
        size={transitionSize}
      />
    );

    gridItems.push(cardItem);
    gridItems.push(transitionItem);
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap,
  };

  return (
    <div className={className} style={gridStyle}>
      {gridItems}
    </div>
  );
};

export default StudyGridWithTransitions;
