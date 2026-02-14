import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './Review.module.css';

export default function Review() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  const dueQuestions = state.dueQuestions.slice(0, 10);
  const currentQuestion = dueQuestions[currentIndex];

  const startSession = () => {
    setSessionStarted(true);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const rateQuestion = (rating) => {
    // Rating would update the spaced repetition data
    if (currentIndex < dueQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setSessionStarted(false);
    }
  };

  if (!sessionStarted) {
    return (
      <div className={styles.container}>
        <div className={styles.startScreen}>
          <h1>Spaced Repetition Review</h1>
          <p className={styles.subtitle}>
            Review questions due for practice using spaced repetition
          </p>

          <Card className={styles.statsCard}>
            <div className={styles.statItem}>
              <Clock size={24} />
              <div>
                <span className={styles.statValue}>{dueQuestions.length}</span>
                <span className={styles.statLabel}>Questions Due</span>
              </div>
            </div>
            <div className={styles.statItem}>
              <Star size={24} />
              <div>
                <span className={styles.statValue}>{state.streak}</span>
                <span className={styles.statLabel}>Day Streak</span>
              </div>
            </div>
            <div className={styles.statItem}>
              <CheckCircle size={24} />
              <div>
                <span className={styles.statValue}>{state.stats.mastered}</span>
                <span className={styles.statLabel}>Mastered</span>
              </div>
            </div>
          </Card>

          {dueQuestions.length > 0 ? (
            <Button size="large" onClick={startSession}>
              Start Review Session
            </Button>
          ) : (
            <div className={styles.noDue}>
              <AlertCircle size={48} />
              <h3>All caught up!</h3>
              <p>No questions due for review. Come back later!</p>
              <Button variant="secondary" onClick={() => navigate('/practice')}>
                Practice New Questions
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className={styles.container}>
        <div className={styles.completeScreen}>
          <CheckCircle size={64} className={styles.completeIcon} />
          <h2>Review Session Complete!</h2>
          <p>Great job reviewing {dueQuestions.length} questions.</p>
          <div className={styles.completeActions}>
            <Button onClick={() => setSessionStarted(false)}>Review More</Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <span>{currentIndex + 1} / {dueQuestions.length}</span>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${((currentIndex + 1) / dueQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <Card className={styles.questionCard}>
        <div className={styles.questionHeader}>
          <Badge variant={currentQuestion.difficulty.toLowerCase()}>
            {currentQuestion.difficulty}
          </Badge>
          <Badge variant="category">{currentQuestion.category}</Badge>
        </div>

        <h2>{currentQuestion.title}</h2>
        <p className={styles.description}>{currentQuestion.description}</p>

        {!showAnswer ? (
          <Button onClick={() => setShowAnswer(true)}>
            Show Hints & Model Answer
          </Button>
        ) : (
          <div className={styles.answer}>
            <div className={styles.hints}>
              <h4>Hints</h4>
              <ul>
                {currentQuestion.hints.map((hint, i) => (
                  <li key={i}>{hint}</li>
                ))}
              </ul>
            </div>
            <div className={styles.modelAnswer}>
              <h4>Model Answer</h4>
              <p>{currentQuestion.modelAnswer}</p>
            </div>
          </div>
        )}
      </Card>

      {showAnswer && (
        <div className={styles.rating}>
          <p>How well did you remember this?</p>
          <div className={styles.ratingButtons}>
            <Button variant="danger" onClick={() => rateQuestion(1)}>
              1 - Forgot
            </Button>
            <Button variant="ghost" onClick={() => rateQuestion(2)}>
              2 - Hard
            </Button>
            <Button variant="ghost" onClick={() => rateQuestion(3)}>
              3 - Good
            </Button>
            <Button variant="primary" onClick={() => rateQuestion(4)}>
              4 - Easy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
