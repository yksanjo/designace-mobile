import { useNavigate } from 'react-router-dom';
import { Brain, BookOpen, TrendingUp, Clock, Target, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './Home.module.css';

export default function Home() {
  const { state } = useApp();
  const navigate = useNavigate();

  const categoryStats = state.questions.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1;
    return acc;
  }, {});

  const difficultyCounts = state.questions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Master <span className="text-gradient">System Design</span>
          </h1>
          <p className={styles.subtitle}>
            Practice with AI-powered interviews, whiteboard diagrams, and spaced repetition.
            Ace your next system design interview.
          </p>
          <div className={styles.heroActions}>
            <Button size="large" onClick={() => navigate('/practice')}>
              <Zap size={20} />
              Start Practice
            </Button>
            <Button variant="secondary" size="large" onClick={() => navigate('/questions')}>
              <BookOpen size={20} />
              Browse Questions
            </Button>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.floatingCard} style={{ '--delay': '0s' }}>
            <Brain size={48} />
          </div>
          <div className={styles.floatingCard} style={{ '--delay': '0.5s' }}>
            <Target size={32} />
          </div>
          <div className={styles.floatingCard} style={{ '--delay': '1s' }}>
            <TrendingUp size={40} />
          </div>
        </div>
      </section>

      <section className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <Brain size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{state.stats.totalPracticed}</span>
            <span className={styles.statLabel}>Questions Practiced</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{state.stats.averageScore}%</span>
            <span className={styles.statLabel}>Average Score</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <Target size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{state.stats.mastered}</span>
            <span className={styles.statLabel}>Mastered</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <Clock size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{state.dueQuestions.length}</span>
            <span className={styles.statLabel}>Due for Review</span>
          </div>
        </Card>
      </section>

      <section className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Categories</h2>
          <div className={styles.categoryGrid}>
            {Object.entries(categoryStats).map(([category, count]) => (
              <Card key={category} hover className={styles.categoryCard} onClick={() => navigate(`/questions?category=${category}`)}>
                <h3>{category}</h3>
                <p>{count} questions</p>
              </Card>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Difficulty</h2>
          <div className={styles.difficultyGrid}>
            <Card className={styles.difficultyCard}>
              <Badge variant="easy" size="large">Easy</Badge>
              <span className={styles.difficultyCount}>{difficultyCounts['Easy'] || 0}</span>
              <p>Foundational concepts</p>
            </Card>
            <Card className={styles.difficultyCard}>
              <Badge variant="medium" size="large">Medium</Badge>
              <span className={styles.difficultyCount}>{difficultyCounts['Medium'] || 0}</span>
              <p>Common interview questions</p>
            </Card>
            <Card className={styles.difficultyCard}>
              <Badge variant="hard" size="large">Hard</Badge>
              <span className={styles.difficultyCount}>{difficultyCounts['Hard'] || 0}</span>
              <p>Advanced scenarios</p>
            </Card>
          </div>
        </div>

        {state.dueQuestions.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Ready for Review</h2>
            <Card className={styles.reviewCard}>
              <div className={styles.reviewContent}>
                <h3>You have {state.dueQuestions.length} questions due for review</h3>
                <p>Keep your skills sharp with spaced repetition</p>
              </div>
              <Button onClick={() => navigate('/review')}>
                <Clock size={18} />
                Start Review
              </Button>
            </Card>
          </div>
        )}
      </section>
    </div>
  );
}
