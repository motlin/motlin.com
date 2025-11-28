import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PegImage } from '../../components/MnemonicaStack/PegImage';
import mnemonicaData from '../../data/mnemonicaData.json';

const meta = {
  title: 'MnemonicaStack/PegImage',
  component: PegImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    card: {
      control: 'text',
      description: 'Card code (e.g., "4C", "QH", "AS")',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof PegImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    card: '4C',
  },
};

export const QueenOfHearts: Story = {
  args: {
    card: 'QH',
  },
};

export const AceOfSpades: Story = {
  args: {
    card: 'AS',
  },
};

export const AllPegImages: Story = {
  args: {
    card: '4C',
  },
  render: () => {
    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>All 52 Mnemonic Peg Images</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {mnemonicaData.map((data, index) => {
            const position = index + 1;
            return (
              <div key={position} style={{ textAlign: 'center', paddingBottom: '2.5rem' }}>
                <PegImage card={data.card} />
                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                  {position}: {data.card}
                </div>
                <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#666' }}>
                  {data.mnemonic}
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

export const AllPegImagesDark: Story = {
  args: {
    card: '4C',
  },
  render: AllPegImages.render,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  globals: {
    theme: 'dark',
  },
};

export const FirstTenPegs: Story = {
  args: {
    card: '4C',
  },
  render: () => {
    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>First 10 Mnemonic Pegs</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '2rem',
          }}
        >
          {mnemonicaData.slice(0, 10).map((data, index) => {
            const position = index + 1;
            return (
              <div key={position} style={{ textAlign: 'center', paddingBottom: '3rem' }}>
                <PegImage card={data.card} />
                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                  Position {position}: {data.card}
                </div>
                <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', fontStyle: 'italic' }}>
                  {data.mnemonic}
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
