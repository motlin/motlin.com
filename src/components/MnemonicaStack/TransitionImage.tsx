import React from 'react';
import { getTransitionImagePath, type MnemonicaCard } from '../../utils/mnemonicaUtils';

export interface TransitionImageProps {
  fromCard: string;
  toCard: string;
  fromPosition: number;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const TransitionImage: React.FC<TransitionImageProps> = ({
  fromCard,
  toCard,
  fromPosition,
  size,
  className = '',
  style,
}) => {
  const fromData: MnemonicaCard = {
    card: fromCard,
    mnemonic: '',
  };

  const toData: MnemonicaCard = {
    card: toCard,
    mnemonic: '',
  };

  const imagePath = getTransitionImagePath(fromData, toData, fromPosition);

  const imageStyle: React.CSSProperties = {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    ...(size && { width: size }),
    objectFit: 'contain',
    ...style,
  };

  return (
    <div className={className}>
      <img
        src={imagePath}
        alt={`Transition from ${fromCard} to ${toCard} at position ${fromPosition}`}
        style={imageStyle}
      />
    </div>
  );
};

export default TransitionImage;
