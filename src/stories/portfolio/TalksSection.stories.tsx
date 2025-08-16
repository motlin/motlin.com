import type { Meta, StoryObj } from '@storybook/react';
import { TalksSection } from '../../components/portfolio/TalksSection';
import portfolioData from '../../data/portfolio.json';

const meta = {
  title: 'Portfolio/TalksSection',
  component: TalksSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TalksSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    talks: portfolioData.talks,
  },
};

export const DefaultDark: Story = {
  args: {
    talks: portfolioData.talks,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const SingleTalk: Story = {
  args: {
    talks: [portfolioData.talks[0]],
  },
};

export const SingleTalkDark: Story = {
  args: {
    talks: [portfolioData.talks[0]],
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const TalksWithoutVideo: Story = {
  args: {
    talks: [
      {
        id: 'no-video-1',
        event: 'Local Meetup 2024',
        title: 'Introduction to TypeScript',
        year: 2024,
      },
      {
        id: 'no-video-2',
        event: 'Internal Tech Talk',
        title: 'Best Practices in React Development',
        year: 2023,
      },
    ],
  },
};

export const TalksWithoutVideoDark: Story = {
  args: {
    talks: [
      {
        id: 'no-video-1',
        event: 'Local Meetup 2024',
        title: 'Introduction to TypeScript',
        year: 2024,
      },
      {
        id: 'no-video-2',
        event: 'Internal Tech Talk',
        title: 'Best Practices in React Development',
        year: 2023,
      },
    ],
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const MixedTalks: Story = {
  args: {
    talks: [
      portfolioData.talks[0],
      {
        id: 'custom-talk',
        event: 'Tech Conference 2024',
        title: 'Building Scalable Applications',
        year: 2024,
      },
      portfolioData.talks[1],
    ],
  },
};

export const MixedTalksDark: Story = {
  args: {
    talks: [
      portfolioData.talks[0],
      {
        id: 'custom-talk',
        event: 'Tech Conference 2024',
        title: 'Building Scalable Applications',
        year: 2024,
      },
      portfolioData.talks[1],
    ],
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const TalksWithoutYear: Story = {
  args: {
    talks: [
      {
        id: 'timeless-1',
        event: 'Evergreen Conference',
        eventUrl: 'https://example.com/evergreen',
        title: 'Timeless Principles of Software Design',
      },
      {
        id: 'timeless-2',
        event: 'Ongoing Workshop Series',
        title: 'Continuous Learning in Tech',
      },
    ],
  },
};

export const TalksWithoutYearDark: Story = {
  args: {
    talks: [
      {
        id: 'timeless-1',
        event: 'Evergreen Conference',
        eventUrl: 'https://example.com/evergreen',
        title: 'Timeless Principles of Software Design',
      },
      {
        id: 'timeless-2',
        event: 'Ongoing Workshop Series',
        title: 'Continuous Learning in Tech',
      },
    ],
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};
