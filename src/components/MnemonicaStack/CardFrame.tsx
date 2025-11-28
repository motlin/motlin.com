import React from 'react';

export interface CardFrameProps {
  size: number;
  className?: string;
  children: React.ReactNode;
}

export const CardFrame: React.FC<CardFrameProps> = ({
  size,
  className = '',
  children,
}) => {
  return (
    <div
      className={className}
      style={{
        '--card-size': `${size}px`,
        display: 'inline-block',
        width: size,
        height: size * 1.4,
        borderRadius: 'calc(var(--card-size) * 0.05)',
        boxShadow: 'calc(var(--card-size) * 0.0167) calc(var(--card-size) * 0.0167) calc(var(--card-size) * 0.0167) rgba(0,0,0,0.5)',
        overflow: 'hidden',
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default CardFrame;
