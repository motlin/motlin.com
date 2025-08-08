import type { Meta } from '@storybook/react';
import {
  getCardImagePath,
  getTransitionImagePath,
  getTransitionDescription,
  getStandardDeckOrder,
  getMnemonicaPosition,
  getCardSvgPath,
  getActualImagePath,
  isRedSuit,
  getCardColorClass
} from '../../utils/mnemonicaUtils';

const meta = {
  title: 'MnemonicaStack/Utils',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

const sampleCard = { card: 'A♠', mnemonic: 'Ace of Spades' };
const sampleCard2 = { card: 'K♥', mnemonic: 'King of Hearts' };
const sampleDeck = [
  { card: '4♣', mnemonic: 'Fight Club' },
  { card: '2♥', mnemonic: 'Two Hands' },
  { card: '7♦', mnemonic: 'Lucky Seven' },
  { card: '3♣', mnemonic: 'Three Clubs' }
];

const styles = {
  red: 'red-color-class',
  black: 'black-color-class'
} as const;

export const CardImagePath = {
  render: () => (
    <div>
      <h3>getCardImagePath</h3>
      <p>Generates the path for a card image based on position and mnemonic.</p>
      <pre>{getCardImagePath(sampleCard, 1)}</pre>
      <pre>{getCardImagePath(sampleCard2, 26)}</pre>
    </div>
  ),
};

export const TransitionImagePath = {
  render: () => (
    <div>
      <h3>getTransitionImagePath</h3>
      <p>Generates the path for transition images between two cards.</p>
      <pre>{getTransitionImagePath(sampleCard, sampleCard2, 1)}</pre>
    </div>
  ),
};

export const TransitionDescription = {
  render: () => (
    <div>
      <h3>getTransitionDescription</h3>
      <p>Creates a description for card transitions.</p>
      <p>{getTransitionDescription(sampleCard, sampleCard2)}</p>
    </div>
  ),
};

export const StandardDeckOrder = {
  render: () => {
    const standardOrder = getStandardDeckOrder(sampleDeck);
    return (
      <div>
        <h3>getStandardDeckOrder</h3>
        <p>Sorts cards into standard deck order (by rank then suit).</p>
        <h4>Original:</h4>
        <ul>
          {sampleDeck.map((card, i) => (
            <li key={i}>{card.card} - {card.mnemonic}</li>
          ))}
        </ul>
        <h4>Standard Order:</h4>
        <ul>
          {standardOrder.map((card, i) => (
            <li key={i}>{card.card} - {card.mnemonic}</li>
          ))}
        </ul>
      </div>
    );
  },
};

export const MnemonicaPosition = {
  render: () => (
    <div>
      <h3>getMnemonicaPosition</h3>
      <p>Finds the position of a card in the mnemonica deck.</p>
      <p>Position of {sampleDeck[0].card}: {getMnemonicaPosition(sampleDeck[0], sampleDeck)}</p>
      <p>Position of {sampleDeck[2].card}: {getMnemonicaPosition(sampleDeck[2], sampleDeck)}</p>
    </div>
  ),
};

export const CardSvgPath = {
  render: () => (
    <div>
      <h3>getCardSvgPath</h3>
      <p>Generates SVG file paths for cards.</p>
      <pre>{getCardSvgPath('A♠')}</pre>
      <pre>{getCardSvgPath('K♥')}</pre>
      <pre>{getCardSvgPath('10♦')}</pre>
      <pre>{getCardSvgPath('Q♣')}</pre>
    </div>
  ),
};

export const ActualImagePath = {
  render: () => (
    <div>
      <h3>getActualImagePath</h3>
      <p>Gets the actual image path with the correct file extension.</p>
      <pre>{getActualImagePath(sampleCard, 1)}</pre>
      <pre>{getActualImagePath(sampleCard, 7)}</pre>
      <pre>{getActualImagePath(sampleCard, 45)}</pre>
    </div>
  ),
};

export const SuitChecks = {
  render: () => (
    <div>
      <h3>isRedSuit</h3>
      <p>Checks if a suit is red (hearts or diamonds).</p>
      <ul>
        <li>♠ is red: {isRedSuit('♠').toString()}</li>
        <li>♥ is red: {isRedSuit('♥').toString()}</li>
        <li>♦ is red: {isRedSuit('♦').toString()}</li>
        <li>♣ is red: {isRedSuit('♣').toString()}</li>
      </ul>
    </div>
  ),
};

export const CardColorClass = {
  render: () => (
    <div>
      <h3>getCardColorClass</h3>
      <p>Returns the appropriate CSS class for card colors.</p>
      <ul>
        <li>♠: {getCardColorClass('♠', styles)}</li>
        <li>♥: {getCardColorClass('♥', styles)}</li>
        <li>♦: {getCardColorClass('♦', styles)}</li>
        <li>♣: {getCardColorClass('♣', styles)}</li>
      </ul>
    </div>
  ),
};
