import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PositionQuiz } from '../../components/MnemonicaStack/PositionQuiz';
import mnemonicaData from '../../data/mnemonicaData.json';

const meta = {
  title: 'MnemonicaStack/PositionQuiz',
  component: PositionQuiz,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    cards: {
      control: false,
      description: 'Array of card data objects with card and position properties',
    },
    mode: {
      control: 'radio',
      options: ['position-to-card', 'card-to-position'],
      description: 'Quiz mode: show position and guess card, or show card and guess position',
    },
    showFeedback: {
      control: 'boolean',
      description: 'Show feedback after each answer',
    },
    shuffleQuestions: {
      control: 'boolean',
      description: 'Randomly shuffle the order of questions',
    },
    size: {
      control: 'number',
      description: 'Size of the displayed card or position number',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof PositionQuiz>;

export default meta;
type Story = StoryObj<typeof meta>;

const convertCardNotation = (unicodeCard: string): string => {
  return unicodeCard
    .replace('♠', 'S')
    .replace('♥', 'H')
    .replace('♣', 'C')
    .replace('♦', 'D');
};

const mnemonicaCards = mnemonicaData.map((entry, index) => ({
  card: convertCardNotation(entry.card),
  position: index + 1,
}));

export const PositionToCard: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    mode: 'position-to-card',
    showFeedback: true,
    shuffleQuestions: true,
    size: 200,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Position to Card Quiz</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Given a position number, guess which card is at that position in the mnemonica stack.
      </p>
      <PositionQuiz {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const CardToPosition: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    mode: 'card-to-position',
    showFeedback: true,
    shuffleQuestions: true,
    size: 200,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Card to Position Quiz</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Given a playing card, guess which position it appears at in the mnemonica stack.
      </p>
      <PositionQuiz {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const FirstTenCards: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    mode: 'position-to-card',
    showFeedback: true,
    shuffleQuestions: true,
    size: 200,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>First 10 Positions Quiz</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Practice the first 10 positions (1-10) of the mnemonica stack.
      </p>
      <PositionQuiz {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const SecondQuarter: Story = {
  args: {
    cards: mnemonicaCards.slice(13, 26),
    mode: 'position-to-card',
    showFeedback: true,
    shuffleQuestions: true,
    size: 200,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Second Quarter Quiz (Cards 14-26)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Practice positions 14 through 26 of the mnemonica stack.
      </p>
      <PositionQuiz {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const ThirdQuarter: Story = {
  args: {
    cards: mnemonicaCards.slice(26, 39),
    mode: 'position-to-card',
    showFeedback: true,
    shuffleQuestions: true,
    size: 200,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Third Quarter Quiz (Cards 27-39)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Practice positions 27 through 39 of the mnemonica stack.
      </p>
      <PositionQuiz {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const FourthQuarter: Story = {
  args: {
    cards: mnemonicaCards.slice(39, 52),
    mode: 'position-to-card',
    showFeedback: true,
    shuffleQuestions: true,
    size: 200,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Fourth Quarter Quiz (Cards 40-52)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Practice positions 40 through 52 of the mnemonica stack.
      </p>
      <PositionQuiz {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const AllFiftyTwoCards: Story = {
  args: {
    cards: mnemonicaCards,
    mode: 'position-to-card',
    showFeedback: true,
    shuffleQuestions: true,
    size: 200,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Complete Stack Quiz (All 52 Cards)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Test your knowledge of all 52 positions in the mnemonica stack.
      </p>
      <PositionQuiz {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const NoShuffle: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    mode: 'position-to-card',
    showFeedback: true,
    shuffleQuestions: false,
    size: 200,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Sequential Quiz (No Shuffle)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Questions appear in order without shuffling. Good for learning the sequence.
      </p>
      <PositionQuiz {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const NoFeedback: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    mode: 'position-to-card',
    showFeedback: false,
    shuffleQuestions: true,
    size: 200,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Quiz Without Feedback</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        No feedback shown after each answer. See your final score at the end.
      </p>
      <PositionQuiz {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const SmallCards: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    mode: 'position-to-card',
    showFeedback: true,
    shuffleQuestions: true,
    size: 150,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Small Card Display Quiz</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Compact view with smaller 150px cards.
      </p>
      <PositionQuiz {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const LargeCards: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    mode: 'position-to-card',
    showFeedback: true,
    shuffleQuestions: true,
    size: 300,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Large Card Display Quiz</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Large 300px view for better visibility.
      </p>
      <PositionQuiz {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const CardToPositionAllCards: Story = {
  args: {
    cards: mnemonicaCards,
    mode: 'card-to-position',
    showFeedback: true,
    shuffleQuestions: true,
    size: 200,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Reverse Quiz: All Cards to Positions</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Given a card, identify its position in the stack. Test all 52 cards.
      </p>
      <PositionQuiz {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const DarkMode: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    mode: 'position-to-card',
    showFeedback: true,
    shuffleQuestions: true,
    size: 200,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem', color: '#fff' }}>Dark Mode Quiz</h2>
      <p style={{ marginBottom: '1rem', color: '#ccc' }}>
        Quiz interface on dark background for reduced eye strain during practice sessions.
      </p>
      <PositionQuiz {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};
