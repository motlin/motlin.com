interface MnemonicaCard {
  card: string;
  mnemonic: string;
}

function getCardCode(card: string): string {
  return card;
}

export function getCardImagePath(data: MnemonicaCard, position: number): string {
  const paddedPosition = String(position).padStart(2, '0');
  const cardCode = getCardCode(data.card);
  const mnemonic = data.mnemonic;

  return `/img/mnemonica/${paddedPosition} ${cardCode} ${mnemonic}.jpg`;
}

export function getTransitionImagePath(
  fromData: MnemonicaCard,
  toData: MnemonicaCard,
  fromPosition: number
): string | undefined {
  const paddedPosition = String(fromPosition).padStart(2, '0');
  const fromCardCode = getCardCode(fromData.card);
  const toCardCode = getCardCode(toData.card);
  const fromMnemonic = fromData.mnemonic;
  const toMnemonic = toData.mnemonic;

  return `/img/mnemonica/transitions/${paddedPosition} ${fromCardCode}-${toCardCode} ${fromMnemonic} - ${toMnemonic}.png`;
}

export function getTransitionDescription(fromData: MnemonicaCard, toData: MnemonicaCard): string {
  return `${fromData.mnemonic} → ${toData.mnemonic}`;
}

export function getStandardDeckOrder(mnemonicaData: MnemonicaCard[]): MnemonicaCard[] {
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const suits = ['♠', '♥', '♣', '♦'];

  const standardOrder: MnemonicaCard[] = [];

  for (const rank of ranks) {
    for (const suit of suits) {
      const card = mnemonicaData.find(item => {
        const cardRank = item.card.slice(0, -1);
        const cardSuit = item.card.slice(-1);
        return cardRank === rank && cardSuit === suit;
      });
      if (card) {
        standardOrder.push(card);
      }
    }
  }

  return standardOrder;
}

export function getMnemonicaPosition(card: MnemonicaCard, mnemonicaData: MnemonicaCard[]): number {
  const index = mnemonicaData.findIndex(item => item.card === card.card);
  return index !== -1 ? index + 1 : 0;
}

export function getCardSvgPath(card: string): string {
  const rank = card.slice(0, -1);
  const suit = card.slice(-1);

  const rankMap: { [key: string]: string } = {
    'A': 'A',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': 'T',
    'J': 'J',
    'Q': 'Q',
    'K': 'K'
  };

  const suitMap: { [key: string]: string } = {
    '♠': 'S',
    '♥': 'H',
    '♦': 'D',
    '♣': 'C'
  };

  const svgRank = rankMap[rank];
  const svgSuit = suitMap[suit];

  if (!svgRank || !svgSuit) {
    throw new Error(`Invalid card format: ${card}`);
  }

  return `/img/mnemonica/inbox/poker-blank-Maze/${svgRank}${svgSuit}.svg`;
}

export function getActualImagePath(data: MnemonicaCard, _position: number): string {
  const cardCode = getCardCode(data.card);

  const imageExtensions: { [key: string]: string } = {
    '4♣': '.png',
    '2♥': '.png',
    '7♦': '.png',
    '3♣': '.png',
    '4♥': '.png',
    '6♦': '.png',
    'A♠': '.jpg',
    '5♥': '.jpg',
    '9♠': '.webp',
    '2♠': '.jpeg',
    'Q♥': '.jpg',
    '3♦': '.webp',
    'Q♣': '.jpg',
    '8♥': '.webp',
    '6♠': '.webp',
    '5♠': '.jpg',
    '9♥': '.jpg',
    'K♣': '.jpg',
    '2♦': '.jpg',
    'J♥': '.jpg',
    '3♠': '.webp',
    '8♠': '.jpg',
    '6♥': '.webp',
    '10♣': '.jpg',
    '5♦': '.jpeg',
    'K♦': '.jpg',
    '2♣': '.webp',
    '3♥': '.webp',
    '8♦': '.png',
    '5♣': '.jpeg',
    'K♠': '.webp',
    'J♦': '.jpg',
    '8♣': '.jpg',
    '10♠': '.jpg',
    'K♥': '.jpg',
    'J♣': '.webp',
    '7♠': '.jpg',
    '10♥': '.webp',
    'A♦': '.jpg',
    '4♠': '.jpeg',
    '7♥': '.jpg',
    '4♦': '.jpg',
    'A♣': '.webp',
    '9♣': '.jpg',
    'J♠': '.avif',
    'Q♦': '.webp',
    '7♣': '.jpg',
    'Q♠': '.jpeg',
    '10♦': '.jpg',
    '6♣': '.webp',
    'A♥': '.jpg',
    '9♦': '.webp'
  };

  const extension = imageExtensions[cardCode] || '.jpg';
  return `/img/mnemonica/pegs/${cardCode}${extension}`;
}

export function isRedSuit(suit: string): boolean {
  return suit === '♥' || suit === '♦';
}

export function getCardColorClass(suit: string, styles: { readonly [key: string]: string }): string {
  return isRedSuit(suit) ? styles.red : styles.black;
}
