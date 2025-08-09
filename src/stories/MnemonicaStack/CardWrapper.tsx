import React from 'react';

interface CardWrapperProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}

export const CardWrapper: React.FC<CardWrapperProps> = ({ children, theme = 'light' }) => {
  const styles: React.CSSProperties = {
    '--card-bg': theme === 'dark' ? '#2b2b2d' : '#ffffff',
    '--card-border': theme === 'dark' ? '#4a4a4c' : '#e0e0e0',
    '--card-red': '#dc3545',
    '--card-black': theme === 'dark' ? '#ffffff' : '#000000',
    '--card-text': theme === 'dark' ? '#ffffff' : '#333333',
    '--card-text-secondary': theme === 'dark' ? '#b0b0b0' : '#666666',
    padding: '20px',
    background: theme === 'dark' ? '#1b1b1d' : '#f5f5f5',
    minHeight: '100vh',
  } as React.CSSProperties;

  return (
    <div style={styles}>
      {children}
    </div>
  );
};
