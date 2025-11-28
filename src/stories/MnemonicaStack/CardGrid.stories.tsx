import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CardGrid } from '../../components/MnemonicaStack/CardGrid';
import { StandardToCardBackFlippableCard } from '../../components/MnemonicaStack/FlippableCards/StandardToCardBackFlippableCard';
import { IndexWithStandardCard } from '../../components/MnemonicaStack/FlippableCards/IndexWithStandardCard';
import mnemonicaData from '../../data/mnemonicaData.json';

const meta = {
  title: 'MnemonicaStack/CardGrid',
  component: CardGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    cardSize: 150,
  },
  argTypes: {
    cards: {
      control: false,
      description: 'Array of card data objects with card and position properties',
    },
    cardComponent: {
      control: false,
      description: 'Component to render each card (StandardToCardBackFlippableCard, IndexWithStandardCard, etc.)',
    },
    columns: {
      control: { type: 'range', min: 1, max: 13, step: 1 },
      description: 'Number of columns (if not specified, uses auto-fill responsive grid)',
    },
    cardSize: {
      control: 'number',
      description: 'Size of each card in pixels',
    },
    gap: {
      control: 'text',
      description: 'Gap between cards (CSS value)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof CardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const mnemonicaCards = mnemonicaData.map((entry, index) => ({
  card: entry.card,
  position: index + 1,
}));

const standardDeckOrder = [
  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS',
  'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH',
  'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC',
  'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD',
].map((card, index) => ({ card, position: index + 1 }));

export const StandardDeck: Story = {
  args: {
    cards: standardDeckOrder,
    cardComponent: StandardToCardBackFlippableCard,
    cardSize: 120,
    gap: '1rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Standard Deck (52 Cards)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        All 52 cards in standard deck order. Click any card to flip to card back.
      </p>
      <CardGrid {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const MnemonicaStack: Story = {
  args: {
    cards: mnemonicaCards,
    cardComponent: IndexWithStandardCard,
    cardSize: 120,
    gap: '1rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Mnemonica Stack (52 Cards)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        All 52 cards in mnemonica order. Click any card to flip between index number and standard card face.
      </p>
      <CardGrid {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const FixedColumns: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 26),
    cardComponent: IndexWithStandardCard,
    columns: 13,
    cardSize: 100,
    gap: '0.75rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Fixed 13-Column Layout</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        First 26 cards in mnemonica order arranged in exactly 13 columns (half deck, 2 rows). Click to flip.
      </p>
      <CardGrid {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const FourColumns: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 16),
    cardComponent: IndexWithStandardCard,
    columns: 4,
    cardSize: 180,
    gap: '2rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>4-Column Grid Layout</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        First 16 cards in mnemonica order in a 4-column layout. Click to flip.
      </p>
      <CardGrid {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const CompactGrid: Story = {
  args: {
    cards: standardDeckOrder,
    cardComponent: StandardToCardBackFlippableCard,
    cardSize: 80,
    gap: '0.5rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Compact View (All 52 Cards)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Small cards in standard deck order with minimal spacing. Click to flip to card back.
      </p>
      <CardGrid {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
