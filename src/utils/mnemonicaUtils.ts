export interface MnemonicaCard {
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
  const fromRank = fromData.card.slice(0, -1);
  const fromSuit = fromData.card.slice(-1);
  const toRank = toData.card.slice(0, -1);
  const toSuit = toData.card.slice(-1);

  const validSuits = ['S', 'H', 'C', 'D'];

  if (!validSuits.includes(fromSuit)) {
    throw new Error(`Invalid suit in fromCard: ${fromData.card}. Expected S, H, C, or D.`);
  }

  if (!validSuits.includes(toSuit)) {
    throw new Error(`Invalid suit in toCard: ${toData.card}. Expected S, H, C, or D.`);
  }

  const fromSuitLetter = fromSuit;
  const toSuitLetter = toSuit;
  const fromCardCode = `${fromRank}${fromSuitLetter}`;
  const toCardCode = `${toRank}${toSuitLetter}`;

  return `/img/mnemonica/transitions/${paddedPosition} ${fromCardCode}-${toCardCode}.webp`;
}

export function getTransitionDescription(fromData: MnemonicaCard, toData: MnemonicaCard): string {
  return `${fromData.mnemonic} → ${toData.mnemonic}`;
}

export function getStandardDeckOrder(mnemonicaData: MnemonicaCard[]): MnemonicaCard[] {
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
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

export type CardType = 'standard' | 'outline';

export function getCardSvgPath(card: string, type: CardType = 'standard'): string {
  const rank = card.slice(0, -1);
  const suit = card.slice(-1);

  const validRanks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
  const validSuits = ['S', 'H', 'C', 'D'];

  if (!validRanks.includes(rank)) {
    throw new Error(`Invalid rank in card: ${card}`);
  }

  if (!validSuits.includes(suit)) {
    throw new Error(`Invalid suit in card: ${card}. Expected S, H, C, or D.`);
  }

  return `/img/mnemonica/cards/${type}/${rank}${suit}.svg`;
}

export function getActualImagePath(data: MnemonicaCard, position: number): string {
  const paddedPosition = String(position).padStart(2, '0');
  const rank = data.card.slice(0, -1);
  const suit = data.card.slice(-1);

  const validSuits = ['S', 'H', 'C', 'D'];

  if (!validSuits.includes(suit)) {
    throw new Error(`Invalid suit in card: ${data.card}. Expected S, H, C, or D.`);
  }

  const cardCode = `${rank}${suit}`;

  return `/img/mnemonica/pegs/${paddedPosition} ${cardCode}.webp`;
}

export function isRedSuit(suit: string): boolean {
  return suit === '♥' || suit === '♦';
}

export function getCardColorClass(suit: string, styles: { readonly [key: string]: string }): string {
  return isRedSuit(suit) ? styles.red : styles.black;
}
