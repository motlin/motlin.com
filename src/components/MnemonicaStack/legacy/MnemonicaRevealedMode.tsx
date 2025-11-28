import React, { useState } from 'react';
import Heading from '@theme/Heading';
import styles from './MnemonicaRevealedMode.module.css';
import mnemonicaData from '@site/src/data/mnemonicaData.json';
import { getActualImagePath, getCardSvgPath } from '@site/src/utils/mnemonicaUtils';
import Popup from './Popup';
import PlayingCardFrame from './PlayingCardFrame';

interface CardData {
  card: string;
  mnemonic: string;
}

interface PopupData {
  position: number;
  card: CardData;
}

export default function MnemonicaRevealedMode() {
  const [popupData, setPopupData] = useState<PopupData | null>(null);

  const handleCardClick = (position: number, card: CardData) => {
    setPopupData({ position, card });
  };

  const closePopup = () => {
    setPopupData(null);
  };

  const navigateToPrevious = () => {
    if (!popupData || popupData.position <= 1) return;
    const previousPosition = popupData.position - 1;
    const previousCard = mnemonicaData[previousPosition - 1];
    handleCardClick(previousPosition, previousCard);
  };

  const navigateToNext = () => {
    if (!popupData || popupData.position >= mnemonicaData.length) return;
    const nextPosition = popupData.position + 1;
    const nextCard = mnemonicaData[nextPosition - 1];
    handleCardClick(nextPosition, nextCard);
  };

  const renderGrid = () => {
    const rows = [];
    const cardsPerRow = 4;

    for (let i = 0; i < mnemonicaData.length; i += cardsPerRow) {
      const rowCards = mnemonicaData.slice(i, i + cardsPerRow);
      rows.push(
        <div key={`row-${i}`} className={styles.cardRow}>
          {rowCards.map((card, idx) => {
            const position = i + idx + 1;
            return (
              <div
                key={`card-${position}`}
                className={styles.cardTile}
                onClick={() => handleCardClick(position, card)}
                style={{
                  backgroundImage: `url(${getCardSvgPath(card.card)})`,
                }}
              >
                <div className={styles.cardOverlay}>
                  <div className={styles.positionNumber}>{position}</div>
                  <div className={styles.mnemonicText}>
                    {card.mnemonic}
                  </div>
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
      <Heading as="h1">Mnemonica Revealed Mode</Heading>
      <p className={styles.instructions}>Cards shown in Mnemonica order with positions. Click any card for details.</p>
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
