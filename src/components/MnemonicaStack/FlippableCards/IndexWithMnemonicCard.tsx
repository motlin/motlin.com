import React, { useState } from 'react';
import { CardBackWithIndexNumber } from '../CardSide/CardBackWithIndexNumber';
import { MnemonicCard } from '../CardSide/MnemonicCard';

export interface IndexWithMnemonicCardProps {
  card: string;
  position: number;
  size?: number;
  className?: string;
  isFlipped?: boolean;
  onFlip?: (flipped: boolean) => void;
}

export const IndexWithMnemonicCard: React.FC<IndexWithMnemonicCardProps> = ({
  card,
  position,
  size = 200,
  className = '',
  isFlipped: controlledIsFlipped,
  onFlip,
}) => {
  const [internalIsFlipped, setInternalIsFlipped] = useState(false);

  const isFlipped = controlledIsFlipped !== undefined ? controlledIsFlipped : internalIsFlipped;

  const handleClick = () => {
    if (controlledIsFlipped === undefined) {
      setInternalIsFlipped(!internalIsFlipped);
    }
    if (onFlip) {
      onFlip(!isFlipped);
    }
  };

  return (
    <div
      className={className}
      onClick={handleClick}
      style={{
        width: size,
        height: size * 1.4,
        perspective: '1000px',
        cursor: 'pointer',
        display: 'inline-block',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
          }}
        >
          <CardBackWithIndexNumber position={position} size={size} />
        </div>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <MnemonicCard card={card} size={size} />
        </div>
      </div>
    </div>
  );
};

export default IndexWithMnemonicCard;
