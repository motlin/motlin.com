import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import MnemonicaStack from '../components/MnemonicaStack';

const meta = {
  title: 'Components/MnemonicaStack',
  component: MnemonicaStack,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MnemonicaStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <MnemonicaStack />
    </div>
  ),
};

export const DefaultDark: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <MnemonicaStack />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};
