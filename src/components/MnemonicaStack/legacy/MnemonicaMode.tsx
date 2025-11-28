import React, { useState, useEffect } from 'react';
import Heading from '@theme/Heading';
import styles from './MnemonicaMode.module.css';
import mnemonicaData from '@site/src/data/mnemonicaData.json';
import { getActualImagePath } from '@site/src/utils/mnemonicaUtils';
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

export default function MnemonicaMode() {
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<number>(1);

  const handleOrdinalClick = (position: number) => {
    const card = mnemonicaData[position - 1];
    setPopupData({ position, card });
    setSelectedPosition(position);
  };

  const closePopup = () => {
    setPopupData(null);
  };

  const navigateToPrevious = () => {
    if (popupData && popupData.position > 1) {
      handleOrdinalClick(popupData.position - 1);
    }
  };

  const navigateToNext = () => {
    if (popupData && popupData.position < mnemonicaData.length) {
      handleOrdinalClick(popupData.position + 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!popupData) {
        if (e.key === 'ArrowLeft' && selectedPosition > 1) {
          setSelectedPosition(selectedPosition - 1);
        } else if (e.key === 'ArrowRight' && selectedPosition < mnemonicaData.length) {
          setSelectedPosition(selectedPosition + 1);
        } else if (e.key === 'ArrowUp' && selectedPosition > 4) {
          setSelectedPosition(selectedPosition - 4);
        } else if (e.key === 'ArrowDown' && selectedPosition <= mnemonicaData.length - 4) {
          setSelectedPosition(selectedPosition + 4);
        } else if (e.key === 'Enter' || e.key === ' ') {
          handleOrdinalClick(selectedPosition);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [popupData, selectedPosition]);

  const renderGrid = () => {
    const rows = [];
    const cardsPerRow = 4;

    for (let i = 0; i < mnemonicaData.length; i += cardsPerRow) {
      const rowPositions = [];
      for (let j = 0; j < cardsPerRow && i + j < mnemonicaData.length; j++) {
        const position = i + j + 1;
        rowPositions.push(
          <div
            key={`pos-${position}`}
            className={`${styles.ordinal} ${selectedPosition === position ? styles.selected : ''}`}
            onClick={() => handleOrdinalClick(position)}
          >
            <span>{position}</span>
          </div>
        );
      }

      rows.push(
        <div key={`row-${i}`} className={styles.cardRow}>
          {rowPositions}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className={styles.container}>
      <Heading as="h1">Mnemonica Mode</Heading>
      <p className={styles.instructions}>Click any position number to see the card at that position</p>
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
