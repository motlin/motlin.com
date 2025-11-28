import React from 'react';
import { BlankCard } from './BlankCard';
import { PegImage } from '../PegImage';
import mnemonicaData from '../../../data/mnemonicaData.json';

export interface MnemonicCardProps {
  card: string;
  showPosition?: boolean;
  size?: number;
  className?: string;
}

export const MnemonicCard: React.FC<MnemonicCardProps> = ({
  card,
  showPosition = false,
  size = 200,
  className = '',
}) => {
  const position = mnemonicaData.findIndex((entry) => entry.card === card) + 1;

  if (position === 0) {
    throw new Error(`Card "${card}" not found in mnemonica data`);
  }

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: size,
        display: 'inline-block',
      }}
    >
      <BlankCard card={card} size={size} />
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '12%',
          width: '76%',
          height: '70%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PegImage
          card={card}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
      {showPosition && (
        <div
          style={{
            position: 'absolute',
            top: '6%',
            right: '10%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            fontSize: '0.75rem',
            fontWeight: 'bold',
          }}
        >
          {position}
        </div>
      )}
    </div>
  );
};

export default MnemonicCard;
