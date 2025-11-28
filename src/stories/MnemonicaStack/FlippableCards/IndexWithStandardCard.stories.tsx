import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { IndexWithStandardCard } from '../../../components/MnemonicaStack/FlippableCards/IndexWithStandardCard';
import mnemonicaData from '../../../data/mnemonicaData.json';

const meta = {
  title: 'MnemonicaStack/FlippableCards/IndexWithStandardCard',
  component: IndexWithStandardCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    card: {
      control: 'text',
      description: 'Card code (e.g., "4C", "QH", "AS")',
    },
    position: {
      control: { type: 'range', min: 1, max: 52, step: 1 },
      description: 'Position in Mnemonica stack (1-52)',
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
} satisfies Meta<typeof IndexWithStandardCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const FlippingInstructions = () => (
  <div style={{
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    textAlign: 'center',
  }}>
    <p style={{ margin: 0, fontWeight: 'bold' }}>💡 Click any card to flip between position and card face</p>
  </div>
);

export const Default: Story = {
  args: {
    card: '4C',
    position: 1,
    size: 200,
  },
};

export const QueenOfHearts: Story = {
  args: {
    card: 'QH',
    position: 11,
    size: 200,
  },
};

export const AceOfSpades: Story = {
  args: {
    card: 'AS',
    position: 7,
    size: 200,
  },
};

export const All52Cards: Story = {
  args: {
    card: '4C',
    position: 1,
    size: 150,
  },
  render: (args) => {
    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>All 52 Flippable Cards (in Mnemonica order)</h2>
        <FlippingInstructions />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${args.size}px, 1fr))`,
            gap: '1.5rem',
          }}
        >
          {mnemonicaData.map((data, index) => {
            const position = index + 1;
            return (
              <div key={position} style={{ textAlign: 'center' }}>
                <IndexWithStandardCard
                  card={data.card}
                  position={position}
                  size={args.size}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};
