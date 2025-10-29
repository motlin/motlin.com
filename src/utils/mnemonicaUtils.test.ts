import { describe, it, expect } from 'vitest';
import {
  getCardImagePath,
  getTransitionImagePath,
  getTransitionDescription,
  isRedSuit,
  getCardColorClass,
  getCardSvgPath,
} from './mnemonicaUtils';

describe('mnemonicaUtils', () => {
  const mockCard = { card: 'A♠', mnemonic: 'Ace of Spades' };
  const mockCard2 = { card: 'K♥', mnemonic: 'King of Hearts' };

  describe('getCardImagePath', () => {
    it('returns correct image path', () => {
      const result = getCardImagePath(mockCard, 1);
      expect(result).toBe('/img/mnemonica/01 A♠ Ace of Spades.jpg');
    });

    it('pads position correctly', () => {
      const result = getCardImagePath(mockCard, 10);
      expect(result).toBe('/img/mnemonica/10 A♠ Ace of Spades.jpg');
    });
  });

  describe('getTransitionImagePath', () => {
    it('returns correct transition image path', () => {
      const result = getTransitionImagePath(mockCard, mockCard2, 1);
      expect(result).toBe('/img/mnemonica/transitions/01 A♠-K♥ Ace of Spades - King of Hearts.png');
    });
  });

  describe('getTransitionDescription', () => {
    it('returns correct transition description', () => {
      const result = getTransitionDescription(mockCard, mockCard2);
      expect(result).toBe('Ace of Spades → King of Hearts');
    });
  });

  describe('isRedSuit', () => {
    it('returns true for hearts', () => {
      expect(isRedSuit('♥')).toBe(true);
    });

    it('returns true for diamonds', () => {
      expect(isRedSuit('♦')).toBe(true);
    });

    it('returns false for spades', () => {
      expect(isRedSuit('♠')).toBe(false);
    });

    it('returns false for clubs', () => {
      expect(isRedSuit('♣')).toBe(false);
    });
  });

  describe('getCardColorClass', () => {
    const styles = { red: 'red-class', black: 'black-class' };

    it('returns red class for hearts', () => {
      expect(getCardColorClass('♥', styles)).toBe('red-class');
    });

    it('returns red class for diamonds', () => {
      expect(getCardColorClass('♦', styles)).toBe('red-class');
    });

    it('returns black class for spades', () => {
      expect(getCardColorClass('♠', styles)).toBe('black-class');
    });

    it('returns black class for clubs', () => {
      expect(getCardColorClass('♣', styles)).toBe('black-class');
    });
  });

  describe('getCardSvgPath', () => {
    it('returns correct SVG path for Ace of Spades', () => {
      const result = getCardSvgPath('A♠');
      expect(result).toBe('/img/mnemonica/cards/A♠.svg');
    });

    it('returns correct SVG path for King of Hearts', () => {
      const result = getCardSvgPath('K♥');
      expect(result).toBe('/img/mnemonica/cards/K♥.svg');
    });

    it('returns correct SVG path for 10 of Diamonds', () => {
      const result = getCardSvgPath('10♦');
      expect(result).toBe('/img/mnemonica/cards/T♦.svg');
    });

    it('throws error for invalid card format', () => {
      expect(() => getCardSvgPath('invalid')).toThrow('Invalid card format: invalid');
    });
  });
});
