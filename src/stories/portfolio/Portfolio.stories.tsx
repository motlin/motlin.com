import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Portfolio } from '../../components/portfolio/Portfolio';

const meta = {
  title: 'Portfolio/Portfolio',
  component: Portfolio,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Portfolio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Portfolio />
    </div>
  ),
};

export const DefaultDark: Story = {
  render: () => (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <Portfolio />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};
