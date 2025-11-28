import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StudyCarousel } from '../../components/MnemonicaStack/StudyCarousel';
import mnemonicaData from '../../data/mnemonicaData.json';

const meta = {
  title: 'MnemonicaStack/StudyCarousel',
  component: StudyCarousel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    autoplay: {
      control: 'boolean',
      description: 'Automatically advance through slides',
    },
    interval: {
      control: 'number',
      description: 'Time between slides in milliseconds (when autoplay is enabled)',
    },
    showControls: {
      control: 'boolean',
      description: 'Show playback controls (previous, play/pause, next)',
    },
    cards: {
      control: false,
      description: 'Array of card data objects with card and position properties',
    },
    size: {
      control: 'number',
      description: 'Size of each card/transition image in pixels',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    mode: {
      control: 'select',
      options: ['study', 'test'],
      description: 'Study mode shows cards with peg images visible; test mode requires clicking to reveal',
    },
  },
} satisfies Meta<typeof StudyCarousel>;

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

export const Default: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    autoplay: false,
    interval: 3000,
    showControls: true,
    size: 300,
    mode: 'study',
  },
};

export const AutoplayEnabled: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    autoplay: true,
    interval: 3000,
    showControls: true,
    size: 300,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Autoplay Carousel</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Automatically cycles through cards and transitions every 3 seconds.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const FastAutoplay: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    autoplay: true,
    interval: 1500,
    showControls: true,
    size: 300,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Fast Autoplay (1.5 seconds)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Quick review mode with 1.5 second intervals.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const SlowAutoplay: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    autoplay: true,
    interval: 5000,
    showControls: true,
    size: 300,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Slow Autoplay (5 seconds)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Study mode with 5 second intervals for memorization.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const NoControls: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    autoplay: true,
    interval: 3000,
    showControls: false,
    size: 300,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Carousel Without Controls</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Automatic slideshow with no playback controls.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const FirstTenCards: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    autoplay: false,
    interval: 3000,
    showControls: true,
    size: 300,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>First 10 Cards (Manual Control)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Practice the first 10 cards with manual controls. Use buttons to navigate or click Play to automate.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const AllFiftyTwoCards: Story = {
  args: {
    cards: mnemonicaCards,
    autoplay: false,
    interval: 3000,
    showControls: true,
    size: 300,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Complete Mnemonica Stack (52 Cards)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        All 52 cards with transitions. Total of 103 slides (52 cards + 51 transitions).
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const AllFiftyTwoCardsAutoplay: Story = {
  args: {
    cards: mnemonicaCards,
    autoplay: true,
    interval: 2500,
    showControls: true,
    size: 300,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Complete Stack Autoplay</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Full deck slideshow with 2.5 second intervals. Perfect for review sessions.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const SmallCards: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    autoplay: false,
    interval: 3000,
    showControls: true,
    size: 200,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Small Card Display</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Compact view with smaller 200px cards.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const LargeCards: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    autoplay: false,
    interval: 3000,
    showControls: true,
    size: 400,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Large Card Display</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Large 400px view for detailed study.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const SecondQuarter: Story = {
  args: {
    cards: mnemonicaCards.slice(13, 26),
    autoplay: false,
    interval: 3000,
    showControls: true,
    size: 300,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Second Quarter (Cards 14-26)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Practice positions 14 through 26 of the mnemonica stack.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const ThirdQuarter: Story = {
  args: {
    cards: mnemonicaCards.slice(26, 39),
    autoplay: false,
    interval: 3000,
    showControls: true,
    size: 300,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Third Quarter (Cards 27-39)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Practice positions 27 through 39 of the mnemonica stack.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const FourthQuarter: Story = {
  args: {
    cards: mnemonicaCards.slice(39, 52),
    autoplay: false,
    interval: 3000,
    showControls: true,
    size: 300,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Fourth Quarter (Cards 40-52)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Practice positions 40 through 52 of the mnemonica stack.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const DarkMode: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    autoplay: false,
    interval: 3000,
    showControls: true,
    size: 300,
    mode: 'study',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem', color: '#fff' }}>Dark Mode Display</h2>
      <p style={{ marginBottom: '1rem', color: '#ccc' }}>
        Carousel on dark background for reduced eye strain during long study sessions.
      </p>
      <StudyCarousel {...args} />
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

export const TestMode: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    autoplay: false,
    interval: 3000,
    showControls: true,
    size: 300,
    mode: 'test',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Test Mode</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Cards show position number first. Click each card to flip and reveal the peg image.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const TestModeAutoplay: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    autoplay: true,
    interval: 5000,
    showControls: true,
    size: 300,
    mode: 'test',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Test Mode with Autoplay</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Autoplay cycles through positions. Click to reveal answers, then wait for next card.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const StudyModeReview: Story = {
  args: {
    cards: mnemonicaCards.slice(0, 10),
    autoplay: false,
    interval: 3000,
    showControls: true,
    size: 300,
    mode: 'study',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Study Mode (Review)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        All peg images visible for reviewing associations. Use this mode to learn the system.
      </p>
      <StudyCarousel {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
