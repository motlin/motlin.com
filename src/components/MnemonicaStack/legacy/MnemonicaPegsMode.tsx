import React, { useState } from 'react';
import Heading from '@theme/Heading';
import styles from './MnemonicaPegsMode.module.css';
import mnemonicaData from '@site/src/data/mnemonicaData.json';
import { getStandardDeckOrder, getMnemonicaPosition, getActualImagePath, getTransitionImagePath } from '@site/src/utils/mnemonicaUtils';
import Popup from './Popup';
import CompactCardFrame from '../CompactCardFrame';

interface CardData {
  card: string;
  mnemonic: string;
}

interface PopupData {
  card: CardData;
  position: number;
  previous: { card: CardData; position: number } | null;
  next: { card: CardData; position: number } | null;
}

export default function MnemonicaPegsMode() {
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const standardDeck = getStandardDeckOrder(mnemonicaData);

  const handleCardClick = (card: CardData) => {
    const position = getMnemonicaPosition(card, mnemonicaData);
    const mnemonicaIndex = position - 1;

    const previous = mnemonicaIndex > 0 ? {
      card: mnemonicaData[mnemonicaIndex - 1],
      position: mnemonicaIndex
    } : null;

    const next = mnemonicaIndex < mnemonicaData.length - 1 ? {
      card: mnemonicaData[mnemonicaIndex + 1],
      position: mnemonicaIndex + 2
    } : null;

    setPopupData({ card, position, previous, next });
  };

  const closePopup = () => {
    setPopupData(null);
  };

  const navigateToPrevious = () => {
    if (!popupData) return;
    const currentIndex = standardDeck.findIndex(card => card.card === popupData.card.card);
    if (currentIndex > 0) {
      const previousCard = standardDeck[currentIndex - 1];
      handleCardClick(previousCard);
    }
  };

  const navigateToNext = () => {
    if (!popupData) return;
    const currentIndex = standardDeck.findIndex(card => card.card === popupData.card.card);
    if (currentIndex < standardDeck.length - 1) {
      const nextCard = standardDeck[currentIndex + 1];
      handleCardClick(nextCard);
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
            const isRed = card.card.includes('♥') || card.card.includes('♦');
            return (
              <div
                key={`card-${i + idx}`}
                className={styles.card}
                onClick={() => handleCardClick(card)}
              >
                <span className={isRed ? styles.red : styles.black}>
                  {card.card}
                </span>
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
      <Heading as="h1">Mnemonica Pegs Mode</Heading>
      <p className={styles.instructions}>Click any card to see its mnemonic peg with navigation</p>
      <div className={styles.cardGrid}>
        {renderGrid()}
      </div>

      <Popup
        isOpen={!!popupData}
        onClose={closePopup}
        onPrevious={navigateToPrevious}
        onNext={navigateToNext}
      >
        {popupData && (
          <div className={styles.popupContent}>
            <div className={styles.tilesLayout}>
              <div className={styles.pegRow}>
                {popupData.previous && (
                  <CompactCardFrame
                    card={popupData.previous.card.card}
                    imageSrc={getActualImagePath(popupData.previous.card, popupData.previous.position)}
                    mnemonic={popupData.previous.card.mnemonic}
                    position={popupData.previous.position}
                    title="Previous"
                    className={styles.pegTile}
                  />
                )}

                <CompactCardFrame
                  card={popupData.card.card}
                  imageSrc={getActualImagePath(popupData.card, popupData.position)}
                  mnemonic={popupData.card.mnemonic}
                  position={popupData.position}
                  title="Current"
                  className={`${styles.pegTile} ${styles.currentPeg}`}
                />

                {popupData.next && (
                  <CompactCardFrame
                    card={popupData.next.card.card}
                    imageSrc={getActualImagePath(popupData.next.card, popupData.next.position)}
                    mnemonic={popupData.next.card.mnemonic}
                    position={popupData.next.position}
                    title="Next"
                    className={styles.pegTile}
                  />
                )}
              </div>

              <div className={styles.transitionRow}>
                {popupData.previous && (
                  <div className={styles.transitionTile}>
                    <Heading as="h4">Transition from Previous</Heading>
                    <div className={styles.transitionImage}>
                      <img
                        src={getTransitionImagePath(
                          popupData.previous.card,
                          popupData.card,
                          popupData.previous.position
                        )}
                        alt={`Transition from ${popupData.previous.card.mnemonic} to ${popupData.card.mnemonic}`}
                      />
                    </div>
                  </div>
                )}

                {popupData.next && (
                  <div className={`${styles.transitionTile} ${!popupData.previous ? styles.transitionAlignRight : ''}`}>
                    <Heading as="h4">Transition to Next</Heading>
                    <div className={styles.transitionImage}>
                      <img
                        src={getTransitionImagePath(
                          popupData.card,
                          popupData.next.card,
                          popupData.position
                        )}
                        alt={`Transition from ${popupData.card.mnemonic} to ${popupData.next.card.mnemonic}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
