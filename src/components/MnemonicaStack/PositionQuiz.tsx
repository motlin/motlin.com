import React, { useState, useCallback, useMemo } from 'react';
import { CardBackWithIndexNumber } from './CardSide/CardBackWithIndexNumber';
import { IndexWithStandardCard } from './FlippableCards/IndexWithStandardCard';

export type QuizMode = 'position-to-card' | 'card-to-position';

export interface PositionQuizProps {
  cards: Array<{ card: string; position: number }>;
  mode?: QuizMode;
  showFeedback?: boolean;
  shuffleQuestions?: boolean;
  size?: number;
  className?: string;
}

export const PositionQuiz: React.FC<PositionQuizProps> = ({
  cards,
  mode = 'position-to-card',
  showFeedback = true,
  shuffleQuestions = true,
  size = 200,
  className = '',
}) => {
  const questions = useMemo(() => {
    if (!shuffleQuestions) {
      return [...cards];
    }
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [cards, shuffleQuestions]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = currentQuestionIndex + 1;
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const checkAnswer = useCallback(() => {
    if (mode === 'position-to-card') {
      const correct = userAnswer.toUpperCase() === currentQuestion.card;
      setIsCorrect(correct);
      if (correct) {
        setCorrectCount((count) => count + 1);
      } else {
        setIncorrectCount((count) => count + 1);
      }
    } else {
      const correct = parseInt(userAnswer, 10) === currentQuestion.position;
      setIsCorrect(correct);
      if (correct) {
        setCorrectCount((count) => count + 1);
      } else {
        setIncorrectCount((count) => count + 1);
      }
      setCardFlipped(true);
    }
    setIsAnswered(true);
  }, [mode, userAnswer, currentQuestion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAnswered && userAnswer.trim()) {
      checkAnswer();
    }
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((index) => index + 1);
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setCardFlipped(false);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCardFlipped(false);
  };

  const inputStyle: React.CSSProperties = {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '2px solid #ccc',
    borderRadius: '4px',
    width: '200px',
    textAlign: 'center',
  };

  const buttonStyle: React.CSSProperties = {
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

  const feedbackStyle: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '4px',
    marginTop: '1rem',
    fontWeight: 'bold',
    backgroundColor: isCorrect ? '#d4edda' : '#f8d7da',
    color: isCorrect ? '#155724' : '#721c24',
    border: isCorrect ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
  };

  if (currentQuestionIndex >= questions.length) {
    const percentage = totalQuestions > 0
      ? Math.round((correctCount / totalQuestions) * 100)
      : 0;

    return (
      <div className={className} style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ marginBottom: '1rem', fontSize: '1.75rem', fontWeight: 'bold' }}>Quiz Complete!</div>

        <div style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: percentage >= 80 ? '#28a745' : percentage >= 60 ? '#ffc107' : '#dc3545'
        }}>
          {percentage}%
        </div>

        <div style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            ✓ Correct: {correctCount}
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            ✗ Incorrect: {incorrectCount}
          </div>
          <div>
            Total Questions: {totalQuestions}
          </div>
        </div>

        <button
          onClick={restartQuiz}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0056b3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#007bff';
          }}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className={className} style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ marginBottom: '1rem', fontSize: '1rem', color: '#666' }}>
        Question {progress} of {totalQuestions}
      </div>

      <div style={{
        marginBottom: '1rem',
        height: '8px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        maxWidth: '400px',
        margin: '0 auto 1.5rem'
      }}>
        <div style={{
          height: '100%',
          backgroundColor: '#007bff',
          borderRadius: '4px',
          width: `${(progress / totalQuestions) * 100}%`,
          transition: 'width 0.3s ease',
        }} />
      </div>

      <div style={{ marginBottom: '1.5rem', fontSize: '1.125rem', color: '#666' }}>
        Score: {correctCount} correct, {incorrectCount} incorrect
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: size * 1.4,
        marginBottom: '1.5rem'
      }}>
        {mode === 'position-to-card' ? (
          <CardBackWithIndexNumber position={currentQuestion.position} size={size} />
        ) : (
          <IndexWithStandardCard
            card={currentQuestion.card}
            position={currentQuestion.position}
            size={size}
            isFlipped={cardFlipped}
          />
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
            {mode === 'position-to-card'
              ? `What card is at position ${currentQuestion.position}?`
              : `What position is ${currentQuestion.card}?`}
          </div>

          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isAnswered}
            placeholder={mode === 'position-to-card' ? 'e.g., 4C, QH, AS' : 'e.g., 1, 2, 52'}
            style={{
              ...inputStyle,
              backgroundColor: isAnswered ? '#f8f9fa' : 'white',
            }}
            autoFocus
          />
        </div>

        {!isAnswered ? (
          <button
            type="submit"
            disabled={!userAnswer.trim()}
            style={{
              ...buttonStyle,
              opacity: userAnswer.trim() ? 1 : 0.5,
              cursor: userAnswer.trim() ? 'pointer' : 'not-allowed',
            }}
            onMouseEnter={(e) => {
              if (userAnswer.trim()) {
                e.currentTarget.style.backgroundColor = '#0056b3';
              }
            }}
            onMouseLeave={(e) => {
              if (userAnswer.trim()) {
                e.currentTarget.style.backgroundColor = '#007bff';
              }
            }}
          >
            Submit Answer
          </button>
        ) : (
          <button
            type="button"
            onClick={goToNextQuestion}
            style={{
              ...buttonStyle,
              backgroundColor: '#28a745',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#218838';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#28a745';
            }}
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question →'}
          </button>
        )}
      </form>

      {showFeedback && isAnswered && (
        <div style={feedbackStyle}>
          {isCorrect ? (
            <div>
              ✓ Correct!
              {mode === 'position-to-card'
                ? ` Position ${currentQuestion.position} is ${currentQuestion.card}.`
                : ` ${currentQuestion.card} is at position ${currentQuestion.position}.`}
            </div>
          ) : (
            <div>
              ✗ Incorrect. The correct answer is{' '}
              {mode === 'position-to-card'
                ? currentQuestion.card
                : currentQuestion.position}.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PositionQuiz;
