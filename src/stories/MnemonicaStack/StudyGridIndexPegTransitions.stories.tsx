import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StudyGridIndexPegTransitions } from '../../components/MnemonicaStack/StudyGridIndexPegTransitions';
import mnemonicaData from '../../data/mnemonicaData.json';

const meta = {
  title: 'MnemonicaStack/StudyGridIndexPegTransitions',
  component: StudyGridIndexPegTransitions,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    mnemonicaData: {
      control: false,
      description: 'Mnemonica data array with card and mnemonic properties',
    },
    cardSize: {
      control: 'number',
      description: 'Size of each card in pixels',
    },
    transitionSize: {
      control: 'number',
      description: 'Size of each transition image in pixels',
    },
    gap: {
      control: 'text',
      description: 'Gap between items (CSS value)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof StudyGridIndexPegTransitions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mnemonicaData,
    cardSize: 150,
    transitionSize: 100,
    gap: '1rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Study Grid with Index Numbers, Peg Images, and Transitions</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        8-column grid showing all 52 cards and 52 transition images in mnemonica order (104 items total).
        Cards start showing position numbers and flip to reveal mnemonic peg images.
        Transitions start blank and flip to reveal the transition image between consecutive cards.
      </p>
      <StudyGridIndexPegTransitions {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const Compact: Story = {
  args: {
    mnemonicaData,
    cardSize: 100,
    transitionSize: 70,
    gap: '0.5rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Compact Study Grid</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Smaller cards and transitions for a more compact layout.
      </p>
      <StudyGridIndexPegTransitions {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const Large: Story = {
  args: {
    mnemonicaData,
    cardSize: 180,
    transitionSize: 120,
    gap: '1.5rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Large Study Grid</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Larger cards and transitions for detailed study.
      </p>
      <StudyGridIndexPegTransitions {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const EqualSizes: Story = {
  args: {
    mnemonicaData,
    cardSize: 150,
    transitionSize: 150,
    gap: '1rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Equal Size Layout</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Cards and transitions at the same size for a uniform grid.
      </p>
      <StudyGridIndexPegTransitions {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const MinimalGap: Story = {
  args: {
    mnemonicaData,
    cardSize: 120,
    transitionSize: 80,
    gap: '0.25rem',
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Minimal Gap Layout</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Very tight spacing for maximum information density.
      </p>
      <StudyGridIndexPegTransitions {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
