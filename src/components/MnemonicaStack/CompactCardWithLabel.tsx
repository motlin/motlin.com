import React from 'react';
import CompactCardFrame from './CompactCardFrame';
import mnemonicaData from '@site/src/data/mnemonicaData.json';
import { getActualImagePath } from '@site/src/utils/mnemonicaUtils';

export interface CompactCardWithLabelProps {
  card: string;
  position: number;
  size?: number;
  className?: string;
}

export const CompactCardWithLabel: React.FC<CompactCardWithLabelProps> = ({
  card,
  position,
  size = 200,
  className = '',
}) => {
  const cardData = mnemonicaData[position - 1];
  const imageSrc = getActualImagePath(cardData, position);

  return (
    <div
      className={className}
      style={{
        width: size,
        display: 'inline-block',
      }}
    >
      <CompactCardFrame
        card={card}
        imageSrc={imageSrc}
        mnemonic={cardData.mnemonic}
        position={position}
      />
    </div>
  );
};

export default CompactCardWithLabel;
