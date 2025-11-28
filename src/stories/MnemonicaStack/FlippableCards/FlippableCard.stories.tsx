import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FlippableCard } from '../../../components/MnemonicaStack/FlippableCards/FlippableCard';
import { StandardCard } from '../../../components/MnemonicaStack/CardSide/StandardCard';
import { MnemonicCard } from '../../../components/MnemonicaStack/CardSide/MnemonicCard';
import { CardBack } from '../../../components/MnemonicaStack/CardSide/CardBack';
import { CardBackWithIndexNumber } from '../../../components/MnemonicaStack/CardSide/CardBackWithIndexNumber';
import mnemonicaData from '../../../data/mnemonicaData.json';

const meta = {
  title: 'MnemonicaStack/FlippableCards/FlippableCard',
  component: FlippableCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'Card width in pixels',
    },
  },
} satisfies Meta<typeof FlippableCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardToCardBack: Story = {
  args: {
    frontComponent: <StandardCard card="QH" size={200} />,
    backComponent: <CardBack size={200} />,
    size: 200,
  },
  render: (args) => (
    <FlippableCard
      frontComponent={<StandardCard card="QH" size={args.size} />}
      backComponent={<CardBack size={args.size} />}
      size={args.size}
    />
  ),
};

export const StandardToMnemonic: Story = {
  args: {
    frontComponent: <StandardCard card="4C" size={200} />,
    backComponent: <MnemonicCard card="4C" size={200} />,
    size: 200,
  },
  render: (args) => (
    <FlippableCard
      frontComponent={<StandardCard card="4C" size={args.size} />}
      backComponent={<MnemonicCard card="4C" size={args.size} />}
      size={args.size}
    />
  ),
};

export const IndexToStandard: Story = {
  args: {
    frontComponent: <CardBackWithIndexNumber position={1} size={200} />,
    backComponent: <StandardCard card="4C" size={200} />,
    size: 200,
  },
  render: (args) => (
    <FlippableCard
      frontComponent={<CardBackWithIndexNumber position={1} size={args.size} />}
      backComponent={<StandardCard card="4C" size={args.size} />}
      size={args.size}
    />
  ),
};

export const IndexToMnemonic: Story = {
  args: {
    frontComponent: <CardBackWithIndexNumber position={11} size={200} />,
    backComponent: <MnemonicCard card="QH" size={200} />,
    size: 200,
  },
  render: (args) => (
    <FlippableCard
      frontComponent={<CardBackWithIndexNumber position={11} size={args.size} />}
      backComponent={<MnemonicCard card="QH" size={args.size} />}
      size={args.size}
    />
  ),
};

export const CardBackToMnemonic: Story = {
  args: {
    frontComponent: <CardBack size={200} />,
    backComponent: <MnemonicCard card="AS" size={200} />,
    size: 200,
  },
  render: (args) => (
    <FlippableCard
      frontComponent={<CardBack size={args.size} />}
      backComponent={<MnemonicCard card="AS" size={args.size} />}
      size={args.size}
    />
  ),
};

const convertCardNotation = (unicodeCard: string): string => {
  return unicodeCard
    .replace('♠', 'S')
    .replace('♥', 'H')
    .replace('♣', 'C')
    .replace('♦', 'D');
};

const standardDeckOrder = [
  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS',
  'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH',
  'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC',
  'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD',
];

export const StandardDeckOrder: Story = {
  args: {
    frontComponent: <StandardCard card="AS" size={150} />,
    backComponent: <MnemonicCard card="AS" size={150} />,
    size: 150,
  },
  render: () => {
    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Test Mnemonic Recall (Standard Deck Order)</h2>
        <p style={{ marginBottom: '1rem' }}>
          All 52 cards in standard deck order. Click any card to flip and reveal its mnemonic peg image and position in the Mnemonica stack.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {standardDeckOrder.map((card, index) => {
            const cardSize = 150;
            return (
              <div key={index} style={{ textAlign: 'center' }}>
                <FlippableCard
                  frontComponent={<StandardCard card={card} />}
                  backComponent={<MnemonicCard card={card} />}
                  size={cardSize}
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

export const StandardDeckOrderDark: Story = {
  args: {
    frontComponent: <StandardCard card="AS" size={150} />,
    backComponent: <MnemonicCard card="AS" size={150} />,
    size: 150,
  },
  render: StandardDeckOrder.render,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const DifferentSizes: Story = {
  args: {
    frontComponent: <StandardCard card="4C" size={40} />,
    backComponent: <MnemonicCard card="4C" size={40} />,
    size: 40,
  },
  render: (args) => {
    const card = convertCardNotation(mnemonicaData[0].card);

    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>FlippableCard at Different Sizes</h2>
        <p style={{ marginBottom: '1rem' }}>
          Testing size propagation to child components. The flip animation should work correctly at all sizes.
        </p>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          {[1, 2, 3, 4, 5].map((multiplier) => {
            const size = args.size * multiplier;
            return (
              <div key={multiplier} style={{ textAlign: 'center' }}>
                <FlippableCard
                  frontComponent={<StandardCard card={card} size={size} />}
                  backComponent={<MnemonicCard card={card} size={size} />}
                  size={size}
                />
                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                  Size: {size}px
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
