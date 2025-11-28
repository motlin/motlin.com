import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MnemonicCard } from '../../../components/MnemonicaStack/CardSide/MnemonicCard';
import mnemonicaData from '../../../data/mnemonicaData.json';

const meta = {
  title: 'MnemonicaStack/CardSide/MnemonicCard',
  component: MnemonicCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    card: {
      control: 'text',
      description: 'Card code (e.g., "4C", "QH", "AS")',
    },
    showPosition: {
      control: 'boolean',
      description: 'Show position number badge on card',
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
} satisfies Meta<typeof MnemonicCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    card: '4C',
    showPosition: false,
    size: 200,
  },
};

export const WithPosition: Story = {
  args: {
    card: '4C',
    showPosition: true,
    size: 200,
  },
};

export const QueenOfHearts: Story = {
  args: {
    card: 'QH',
    showPosition: true,
    size: 200,
  },
};

export const AceOfSpades: Story = {
  args: {
    card: 'AS',
    showPosition: true,
    size: 200,
  },
};

export const All52Cards: Story = {
  args: {
    card: '4C',
    size: 200,
  },
  render: (args) => {
    const isRedSuit = (card: string): boolean => {
      const suit = card.charAt(card.length - 1);
      return suit === 'H' || suit === 'D';
    };

    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>All 52 Mnemonic Cards (in Mnemonica order)</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${args.size}px, 1fr))`,
            gap: '1.5rem',
          }}
        >
          {mnemonicaData.map((data, index) => {
            const position = index + 1;
            const cardColor = isRedSuit(data.card) ? '#dc2626' : '#000000';
            return (
              <div key={position} style={{ textAlign: 'center', paddingBottom: '2.5rem' }}>
                <MnemonicCard
                  card={data.card}
                  showPosition={true}
                  size={args.size}
                />
                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold', color: cardColor }}>
                  {position}: {data.card}
                </div>
                <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#666' }}>
                  {data.mnemonic}
                </div>
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

export const All52CardsDark: Story = {
  args: {
    card: '4C',
    size: 150,
  },
  render: All52Cards.render,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const FirstTenCards: Story = {
  args: {
    card: '4C',
  },
  render: () => {
    const isRedSuit = (card: string): boolean => {
      const suit = card.charAt(card.length - 1);
      return suit === 'H' || suit === 'D';
    };

    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>First 10 Mnemonic Cards</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '2rem',
          }}
        >
          {mnemonicaData.slice(0, 10).map((data, index) => {
            const position = index + 1;
            const cardColor = isRedSuit(data.card) ? '#dc2626' : '#000000';
            return (
              <div key={position} style={{ textAlign: 'center', paddingBottom: '3rem' }}>
                <MnemonicCard
                  card={data.card}
                  showPosition={true}
                  size={200}
                />
                <div style={{ marginTop: '0.75rem', fontSize: '1rem', fontWeight: 'bold', color: cardColor }}>
                  Position {position}: {data.card}
                </div>
                <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', fontStyle: 'italic' }}>
                  {data.mnemonic}
                </div>
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

export const WithoutPositionBadges: Story = {
  args: {
    card: '4C',
  },
  render: () => {
    const isRedSuit = (card: string): boolean => {
      const suit = card.charAt(card.length - 1);
      return suit === 'H' || suit === 'D';
    };

    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Mnemonic Cards (without position badges)</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {mnemonicaData.slice(0, 12).map((data, index) => {
            const position = index + 1;
            const cardColor = isRedSuit(data.card) ? '#dc2626' : '#000000';
            return (
              <div key={position} style={{ textAlign: 'center', paddingBottom: '1.5rem' }}>
                <MnemonicCard
                  card={data.card}
                  showPosition={false}
                  size={150}
                />
                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: cardColor }}>
                  {position}: {data.card}
                </div>
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

export const CompactGrid: Story = {
  args: {
    card: '4C',
  },
  render: () => {
    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Compact Grid Layout (100px cards)</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '1rem',
          }}
        >
          {mnemonicaData.map((data, index) => {
            const position = index + 1;
            return (
              <div key={position}>
                <MnemonicCard
                  card={data.card}
                  showPosition={true}
                  size={100}
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

export const LargeGrid: Story = {
  args: {
    card: '4C',
  },
  render: () => {
    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Large Grid Layout (250px cards)</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '2rem',
          }}
        >
          {mnemonicaData.slice(0, 8).map((data, index) => {
            const position = index + 1;
            return (
              <div key={position} style={{ textAlign: 'center', paddingBottom: '2rem' }}>
                <MnemonicCard
                  card={data.card}
                  showPosition={true}
                  size={250}
                />
                <div style={{ marginTop: '0.75rem', fontSize: '1.125rem', fontWeight: 'bold' }}>
                  {data.mnemonic}
                </div>
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
