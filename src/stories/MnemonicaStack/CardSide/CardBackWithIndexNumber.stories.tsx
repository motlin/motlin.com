import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CardBackWithIndexNumber } from '../../../components/MnemonicaStack/CardSide/CardBackWithIndexNumber';

const meta = {
  title: 'MnemonicaStack/CardSide/CardBackWithIndexNumber',
  component: CardBackWithIndexNumber,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'range', min: 1, max: 52, step: 1 },
      description: 'Position number (1-52)',
    },
    size: {
      control: 'number',
      description: 'Card width in pixels',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    textColor: {
      control: 'color',
      description: 'Text color for position number',
    },
  },
} satisfies Meta<typeof CardBackWithIndexNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: 1,
    size: 200,
  },
};

export const PositionFiftyTwo: Story = {
  args: {
    position: 52,
    size: 200,
  },
};

export const SmallCard: Story = {
  args: {
    position: 7,
    size: 100,
  },
};

export const LargeCard: Story = {
  args: {
    position: 13,
    size: 300,
  },
};

export const DifferentSizes: Story = {
  args: {
    position: 1,
    size: 40,
  },
  render: ({ size }) => {
    const sizes = [size * 2, size * 3, size * 4, size * 5];
    const positions = [1, 13, 26, 52];

    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Position Numbers at Different Sizes</h2>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {sizes.map((cardSize, index) => (
            <div key={cardSize} style={{ textAlign: 'center' }}>
              <CardBackWithIndexNumber position={positions[index]} size={cardSize} />
              <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>{cardSize}px</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const AllPositions: Story = {
  args: {
    position: 1,
    size: 120,
  },
  render: ({ size }) => {
    const positions = Array.from({ length: 52 }, (_, i) => i + 1);

    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>All 52 Position Numbers</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
            gap: '1rem',
          }}
        >
          {positions.map((position) => (
            <div key={position} style={{ textAlign: 'center' }}>
              <CardBackWithIndexNumber position={position} size={size} />
              <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                Position {position}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const CyanText: Story = {
  args: {
    position: 1,
    size: 200,
    textColor: 'cyan',
  },
};

export const HighContrastColorComparison: Story = {
  args: {
    position: 1,
    size: 160,
  },
  render: ({ size, position }) => {
    const colors = [
      { name: 'Yellow', color: 'yellow' },
      { name: 'Cyan', color: 'cyan' },
      { name: 'Lime', color: 'lime' },
      { name: 'White', color: 'white' },
      { name: 'Light Gray', color: '#d0d0d0' },
      { name: 'Medium Gray', color: '#a0a0a0' },
      { name: 'Dark Gray', color: '#707070' },
      { name: 'Near Black', color: '#333333' },
    ];

    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>High Contrast Text Colors</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
            gap: '2rem',
          }}
        >
          {colors.map(({ name, color }) => (
            <div key={color} style={{ textAlign: 'center' }}>
              <CardBackWithIndexNumber position={position} size={size} textColor={color} />
              <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                {name}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};
