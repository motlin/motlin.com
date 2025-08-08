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

  const svgRank = rankMap[rank];

  if (!svgRank) {
    throw new Error(`Invalid card format: ${card}`);
  }

  return `/img/mnemonica/cards/${svgRank}${suit}.svg`;
}

export function getActualImagePath(data: MnemonicaCard, position: number): string {
  const paddedPosition = String(position).padStart(2, '0');
  const cardCode = getCardCode(data.card);
  const mnemonic = data.mnemonic;

  const imageExtensions: { [key: number]: string } = {
    1: '.png',
    2: '.png',
    3: '.png',
    4: '.png',
    5: '.png',
    6: '.png',
    7: '.jpg',
    8: '.jpg',
    9: '.webp',
    10: '.jpeg',
    11: '.jpg',
    12: '.webp',
    13: '.jpg',
    14: '.webp',
    15: '.webp',
    16: '.jpg',
    17: '.jpg',
    18: '.jpg',
    19: '.jpg',
    20: '.jpg',
    21: '.webp',
    22: '.jpg',
    23: '.webp',
    24: '.jpg',
    25: '.jpeg',
    26: '.jpg',
    27: '.webp',
    28: '.webp',
    29: '.png',
    30: '.jpeg',
    31: '.webp',
    32: '.jpg',
    33: '.jpg',
    34: '.jpg',
    35: '.jpg',
    36: '.webp',
    37: '.jpg',
    38: '.webp',
    39: '.jpg',
    40: '.jpeg',
    41: '.jpg',
    42: '.jpg',
    43: '.webp',
    44: '.jpg',
    45: '.avif',
    46: '.webp',
    47: '.jpg',
    48: '.jpeg',
    49: '.jpg',
    50: '.webp',
    51: '.jpg',
    52: '.webp'
  };

  const extension = imageExtensions[position] || '.jpg';
  return `/img/mnemonica/${paddedPosition} ${cardCode} ${mnemonic}${extension}`;
}

export function isRedSuit(suit: string): boolean {
  return suit === '♥' || suit === '♦';
}

export function getCardColorClass(suit: string, styles: { readonly [key: string]: string }): string {
  return isRedSuit(suit) ? styles.red : styles.black;
}
