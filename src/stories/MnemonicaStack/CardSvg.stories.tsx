import type { Meta, StoryObj } from '@storybook/react';
import CardSvg from '../../components/MnemonicaStack/CardSvg';
import { CardWrapper } from './CardWrapper';

const meta = {
  title: 'MnemonicaStack/CardSvg',
  component: CardSvg,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <CardWrapper>
        <Story />
      </CardWrapper>
    ),
  ],
  argTypes: {
    card: {
      control: 'text',
      description: 'Card value in format like "A♠", "K♥", "10♦"'
    },
    className: {
      control: 'text',
      description: 'Optional CSS class name'
    },
  },
} satisfies Meta<typeof CardSvg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AceOfSpades: Story = {
  args: {
    card: 'A♠',
  },
};

export const KingOfHearts: Story = {
  args: {
    card: 'K♥',
  },
};

export const TenOfDiamonds: Story = {
  args: {
    card: '10♦',
  },
};

export const QueenOfClubs: Story = {
  args: {
    card: 'Q♣',
  },
};

export const AllSuits: Story = {
  args: {
    card: 'A♠',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <CardSvg card="A♠" />
      <CardSvg card="A♥" />
      <CardSvg card="A♦" />
      <CardSvg card="A♣" />
    </div>
  ),
};

export const AllRanks: Story = {
  args: {
    card: 'A♠',
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
      <CardSvg card="A♠" />
      <CardSvg card="2♠" />
      <CardSvg card="3♠" />
      <CardSvg card="4♠" />
      <CardSvg card="5♠" />
      <CardSvg card="6♠" />
      <CardSvg card="7♠" />
      <CardSvg card="8♠" />
      <CardSvg card="9♠" />
      <CardSvg card="10♠" />
      <CardSvg card="J♠" />
      <CardSvg card="Q♠" />
      <CardSvg card="K♠" />
    </div>
  ),
};

export const WithCustomClass: Story = {
  args: {
    card: '7♥',
    className: 'custom-card-class',
  },
};
