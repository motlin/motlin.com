import type { Meta, StoryObj } from '@storybook/react';
import CompactCardFrame from '../../components/MnemonicaStack/CompactCardFrame';

const meta = {
  title: 'MnemonicaStack/CompactCardFrame',
  component: CompactCardFrame,
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
      description: 'Position in the deck'
    },
    title: {
      control: 'text',
      description: 'Optional title for the card'
    },
    className: {
      control: 'text',
      description: 'Optional CSS class name'
    },
  },
} satisfies Meta<typeof CompactCardFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    card: '4♣',
    imageSrc: 'https://via.placeholder.com/150',
    mnemonic: 'Clover',
    position: 1,
  },
};

export const WithTitle: Story = {
  args: {
    card: '2♥',
    imageSrc: 'https://via.placeholder.com/150',
    mnemonic: 'Love',
    position: 2,
    title: 'Two of Hearts',
  },
};

export const AceOfSpades: Story = {
  args: {
    card: 'A♠',
    imageSrc: 'https://via.placeholder.com/150',
    mnemonic: 'Death',
    position: 52,
    title: 'The Death Card',
  },
};

export const MultipleCards: Story = {
  args: {
    card: '4♣',
    imageSrc: 'https://via.placeholder.com/150',
    mnemonic: 'Clover',
    position: 1,
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
      <CompactCardFrame
        card="4♣"
        imageSrc="https://via.placeholder.com/150"
        mnemonic="Clover"
        position={1}
      />
      <CompactCardFrame
        card="2♥"
        imageSrc="https://via.placeholder.com/150"
        mnemonic="Love"
        position={2}
      />
      <CompactCardFrame
        card="7♦"
        imageSrc="https://via.placeholder.com/150"
        mnemonic="Lucky"
        position={3}
      />
    </div>
  ),
};

export const AllSuits: Story = {
  args: {
    card: 'K♠',
    imageSrc: 'https://via.placeholder.com/150',
    mnemonic: 'King of Spades',
    position: 1,
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
      <CompactCardFrame
        card="K♠"
        imageSrc="https://via.placeholder.com/150"
        mnemonic="King of Spades"
        position={10}
      />
      <CompactCardFrame
        card="K♥"
        imageSrc="https://via.placeholder.com/150"
        mnemonic="King of Hearts"
        position={20}
      />
      <CompactCardFrame
        card="K♦"
        imageSrc="https://via.placeholder.com/150"
        mnemonic="King of Diamonds"
        position={30}
      />
      <CompactCardFrame
        card="K♣"
        imageSrc="https://via.placeholder.com/150"
        mnemonic="King of Clubs"
        position={40}
      />
    </div>
  ),
};
