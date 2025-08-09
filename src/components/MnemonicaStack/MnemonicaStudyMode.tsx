import React, { useState, useEffect } from 'react';
import Heading from '@theme/Heading';
import styles from './MnemonicaStudyMode.module.css';
import mnemonicaData from '@site/src/data/mnemonicaData.json';
import { getActualImagePath, getTransitionImagePath } from '@site/src/utils/mnemonicaUtils';

interface ImageSlide {
  type: 'peg' | 'transition';
  imagePath: string;
  title: string;
  subtitle: string;
  position: number;
}

export default function MnemonicaStudyMode() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<ImageSlide[]>([]);

  useEffect(() => {
    const allSlides: ImageSlide[] = [];

    for (let i = 0; i < mnemonicaData.length; i++) {
      const card = mnemonicaData[i];
      const position = i + 1;

      allSlides.push({
        type: 'peg',
        imagePath: getActualImagePath(card, position),
        title: `${card.card} - ${card.mnemonic}`,
        subtitle: `Position ${position}`,
        position
      });

      const nextIndex = (i + 1) % mnemonicaData.length;
      const nextCard = mnemonicaData[nextIndex];
      const transitionImage = getTransitionImagePath(card, nextCard, position);

      if (transitionImage) {
        allSlides.push({
          type: 'transition',
          imagePath: transitionImage,
          title: `${card.card} → ${nextCard.card}`,
          subtitle: `Transition from position ${position}`,
          position
        });
      }
    }

    setSlides(allSlides);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, slides.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleImageClick = () => {
    goToNext();
  };

  if (slides.length === 0) {
    return <div className={styles.container}>Loading...</div>;
  }

  const currentSlide = slides[currentIndex];

  const formatCardTitle = (title: string) => {
    return title.split('').map((char, index) => {
      if (char === '♥' || char === '♦') {
        return <span key={index} className={styles.redSuit}>{char}</span>;
      }
      return char;
    });
  };

  return (
    <div className={styles.container}>
      <Heading as="h1">Mnemonica Study Mode</Heading>
      <p className={styles.instructions}>
        Click the image or press spacebar/right arrow to advance. Press left arrow to go back.
      </p>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
        />
      </div>

      <div className={styles.slideInfo}>
        <span className={styles.slideNumber}>
          {currentIndex + 1} / {slides.length}
        </span>
      </div>

      <div className={styles.slideContainer} onClick={handleImageClick}>
        <div className={styles.slideText}>
          <Heading as="h2" className={styles.slideTitle}>{formatCardTitle(currentSlide.title)}</Heading>
        </div>
        <img
          src={currentSlide.imagePath}
          alt={currentSlide.title}
          className={styles.slideImage}
        />
      </div>

      <div className={styles.controls}>
        <button
          className={styles.controlButton}
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>
        <button
          className={styles.controlButton}
          onClick={goToNext}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
