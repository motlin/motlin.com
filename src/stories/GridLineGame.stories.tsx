import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import GridLineGame from '../components/GridLineGame';

const meta = {
  title: 'Components/GridLineGame',
  component: GridLineGame,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GridLineGame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <GridLineGame />,
};

export const DefaultDark: Story = {
  render: () => <GridLineGame />,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const InContainer: Story = {
  render: () => (
    <div style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <GridLineGame />
    </div>
  ),
};

export const InContainerDark: Story = {
  render: () => (
    <div style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#2a2a2a',
      minHeight: '100vh'
    }}>
      <GridLineGame />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};
