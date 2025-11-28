import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StandardCard } from '../../../components/MnemonicaStack/CardSide/StandardCard';

const meta = {
  title: 'MnemonicaStack/CardSide/StandardCard',
  component: StandardCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    card: {
      control: 'text',
      description: 'Card code (e.g., "4C", "QH", "AS")',
    },
    size: {
      control: 'number',
      description: 'Card width in pixels',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof StandardCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    card: '4C',
    size: 200,
  },
};

export const QueenOfHearts: Story = {
  args: {
    card: 'QH',
    size: 200,
  },
};

export const AceOfSpades: Story = {
  args: {
    card: 'AS',
    size: 200,
  },
};

export const TenOfDiamonds: Story = {
  args: {
    card: 'TD',
    size: 200,
  },
};

export const SmallCard: Story = {
  args: {
    card: 'KH',
    size: 100,
  },
};

export const LargeCard: Story = {
  args: {
    card: 'JC',
    size: 300,
  },
};

export const AllCards: Story = {
  args: {
    card: 'AS',
    size: 120,
  },
  render: ({ size }) => {
    const suits = ['S', 'H', 'C', 'D'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>All 52 Playing Cards</h2>
        {suits.map((suit) => (
          <div key={suit} style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>
              {suit === 'S' && '♠ Spades'}
              {suit === 'H' && '♥ Hearts'}
              {suit === 'C' && '♣ Clubs'}
              {suit === 'D' && '♦ Diamonds'}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
                gap: '1rem',
              }}
            >
              {ranks.map((rank) => (
                <div key={`${rank}${suit}`} style={{ textAlign: 'center' }}>
                  <StandardCard card={`${rank}${suit}`} size={size} />
                  <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                    {rank}{suit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const AllCardsDark: Story = {
  args: {
    card: 'AS',
    size: 120,
  },
  render: ({ size }) => {
    const suits = ['S', 'H', 'C', 'D'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>All 52 Playing Cards</h2>
        {suits.map((suit) => (
          <div key={suit} style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>
              {suit === 'S' && '♠ Spades'}
              {suit === 'H' && '♥ Hearts'}
              {suit === 'C' && '♣ Clubs'}
              {suit === 'D' && '♦ Diamonds'}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
                gap: '1rem',
              }}
            >
              {ranks.map((rank) => (
                <div key={`${rank}${suit}`} style={{ textAlign: 'center' }}>
                  <StandardCard card={`${rank}${suit}`} size={size} />
                  <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                    {rank}{suit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
