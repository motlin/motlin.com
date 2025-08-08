import React, { useState } from 'react';
import Heading from '@theme/Heading';
import styles from './PegsRevealedMode.module.css';
import mnemonicaData from '@site/src/data/mnemonicaData.json';
import { getStandardDeckOrder, getMnemonicaPosition, getActualImagePath } from '@site/src/utils/mnemonicaUtils';
import Popup from './Popup';
import PlayingCardFrame from './PlayingCardFrame';

interface CardData {
  card: string;
  mnemonic: string;
}

interface PopupData {
  card: CardData;
  position: number;
}

export default function PegsRevealedMode() {
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const standardDeck = getStandardDeckOrder(mnemonicaData);

  const handleImageClick = (card: CardData) => {
    const position = getMnemonicaPosition(card, mnemonicaData);
    setPopupData({ card, position });
  };

  const closePopup = () => {
    setPopupData(null);
  };

  const navigateToPrevious = () => {
    if (!popupData) return;
    const currentIndex = standardDeck.findIndex(card => card.card === popupData.card.card);
    if (currentIndex > 0) {
      const previousCard = standardDeck[currentIndex - 1];
      handleImageClick(previousCard);
    }
  };

  const navigateToNext = () => {
    if (!popupData) return;
    const currentIndex = standardDeck.findIndex(card => card.card === popupData.card.card);
    if (currentIndex < standardDeck.length - 1) {
      const nextCard = standardDeck[currentIndex + 1];
      handleImageClick(nextCard);
    }
  };

  const renderGrid = () => {
    const rows = [];
    const cardsPerRow = 4;

    for (let i = 0; i < standardDeck.length; i += cardsPerRow) {
      const rowCards = standardDeck.slice(i, i + cardsPerRow);
      rows.push(
        <div key={`row-${i}`} className={styles.cardRow}>
          {rowCards.map((card, idx) => {
            const position = getMnemonicaPosition(card, mnemonicaData);
            const isRed = card.card.includes('♥') || card.card.includes('♦');
            return (
              <div
                key={`card-${i + idx}`}
                className={styles.imageCard}
                onClick={() => handleImageClick(card)}
              >
                <img
                  src={getActualImagePath(card, position)}
                  alt={`Mnemonic for ${card.card}`}
                  className={styles.mnemonicImage}
                />
                <div className={styles.cardOverlay}>
                  <span className={isRed ? styles.red : styles.black}>
                    {card.card}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className={styles.container}>
      <Heading as="h1">Pegs Revealed Mode</Heading>
      <p className={styles.instructions}>All mnemonic images revealed. Click any image to see it larger.</p>
      <div className={styles.cardGrid}>
        {renderGrid()}
      </div>

      <Popup
        isOpen={!!popupData}
        onClose={closePopup}
        onPrevious={navigateToPrevious}
        onNext={navigateToNext}
        isCardStyle
      >
        {popupData && (
          <div className={styles.popupContent}>
            <PlayingCardFrame
              card={popupData.card.card}
              imageSrc={getActualImagePath(popupData.card, popupData.position)}
              mnemonic={popupData.card.mnemonic}
              position={popupData.position}
              className={styles.popupCardFrameContainer}
            />
          </div>
        )}
      </Popup>
    </div>
  );
}
