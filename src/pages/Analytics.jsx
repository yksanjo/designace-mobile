import { TrendingUp, Target, Clock, Award, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import styles from './Analytics.module.css';

export default function Analytics() {
  const { state } = useApp();

  // Calculate category progress
  const categoryProgress = state.questions.reduce((acc, q) => {
    if (!acc[q.category]) {
      acc[q.category] = { total: 0, practiced: 0 };
    }
    acc[q.category].total++;
    if (state.userProgress[q.id]) {
      acc[q.category].practiced++;
    }
    return acc;
  }, {});

  // Get recent sessions
  const recentSessions = state.sessions.slice(0, 10);

  // Calculate difficulty breakdown
  const difficultyStats = state.questions.reduce((acc, q) => {
    const diff = q.difficulty;
    if (!acc[diff]) {
      acc[diff] = { total: 0, practiced: 0, avgScore: 0, scores: [] };
    }
    acc[diff].total++;
    const progress = state.userProgress[q.id];
    if (progress) {
      acc[diff].practiced++;
      acc[diff].scores.push(progress.bestScore);
    }
    return acc;
  }, {});

  Object.keys(difficultyStats).forEach(diff => {
    const scores = difficultyStats[diff].scores;
    difficultyStats[diff].avgScore = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Analytics</h1>
        <p className={styles.subtitle}>Track your system design interview preparation</p>
      </div>

      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <Target size={24} />
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
            <Award size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{state.stats.mastered}</span>
            <span className={styles.statLabel}>Mastered</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <Calendar size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{state.streak}</span>
            <span className={styles.statLabel}>Day Streak</span>
          </div>
        </Card>
      </div>

      <div className={styles.sections}>
        <Card className={styles.section}>
          <h2>Progress by Category</h2>
          <div className={styles.categoryList}>
            {Object.entries(categoryProgress).map(([category, data]) => {
              const percentage = data.total > 0 
                ? Math.round((data.practiced / data.total) * 100) 
                : 0;
              return (
                <div key={category} className={styles.categoryItem}>
                  <div className={styles.categoryHeader}>
                    <span className={styles.categoryName}>{category}</span>
                    <span className={styles.categoryCount}>
                      {data.practiced}/{data.total}
                    </span>
                  </div>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className={styles.section}>
          <h2>Progress by Difficulty</h2>
          <div className={styles.difficultyList}>
            {Object.entries(difficultyStats).map(([difficulty, data]) => (
              <div key={difficulty} className={styles.difficultyItem}>
                <div className={styles.difficultyHeader}>
                  <span className={styles.difficultyName}>{difficulty}</span>
                  <span className={styles.difficultyStats}>
                    {data.practiced}/{data.total} practiced • Avg: {data.avgScore}%
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={`${styles.progressFill} ${styles[difficulty.toLowerCase()]}`}
                    style={{ width: `${data.total > 0 ? (data.practiced / data.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className={styles.section}>
        <h2>Recent Sessions</h2>
        {recentSessions.length > 0 ? (
          <div className={styles.sessionList}>
            {recentSessions.map((session, index) => {
              const question = state.questions.find(q => q.id === session.questionId);
              return (
                <div key={session.id} className={styles.sessionItem}>
                  <div className={styles.sessionInfo}>
                    <span className={styles.sessionTitle}>
                      {question?.title || 'Unknown'}
                    </span>
                    <span className={styles.sessionDate}>
                      {new Date(session.startTime).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.sessionScore}>
                    <span className={styles.scoreValue}>{session.score}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className={styles.emptyText}>No sessions yet. Start practicing!</p>
        )}
      </Card>
    </div>
  );
}
