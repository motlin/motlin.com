import React from 'react';

export interface CardData {
  card: string;
  position: number;
}

export interface CardGridProps {
  cards: CardData[];
  cardComponent: React.ComponentType<{ card: string; position?: number; size?: number }>;
  columns?: number;
  cardSize?: number;
  gap?: string;
  className?: string;
}

export const CardGrid: React.FC<CardGridProps> = ({
  cards,
  cardComponent: CardComponent,
  columns,
  cardSize = 150,
  gap = '1.5rem',
  className = '',
}) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap,
    ...(columns
      ? { gridTemplateColumns: `repeat(${columns}, ${cardSize}px)` }
      : { gridTemplateColumns: `repeat(auto-fill, minmax(${cardSize}px, 1fr))` }),
  };

  return (
    <div className={className} style={gridStyle}>
      {cards.map((cardData) => (
        <div
          key={`${cardData.position}-${cardData.card}`}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardComponent
            card={cardData.card}
            position={cardData.position}
            size={cardSize}
          />
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
