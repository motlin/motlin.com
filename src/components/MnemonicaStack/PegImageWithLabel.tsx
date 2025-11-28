import React from 'react';
import { PegImage } from './PegImage';

export interface PegImageWithLabelProps {
  card: string;
  size?: number;
  className?: string;
}

export const PegImageWithLabel: React.FC<PegImageWithLabelProps> = ({
  card,
  size = 200,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        width: size,
        display: 'inline-block',
      }}
    >
      <PegImage
        card={card}
      />
    </div>
  );
};

export default PegImageWithLabel;
