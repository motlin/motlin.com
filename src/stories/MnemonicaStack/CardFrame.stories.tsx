import type { Meta, StoryObj } from '@storybook/react';
import CardFrame from '../../components/MnemonicaStack/CardFrame';

const meta = {
  title: 'MnemonicaStack/CardFrame',
  component: CardFrame,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    card: {
      control: 'text',
      description: 'Card value in format like "A♠", "K♥", "10♦"'
    },
    children: {
      control: 'text',
      description: 'Content to display inside the card frame'
    },
    className: {
      control: 'text',
      description: 'Optional CSS class name'
    },
  },
} satisfies Meta<typeof CardFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    card: 'A♠',
    children: 'Card Content',
  },
};

export const WithImage: Story = {
  args: {
    card: 'K♥',
    children: (
      <img
        src="https://via.placeholder.com/150"
        alt="Placeholder"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
  },
};

export const WithText: Story = {
  args: {
    card: '7♦',
    children: (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Lucky Seven</h3>
        <p>This is the seven of diamonds</p>
      </div>
    ),
  },
};

export const AllSuits: Story = {
  args: {
    card: 'A♠',
    children: 'Placeholder',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <CardFrame card="A♠">Spades</CardFrame>
      <CardFrame card="A♥">Hearts</CardFrame>
      <CardFrame card="A♦">Diamonds</CardFrame>
      <CardFrame card="A♣">Clubs</CardFrame>
    </div>
  ),
};

export const WithCustomContent: Story = {
  args: {
    card: 'Q♣',
    children: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '10px'
      }}>
        <span style={{ fontSize: '2em' }}>👑</span>
        <span>Queen of Clubs</span>
      </div>
    ),
  },
};
