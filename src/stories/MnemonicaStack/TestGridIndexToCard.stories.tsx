import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TestGridIndexToCard } from '../../components/MnemonicaStack/TestGridIndexToCard';
import mnemonicaData from '../../data/mnemonicaData.json';

const meta = {
  title: 'MnemonicaStack/TestGridIndexToCard',
  component: TestGridIndexToCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    mnemonicaData: {
      control: false,
      description: 'Mnemonica data array with card and mnemonic properties',
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
} satisfies Meta<typeof TestGridIndexToCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mnemonicaData,
    cardSize: 150,
    gap: '1.5rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Test Grid: Position Number to Card Recall</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        4×13 grid displaying all 52 cards in mnemonica order. Each card starts showing its position number (1-52).
        Click any card to flip and reveal the standard playing card at that position. Test your recall of "what card is at position N?"
      </p>
      <TestGridIndexToCard {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const Compact: Story = {
  args: {
    mnemonicaData,
    cardSize: 100,
    gap: '0.75rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Compact Test Grid</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Smaller cards for quick practice sessions.
      </p>
      <TestGridIndexToCard {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const Large: Story = {
  args: {
    mnemonicaData,
    cardSize: 180,
    gap: '2rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Large Test Grid</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Larger cards for detailed study.
      </p>
      <TestGridIndexToCard {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const Spacious: Story = {
  args: {
    mnemonicaData,
    cardSize: 150,
    gap: '3rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Spacious Layout</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Extra spacing between cards for comfortable viewing.
      </p>
      <TestGridIndexToCard {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
