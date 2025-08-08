import type { Meta, StoryObj } from '@storybook/react';
import PlayingCardFrame from '../../components/MnemonicaStack/PlayingCardFrame';

const meta = {
  title: 'MnemonicaStack/PlayingCardFrame',
  component: PlayingCardFrame,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    card: {
      control: 'text',
      description: 'Card value in format like "A♠", "K♥", "10♦"'
    },
    imageSrc: {
      control: 'text',
      description: 'URL of the mnemonic image'
    },
    mnemonic: {
      control: 'text',
      description: 'Mnemonic text for the card'
    },
    position: {
      control: 'number',
      description: 'Optional position in the deck'
    },
    className: {
      control: 'text',
      description: 'Optional CSS class name'
    },
  },
} satisfies Meta<typeof PlayingCardFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    card: 'A♠',
    imageSrc: 'https://via.placeholder.com/200x150',
    mnemonic: 'Death',
  },
};

export const WithPosition: Story = {
  args: {
    card: 'K♥',
    imageSrc: 'https://via.placeholder.com/200x150',
    mnemonic: 'Heartbreaker',
    position: 26,
  },
};

export const TenOfDiamonds: Story = {
  args: {
    card: '10♦',
    imageSrc: 'https://via.placeholder.com/200x150',
    mnemonic: 'Diamonds Forever',
    position: 10,
  },
};

export const QueenOfClubs: Story = {
  args: {
    card: 'Q♣',
    imageSrc: 'https://via.placeholder.com/200x150',
    mnemonic: 'Queen of the Night',
    position: 48,
  },
};

export const AllSuits: Story = {
  args: {
    card: 'A♠',
    imageSrc: 'https://via.placeholder.com/200x150',
    mnemonic: 'Ace of Spades',
    position: 1,
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
      <PlayingCardFrame
        card="A♠"
        imageSrc="https://via.placeholder.com/200x150"
        mnemonic="Ace of Spades"
        position={1}
      />
      <PlayingCardFrame
        card="A♥"
        imageSrc="https://via.placeholder.com/200x150"
        mnemonic="Ace of Hearts"
        position={2}
      />
      <PlayingCardFrame
        card="A♦"
        imageSrc="https://via.placeholder.com/200x150"
        mnemonic="Ace of Diamonds"
        position={3}
      />
      <PlayingCardFrame
        card="A♣"
        imageSrc="https://via.placeholder.com/200x150"
        mnemonic="Ace of Clubs"
        position={4}
      />
    </div>
  ),
};

export const FaceCards: Story = {
  args: {
    card: 'J♥',
    imageSrc: 'https://via.placeholder.com/200x150',
    mnemonic: 'Jack of Hearts',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <PlayingCardFrame
        card="J♥"
        imageSrc="https://via.placeholder.com/200x150"
        mnemonic="Jack of Hearts"
        position={11}
      />
      <PlayingCardFrame
        card="Q♦"
        imageSrc="https://via.placeholder.com/200x150"
        mnemonic="Queen of Diamonds"
        position={12}
      />
      <PlayingCardFrame
        card="K♠"
        imageSrc="https://via.placeholder.com/200x150"
        mnemonic="King of Spades"
        position={13}
      />
    </div>
  ),
};
