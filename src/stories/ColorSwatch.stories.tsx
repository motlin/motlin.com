import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ColorSwatch from '../components/ColorSwatch';

const meta = {
  title: 'Components/ColorSwatch',
  component: ColorSwatch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
      description: 'Color value (with or without # prefix)',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the color swatch',
    },
    label: {
      control: 'boolean',
      description: 'Whether to show the color code label',
    },
  },
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: '#3498db',
    size: 'medium',
    label: true,
  },
};

export const DefaultDark: Story = {
  args: {
    color: '#3498db',
    size: 'medium',
    label: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const Small: Story = {
  args: {
    color: '#e74c3c',
    size: 'small',
    label: true,
  },
};

export const SmallDark: Story = {
  args: {
    color: '#e74c3c',
    size: 'small',
    label: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const Large: Story = {
  args: {
    color: '#2ecc71',
    size: 'large',
    label: true,
  },
};

export const LargeDark: Story = {
  args: {
    color: '#2ecc71',
    size: 'large',
    label: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const NoLabel: Story = {
  args: {
    color: '#f39c12',
    size: 'medium',
    label: false,
  },
};

export const NoLabelDark: Story = {
  args: {
    color: '#f39c12',
    size: 'medium',
    label: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const Palette: Story = {
  args: {
    color: '#3498db',
    size: 'large',
    label: true,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <ColorSwatch color="#1abc9c" size="large" />
      <ColorSwatch color="#2ecc71" size="large" />
      <ColorSwatch color="#3498db" size="large" />
      <ColorSwatch color="#9b59b6" size="large" />
      <ColorSwatch color="#34495e" size="large" />
      <ColorSwatch color="#f39c12" size="large" />
      <ColorSwatch color="#e74c3c" size="large" />
      <ColorSwatch color="#95a5a6" size="large" />
    </div>
  ),
};

export const PaletteDark: Story = {
  args: {
    color: '#3498db',
    size: 'large',
    label: true,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <ColorSwatch color="#1abc9c" size="large" />
      <ColorSwatch color="#2ecc71" size="large" />
      <ColorSwatch color="#3498db" size="large" />
      <ColorSwatch color="#9b59b6" size="large" />
      <ColorSwatch color="#34495e" size="large" />
      <ColorSwatch color="#f39c12" size="large" />
      <ColorSwatch color="#e74c3c" size="large" />
      <ColorSwatch color="#95a5a6" size="large" />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const AllSizes: Story = {
  args: {
    color: '#3498db',
    size: 'medium',
    label: true,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <ColorSwatch color="#3498db" size="small" />
      <ColorSwatch color="#3498db" size="medium" />
      <ColorSwatch color="#3498db" size="large" />
    </div>
  ),
};

export const AllSizesDark: Story = {
  args: {
    color: '#3498db',
    size: 'medium',
    label: true,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <ColorSwatch color="#3498db" size="small" />
      <ColorSwatch color="#3498db" size="medium" />
      <ColorSwatch color="#3498db" size="large" />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};
