import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.storybook', 'src/**/*.stories.{js,jsx,ts,tsx}'],
    passWithNoTests: true,
  },
  resolve: {
    alias: {
      '@site': path.resolve(__dirname, './'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@storybook/react': path.resolve(__dirname, './node_modules/@storybook/react'),
    },
  },
});
