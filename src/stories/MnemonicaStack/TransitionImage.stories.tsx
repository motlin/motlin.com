import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TransitionImage } from '../../components/MnemonicaStack/TransitionImage';
import mnemonicaData from '../../data/mnemonicaData.json';

const meta = {
  title: 'MnemonicaStack/TransitionImage',
  component: TransitionImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fromCard: {
      control: 'text',
      description: 'Starting card code (e.g., "4C", "QH", "AS")',
    },
    toCard: {
      control: 'text',
      description: 'Ending card code (e.g., "2H", "7D", "KC")',
    },
    fromPosition: {
      control: { type: 'range', min: 1, max: 52, step: 1 },
      description: 'Starting position in Mnemonica stack (1-52)',
    },
    size: {
      control: 'number',
      description: 'Size of the image in pixels',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof TransitionImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fromCard: '4C',
    toCard: '2H',
    fromPosition: 1,
  },
};

export const WithSize: Story = {
  args: {
    fromCard: '4C',
    toCard: '2H',
    fromPosition: 1,
    size: 400,
  },
};

export const PositionEleven: Story = {
  args: {
    fromCard: 'QH',
    toCard: '8H',
    fromPosition: 11,
  },
};

export const PositionSeven: Story = {
  args: {
    fromCard: 'AS',
    toCard: '5C',
    fromPosition: 7,
  },
};

export const All52Transitions: Story = {
  args: {
    fromCard: '4C',
    toCard: '2H',
    fromPosition: 1,
  },
  render: () => {
    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>All 52 Mnemonic Transition Images</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {mnemonicaData.map((data, index) => {
            const position = index + 1;
            const nextIndex = (index + 1) % mnemonicaData.length;
            const nextData = mnemonicaData[nextIndex];

            return (
              <div key={position} style={{ textAlign: 'center', paddingBottom: '3rem' }}>
                <TransitionImage
                  fromCard={data.card}
                  toCard={nextData.card}
                  fromPosition={position}
                />
                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                  Position {position}
                </div>
                <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#666' }}>
                  {data.card} → {nextData.card}
                </div>
                <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#999' }}>
                  {data.mnemonic} → {nextData.mnemonic}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const All52TransitionsDark: Story = {
  args: {
    fromCard: '4C',
    toCard: '2H',
    fromPosition: 1,
  },
  render: All52Transitions.render,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const FirstTenTransitions: Story = {
  args: {
    fromCard: '4C',
    toCard: '2H',
    fromPosition: 1,
  },
  render: () => {
    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>First 10 Transition Images</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '2rem',
          }}
        >
          {mnemonicaData.slice(0, 10).map((data, index) => {
            const position = index + 1;
            const nextIndex = index + 1;
            const nextData = mnemonicaData[nextIndex];

            return (
              <div key={position} style={{ textAlign: 'center', paddingBottom: '3rem' }}>
                <TransitionImage
                  fromCard={data.card}
                  toCard={nextData.card}
                  fromPosition={position}
                />
                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                  Position {position}: {data.card} → {nextData.card}
                </div>
                <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', fontStyle: 'italic' }}>
                  {data.mnemonic} → {nextData.mnemonic}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const LargeTransitions: Story = {
  args: {
    fromCard: '4C',
    toCard: '2H',
    fromPosition: 1,
  },
  render: () => {
    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Large Transition Images (First 6)</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem',
          }}
        >
          {mnemonicaData.slice(0, 6).map((data, index) => {
            const position = index + 1;
            const nextIndex = index + 1;
            const nextData = mnemonicaData[nextIndex];

            return (
              <div key={position} style={{ textAlign: 'center', paddingBottom: '3.5rem' }}>
                <TransitionImage
                  fromCard={data.card}
                  toCard={nextData.card}
                  fromPosition={position}
                  size={400}
                />
                <div style={{ marginTop: '0.5rem', fontSize: '1rem', fontWeight: 'bold' }}>
                  Position {position}
                </div>
                <div style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>
                  {data.card} → {nextData.card}
                </div>
                <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', fontStyle: 'italic', color: '#666' }}>
                  {data.mnemonic} → {nextData.mnemonic}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};
