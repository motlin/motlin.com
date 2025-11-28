import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CardBack } from '../../../components/MnemonicaStack/CardSide/CardBack';

const meta = {
  title: 'MnemonicaStack/CardSide/CardBack',
  component: CardBack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'Card width in pixels',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof CardBack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 200,
  },
};

export const SmallCard: Story = {
  args: {
    size: 120,
  },
};

export const LargeCard: Story = {
  args: {
    size: 300,
  },
};

export const MultipleCards: Story = {
  args: {
    size: 40,
  },
  render: ({ size }) => {
    const sizes = [size * 2, size * 3, size * 4, size * 5];

    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Card Backs at Different Sizes</h2>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {sizes.map((cardSize) => (
            <div key={cardSize} style={{ textAlign: 'center' }}>
              <CardBack size={cardSize} />
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

export const MultipleCardsDark: Story = {
  args: {
    size: 40,
  },
  render: ({ size }) => {
    const sizes = [size * 2, size * 3, size * 4, size * 5];

    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Card Backs at Different Sizes</h2>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {sizes.map((cardSize) => (
            <div key={cardSize} style={{ textAlign: 'center' }}>
              <CardBack size={cardSize} />
              <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>{cardSize}px</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};
