import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import CardSvg from './CardSvg';

describe('CardSvg', () => {
  it('renders ace of spades correctly', () => {
    const { container } = render(<CardSvg card="A♠" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();

    const texts = container.querySelectorAll('text');
    expect(texts).toHaveLength(2);
    expect(texts[0].textContent).toBe('A');
    expect(texts[1].textContent).toBe('A');
  });

  it('applies custom className', () => {
    const { container } = render(<CardSvg card="K♥" className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg?.classList.contains('custom-class')).toBe(true);
  });

  it('renders red suits with correct fill', () => {
    const { container } = render(<CardSvg card="K♥" />);
    const texts = container.querySelectorAll('text');
    texts.forEach(text => {
      expect(text.getAttribute('fill')).toBe('var(--card-red)');
    });
  });

  it('renders black suits with correct fill', () => {
    const { container } = render(<CardSvg card="A♠" />);
    const texts = container.querySelectorAll('text');
    texts.forEach(text => {
      expect(text.getAttribute('fill')).toBe('var(--card-black)');
    });
  });
});
