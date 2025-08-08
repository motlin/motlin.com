import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Popup from '../../components/MnemonicaStack/Popup';

const meta = {
  title: 'MnemonicaStack/Popup',
  component: Popup,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the popup is open'
    },
    onClose: {
      action: 'closed',
      description: 'Function called when closing the popup'
    },
    children: {
      control: 'text',
      description: 'Content to display inside the popup'
    },
    isCardStyle: {
      control: 'boolean',
      description: 'Apply card styling to the popup'
    },
    onPrevious: {
      action: 'previous',
      description: 'Function called when navigating to previous (left arrow)'
    },
    onNext: {
      action: 'next',
      description: 'Function called when navigating to next (right arrow)'
    },
  },
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close'),
    children: (
      <div style={{ padding: '20px' }}>
        <h2>Popup Content</h2>
        <p>This is the content inside the popup.</p>
      </div>
    ),
  },
};

export const WithCardStyle: Story = {
  args: {
    isOpen: true,
    isCardStyle: true,
    onClose: () => console.log('Close'),
    children: (
      <div style={{ padding: '20px' }}>
        <h2>Card Style Popup</h2>
        <p>This popup has card styling applied.</p>
      </div>
    ),
  },
};

export const WithNavigation: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close'),
    children: (
      <div style={{ padding: '20px' }}>
        <h2>Navigate with Arrow Keys</h2>
        <p>Use ← and → arrow keys to navigate</p>
        <p>Press Escape to close</p>
      </div>
    ),
    onPrevious: () => console.log('Previous'),
    onNext: () => console.log('Next'),
  },
};

export const Interactive: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log('Close'),
    children: 'Placeholder',
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = ['First Item', 'Second Item', 'Third Item', 'Fourth Item'];

    const handlePrevious = () => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const handleNext = () => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    return (
      <div style={{ padding: '20px' }}>
        <button onClick={() => setIsOpen(true)}>Open Popup</button>
        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onPrevious={handlePrevious}
          onNext={handleNext}
        >
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>{items[currentIndex]}</h2>
            <p>Item {currentIndex + 1} of {items.length}</p>
            <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
              Use arrow keys to navigate, Escape to close
            </p>
          </div>
        </Popup>
      </div>
    );
  },
};

export const WithImage: Story = {
  args: {
    isOpen: true,
    isCardStyle: true,
    onClose: () => console.log('Close'),
    children: (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <img
          src="https://via.placeholder.com/300x400"
          alt="Card"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <h3>Card Image</h3>
        <p>A playing card displayed in a popup</p>
      </div>
    ),
  },
};
