import React, { useState } from 'react';
import Heading from '@theme/Heading';
import styles from './MnemonicaStack.module.css';
import mnemonicaData from '@site/src/data/mnemonicaData.json';

interface CardData {
  card: string;
  mnemonic: string;
  image: string;
  transitionImage?: string;
  transitionDescription?: string;
}

type CardState = 'position' | 'image' | 'mnemonic' | 'card';

interface CardProps {
  position: number;
  data: CardData;
  state: CardState;
  onStateChange: (newState: CardState) => void;
  onImageHover: (image: { src: string; alt: string } | null) => void;
}

interface TransitionProps {
  image?: string;
  description?: string;
  state: CardState;
  onStateChange: (newState: CardState) => void;
  onImageHover: (image: { src: string; alt: string } | null) => void;
}

function TransitionCard({ image, description, state, onStateChange, onImageHover }: TransitionProps) {
  const [frontContent, setFrontContent] = useState<React.ReactNode>(null);
  const [backContent, setBackContent] = useState<React.ReactNode>(null);
  // Transition cards only flip between position (arrow) and image states
  const isFlipped = state === 'image' || state === 'card';

  React.useEffect(() => {
    // Front always shows arrow
    setFrontContent(
      <div className={styles.transitionPlaceholder}>
        <span>→</span>
      </div>
    );

    // Back shows image or arrow if no image
    if (image) {
      setBackContent(
        <img
          src={image}
          alt={description || 'Transition'}
          title={description}
          onMouseEnter={() => onImageHover({ src: image, alt: description || 'Transition' })}
          onMouseLeave={() => onImageHover(null)}
        />
      );
    } else {
      setBackContent(
        <div className={styles.transitionPlaceholder}>
          <span>→</span>
        </div>
      );
    }
  }, [image, description, onImageHover]);

  const handleClick = () => {
    // Transitions only toggle between front (position/mnemonic) and back (image/card)
    if (state === 'position' || state === 'mnemonic') {
      onStateChange('image');
    } else {
      onStateChange('position');
    }
  };

  return (
    <div className={styles.transitionContainer} onClick={handleClick}>
      <div className={`${styles.transitionInner} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.transitionFace} ${styles.transitionFront}`}>
          {frontContent}
        </div>
        <div className={`${styles.transitionFace} ${styles.transitionBack}`}>
          {backContent}
        </div>
      </div>
    </div>
  );
}

function Card({ position, data, state, onStateChange, onImageHover }: CardProps) {
  const [frontContent, setFrontContent] = useState<React.ReactNode>(null);
  const [backContent, setBackContent] = useState<React.ReactNode>(null);
  const isRed = data.card.includes('♥') || data.card.includes('♦');

  // Determine if card should be flipped based on state
  // position and mnemonic show on front (not flipped)
  // image and card show on back (flipped)
  const isFlipped = state === 'image' || state === 'card';

  React.useEffect(() => {
    // Update only the face that will be visible after the state change
    switch (state) {
      case 'position':
        setFrontContent(<span style={{ fontSize: '28px' }}>{position}</span>);
        break;
      case 'image':
        setBackContent(
          <img
            src={data.image}
            alt={`Mnemonic for ${data.card}`}
            onMouseEnter={() => onImageHover({ src: data.image, alt: `Mnemonic for ${data.card}` })}
            onMouseLeave={() => onImageHover(null)}
          />
        );
        break;
      case 'mnemonic':
        setFrontContent(<span>{data.mnemonic}</span>);
        break;
      case 'card':
        setBackContent(<span className={isRed ? styles.red : styles.black} style={{ fontSize: '32px' }}>{data.card}</span>);
        break;
    }
  }, [state, position, data, isRed, onImageHover]);

  const handleClick = () => {
    const stateOrder: CardState[] = ['position', 'image', 'mnemonic', 'card'];
    const currentIndex = stateOrder.indexOf(state);
    const nextIndex = (currentIndex + 1) % stateOrder.length;
    onStateChange(stateOrder[nextIndex]);
  };

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
          {frontContent}
        </div>
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          {backContent}
        </div>
      </div>
    </div>
  );
}

export default function MnemonicaStack() {
  const [cardStates, setCardStates] = useState<CardState[]>(
    mnemonicaData.map(() => 'position')
  );
  const [transitionStates, setTransitionStates] = useState<CardState[]>(
    mnemonicaData.map(() => 'position')
  );
  const [hoveredImage, setHoveredImage] = useState<{ src: string; alt: string } | null>(null);

  const handleCardStateChange = (index: number, newState: CardState) => {
    setCardStates(prev => {
      const newStates = [...prev];
      newStates[index] = newState;
      return newStates;
    });
  };

  const handleTransitionStateChange = (index: number, newState: CardState) => {
    setTransitionStates(prev => {
      const newStates = [...prev];
      newStates[index] = newState;
      return newStates;
    });
  };

  const showAll = (targetState: CardState) => {
    setCardStates(mnemonicaData.map(() => targetState));
    setTransitionStates(mnemonicaData.map(() => targetState));
  };

  // Create rows of 4 cards + 3 transitions each
  const renderRows = () => {
    const rows = [];
    const cardsPerRow = 4;

    for (let i = 0; i < mnemonicaData.length; i += cardsPerRow) {
      const rowCards = mnemonicaData.slice(i, i + cardsPerRow);
      const rowElements = [];

      rowCards.forEach((data, idx) => {
        const globalIndex = i + idx;
        rowElements.push(
          <Card
            key={`card-${globalIndex}`}
            position={globalIndex + 1}
            data={data}
            state={cardStates[globalIndex]}
            onStateChange={(newState) => handleCardStateChange(globalIndex, newState)}
            onImageHover={setHoveredImage}
          />
        );

        // Add transition after each card except the last in the row and the very last card
        if (idx < rowCards.length - 1 || (globalIndex < mnemonicaData.length - 1 && idx === rowCards.length - 1)) {
          rowElements.push(
            <TransitionCard
              key={`trans-${globalIndex}`}
              image={data.transitionImage}
              description={data.transitionDescription}
              state={transitionStates[globalIndex]}
              onStateChange={(newState) => handleTransitionStateChange(globalIndex, newState)}
              onImageHover={setHoveredImage}
            />
          );
        }
      });

      rows.push(
        <div key={`row-${i}`} className={styles.cardRow}>
          {rowElements}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className={styles.container}>
      <Heading as="h1">Interactive Mnemonica Stack</Heading>
      <p className={styles.instructions}>Click cards to cycle through: Position → Image → Mnemonic → Card</p>
      <div className={styles.buttonContainer}>
        <button onClick={() => showAll('position')} className={styles.controlButton}>Positions</button>
        <button onClick={() => showAll('image')} className={styles.controlButton}>Images</button>
        <button onClick={() => showAll('mnemonic')} className={styles.controlButton}>Mnemonics</button>
        <button onClick={() => showAll('card')} className={styles.controlButton}>Cards</button>
      </div>
      <div className={styles.cardGridWithTransitions}>
        {renderRows()}
      </div>
      {hoveredImage && (
        <div className={styles.imageOverlay}>
          <img src={hoveredImage.src} alt={hoveredImage.alt} />
        </div>
      )}
    </div>
  );
}
