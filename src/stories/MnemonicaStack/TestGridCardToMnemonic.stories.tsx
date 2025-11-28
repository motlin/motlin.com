import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TestGridCardToMnemonic } from '../../components/MnemonicaStack/TestGridCardToMnemonic';
import mnemonicaData from '../../data/mnemonicaData.json';

const meta = {
  title: 'MnemonicaStack/TestGridCardToMnemonic',
  component: TestGridCardToMnemonic,
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
} satisfies Meta<typeof TestGridCardToMnemonic>;

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
      <h2 style={{ marginBottom: '1rem' }}>Test Grid: Card to Mnemonica Recall</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        4×13 grid displaying all 52 cards in standard deck order (suits grouped). Each card starts showing the standard playing card.
        Click any card to flip and reveal the mnemonica peg for that card. Test your recall of "what mnemonica peg goes with this card?"
      </p>
      <TestGridCardToMnemonic {...args} />
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
      <TestGridCardToMnemonic {...args} />
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
      <TestGridCardToMnemonic {...args} />
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
      <TestGridCardToMnemonic {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
