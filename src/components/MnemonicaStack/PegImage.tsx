import React from 'react';
import { getActualImagePath, type MnemonicaCard } from '../../utils/mnemonicaUtils';
import mnemonicaData from '../../data/mnemonicaData.json';

export interface PegImageProps {
  card: string;
  className?: string;
  style?: React.CSSProperties;
}

export const PegImage: React.FC<PegImageProps> = ({
  card,
  className = '',
  style,
}) => {
  const position = mnemonicaData.findIndex((entry) => entry.card === card) + 1;

  if (position === 0) {
    throw new Error(`Card "${card}" not found in mnemonica data`);
  }

  const mnemonicaCard: MnemonicaCard = {
    card,
    mnemonic: '',
  };

  const imagePath = getActualImagePath(mnemonicaCard, position);

  return (
    <img
      src={imagePath}
      alt={`Mnemonic peg for ${card} at position ${position}`}
      className={className}
      style={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        ...style,
      }}
    />
  );
};

export default PegImage;
