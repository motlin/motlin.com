import type { Preview } from '@storybook/react-vite'
import React from 'react';
import './styles.css';
import '../src/css/custom.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1b1b1d',
        },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        title: 'Theme',
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Apply theme class to the story
      React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', context.globals.theme);
      }, [context.globals.theme]);

      return React.createElement('div', {
        'data-theme': context.globals.theme,
        style: {
          padding: '1rem',
          minHeight: '100vh',
          backgroundColor: 'var(--ifm-background-color)',
          color: 'var(--ifm-font-color-base)'
        }
      }, React.createElement(Story));
    },
  ],
};

export default preview;
