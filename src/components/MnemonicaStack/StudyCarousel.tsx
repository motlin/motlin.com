import React, { useState, useEffect, useCallback } from 'react';
import { MnemonicCard } from './CardSide/MnemonicCard';
import { TransitionImage } from './TransitionImage';
import { FlippableCard } from './FlippableCards/FlippableCard';
import { CardBackWithIndexNumber } from './CardSide/CardBackWithIndexNumber';

export type StudyMode = 'study' | 'test';

export interface StudyCarouselProps {
  autoplay?: boolean;
  interval?: number;
  showControls?: boolean;
  cards: Array<{ card: string; position: number }>;
  size?: number;
  className?: string;
  mode?: StudyMode;
}

type SlideType = 'card' | 'transition';

interface Slide {
  type: SlideType;
  card: string;
  position: number;
  nextCard?: string;
}

export const StudyCarousel: React.FC<StudyCarouselProps> = ({
  autoplay = false,
  interval = 3000,
  showControls = true,
  cards,
  size = 300,
  className = '',
  mode = 'study',
}) => {
  const slides: Slide[] = [];
  cards.forEach((cardData, index) => {
    slides.push({
      type: 'card',
      card: cardData.card,
      position: cardData.position,
    });

    if (index < cards.length - 1) {
      slides.push({
        type: 'transition',
        card: cardData.card,
        position: cardData.position,
        nextCard: cards[index + 1].card,
      });
    }
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timer = setInterval(() => {
      goToNextSlide();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [isPlaying, interval, goToNextSlide]);

  const currentSlide = slides[currentSlideIndex];

  const controlButtonStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    transition: 'background-color 0.2s',
  };

  return (
    <div className={className} style={{ textAlign: 'center' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: size * 1.4,
          marginBottom: '1.5rem',
        }}
      >
        {currentSlide.type === 'card' ? (
          mode === 'study' ? (
            <MnemonicCard
              card={currentSlide.card}
              size={size}
            />
          ) : (
            <FlippableCard
              frontComponent={
                <CardBackWithIndexNumber
                  position={currentSlide.position}
                  size={size}
                />
              }
              backComponent={
                <MnemonicCard
                  card={currentSlide.card}
                  size={size}
                />
              }
              size={size}
            />
          )
        ) : (
          <TransitionImage
            fromCard={currentSlide.card}
            toCard={currentSlide.nextCard!}
            fromPosition={currentSlide.position}
            size={size}
          />
        )}
      </div>

      <div style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 'bold' }}>
        {currentSlide.type === 'card'
          ? `Position ${currentSlide.position}: ${currentSlide.card}`
          : `Transition ${currentSlide.position} → ${currentSlide.position + 1}`}
      </div>

      <div style={{ marginBottom: '1rem', color: '#666' }}>
        Slide {currentSlideIndex + 1} of {slides.length}
      </div>

      {showControls && (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
          <button
            onClick={goToPreviousSlide}
            style={controlButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#007bff';
            }}
          >
            ← Previous
          </button>

          <button
            onClick={togglePlayPause}
            style={{
              ...controlButtonStyle,
              backgroundColor: isPlaying ? '#dc3545' : '#28a745',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isPlaying ? '#bd2130' : '#218838';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isPlaying ? '#dc3545' : '#28a745';
            }}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>

          <button
            onClick={goToNextSlide}
            style={controlButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#007bff';
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default StudyCarousel;
