import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ColorSwatchExample from '../components/ColorSwatchExample';

const meta = {
  title: 'Components/ColorSwatchExample',
  component: ColorSwatchExample,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorSwatchExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ColorSwatchExample />,
};

export const DefaultDark: Story = {
  render: () => <ColorSwatchExample />,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};
