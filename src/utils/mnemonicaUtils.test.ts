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
  const mockCard = { card: 'AS', mnemonic: 'Ace of Spades' };
  const mockCard2 = { card: 'KH', mnemonic: 'King of Hearts' };

  describe('getCardImagePath', () => {
    it('returns correct image path', () => {
      const result = getCardImagePath(mockCard, 1);
      expect(result).toBe('/img/mnemonica/01 AS Ace of Spades.jpg');
    });

    it('pads position correctly', () => {
      const result = getCardImagePath(mockCard, 10);
      expect(result).toBe('/img/mnemonica/10 AS Ace of Spades.jpg');
    });
  });

  describe('getTransitionImagePath', () => {
    it('returns correct transition image path with letter-based card codes', () => {
      const result = getTransitionImagePath(mockCard, mockCard2, 1);
      expect(result).toBe('/img/mnemonica/transitions/01 AS-KH.webp');
    });

    it('returns correct transition image path for different cards', () => {
      const card1 = { card: '4C', mnemonic: 'Four of Clubs' };
      const card2 = { card: '2H', mnemonic: 'Two of Hearts' };
      const result = getTransitionImagePath(card1, card2, 1);
      expect(result).toBe('/img/mnemonica/transitions/01 4C-2H.webp');
    });

    it('pads position correctly for double-digit positions', () => {
      const card1 = { card: 'QH', mnemonic: 'Queen of Hearts' };
      const card2 = { card: '8H', mnemonic: 'Eight of Hearts' };
      const result = getTransitionImagePath(card1, card2, 11);
      expect(result).toBe('/img/mnemonica/transitions/11 QH-8H.webp');
    });

    it('throws error for Unicode suit symbols in fromCard', () => {
      const card1 = { card: '4♣', mnemonic: 'Four of Clubs' };
      const card2 = { card: '2H', mnemonic: 'Two of Hearts' };
      expect(() => getTransitionImagePath(card1, card2, 1)).toThrow('Invalid suit in fromCard: 4♣. Expected S, H, C, or D.');
    });

    it('throws error for Unicode suit symbols in toCard', () => {
      const card1 = { card: '4C', mnemonic: 'Four of Clubs' };
      const card2 = { card: '2♥', mnemonic: 'Two of Hearts' };
      expect(() => getTransitionImagePath(card1, card2, 1)).toThrow('Invalid suit in toCard: 2♥. Expected S, H, C, or D.');
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
    it('returns correct SVG path for Ace of Spades (standard)', () => {
      const result = getCardSvgPath('AS');
      expect(result).toBe('/img/mnemonica/cards/standard/AS.svg');
    });

    it('returns correct SVG path for King of Hearts (standard)', () => {
      const result = getCardSvgPath('KH');
      expect(result).toBe('/img/mnemonica/cards/standard/KH.svg');
    });

    it('returns correct SVG path for 10 of Diamonds (standard)', () => {
      const result = getCardSvgPath('TD');
      expect(result).toBe('/img/mnemonica/cards/standard/TD.svg');
    });

    it('returns correct SVG path for Ace of Spades (outline)', () => {
      const result = getCardSvgPath('AS', 'outline');
      expect(result).toBe('/img/mnemonica/cards/outline/AS.svg');
    });

    it('returns correct SVG path for King of Hearts (outline)', () => {
      const result = getCardSvgPath('KH', 'outline');
      expect(result).toBe('/img/mnemonica/cards/outline/KH.svg');
    });

    it('returns correct SVG path for 10 of Diamonds (outline)', () => {
      const result = getCardSvgPath('TD', 'outline');
      expect(result).toBe('/img/mnemonica/cards/outline/TD.svg');
    });

    it('returns correct SVG path for 10 of Clubs (outline)', () => {
      const result = getCardSvgPath('TC', 'outline');
      expect(result).toBe('/img/mnemonica/cards/outline/TC.svg');
    });

    it('returns correct SVG path for 10 of Hearts (outline)', () => {
      const result = getCardSvgPath('TH', 'outline');
      expect(result).toBe('/img/mnemonica/cards/outline/TH.svg');
    });

    it('returns correct SVG path for 10 of Spades (outline)', () => {
      const result = getCardSvgPath('TS', 'outline');
      expect(result).toBe('/img/mnemonica/cards/outline/TS.svg');
    });

    it('returns correct SVG path with letter-based card codes', () => {
      expect(getCardSvgPath('AS', 'standard')).toBe('/img/mnemonica/cards/standard/AS.svg');
      expect(getCardSvgPath('TD', 'standard')).toBe('/img/mnemonica/cards/standard/TD.svg');
      expect(getCardSvgPath('TD', 'outline')).toBe('/img/mnemonica/cards/outline/TD.svg');
    });

    it('throws error for invalid card format', () => {
      expect(() => getCardSvgPath('invalid')).toThrow('Invalid rank in card: invalid');
    });

    it('rejects "10" and requires "T" for tens', () => {
      expect(() => getCardSvgPath('10D')).toThrow('Invalid rank in card: 10D');
      expect(() => getCardSvgPath('10D', 'standard')).toThrow('Invalid rank in card: 10D');
      expect(() => getCardSvgPath('10D', 'outline')).toThrow('Invalid rank in card: 10D');
    });

    it('throws error for Unicode suit symbols', () => {
      expect(() => getCardSvgPath('A♠')).toThrow('Invalid suit in card: A♠. Expected S, H, C, or D.');
      expect(() => getCardSvgPath('K♥')).toThrow('Invalid suit in card: K♥. Expected S, H, C, or D.');
      expect(() => getCardSvgPath('T♦')).toThrow('Invalid suit in card: T♦. Expected S, H, C, or D.');
      expect(() => getCardSvgPath('T♣')).toThrow('Invalid suit in card: T♣. Expected S, H, C, or D.');
    });
  });
});
