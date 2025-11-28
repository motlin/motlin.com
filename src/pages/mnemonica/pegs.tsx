import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { MnemonicCard } from '@site/src/components/MnemonicaStack/CardSide/MnemonicCard';
import { TransitionImage } from '@site/src/components/MnemonicaStack/TransitionImage';
import mnemonicaData from '@site/src/data/mnemonicaData.json';
import styles from './pegs.module.css';

export default function PegsNavigationPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = mnemonicaData.length;

  const currentCard = mnemonicaData[currentIndex];
  const previousCard = currentIndex > 0 ? mnemonicaData[currentIndex - 1] : null;
  const nextCard = currentIndex < totalCards - 1 ? mnemonicaData[currentIndex + 1] : null;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <Layout
      title="Mnemonica Stack - Pegs Navigation"
      description="Navigate through the stack with previous/next cards and transitions"
    >
      <div className={styles.container}>
        <Heading as="h1">Mnemonica Pegs Navigation</Heading>
        <p className={styles.instructions}>
          Navigate through the mnemonica stack. Use arrow keys or buttons to move between cards.
        </p>

        <div className={styles.navigationContainer}>
          <div className={styles.mainContent}>
            <div className={styles.cardSection}>
              <MnemonicCard
                card={currentCard.card}
                showPosition={true}
                size={300}
                className={styles.mainCard}
              />
              <div className={styles.cardInfo}>
                <Heading as="h2">{currentCard.card}</Heading>
                <p className={styles.mnemonic}>{currentCard.mnemonic}</p>
                <p className={styles.position}>Position {currentIndex + 1} of {totalCards}</p>
              </div>
            </div>

            <div className={styles.transitionsSection}>
              {previousCard && (
                <div className={styles.transitionBox}>
                  <Heading as="h3">From Previous</Heading>
                  <p className={styles.transitionLabel}>
                    {previousCard.mnemonic} → {currentCard.mnemonic}
                  </p>
                  <TransitionImage
                    fromCard={previousCard.card}
                    toCard={currentCard.card}
                    fromPosition={currentIndex}
                    className={styles.transitionImage}
                  />
                </div>
              )}

              {nextCard && (
                <div className={styles.transitionBox}>
                  <Heading as="h3">To Next</Heading>
                  <p className={styles.transitionLabel}>
                    {currentCard.mnemonic} → {nextCard.mnemonic}
                  </p>
                  <TransitionImage
                    fromCard={currentCard.card}
                    toCard={nextCard.card}
                    fromPosition={currentIndex + 1}
                    className={styles.transitionImage}
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.navigationControls}>
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={styles.navButton}
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === totalCards - 1}
              className={styles.navButton}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
