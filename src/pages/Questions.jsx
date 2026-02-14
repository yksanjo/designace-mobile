import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import styles from './Questions.module.css';

export default function Questions() {
  const { state } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [difficulty, setDifficulty] = useState('');

  const categories = [...new Set(state.questions.map(q => q.category))];

  const filteredQuestions = state.questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || q.category === category;
    const matchesDifficulty = !difficulty || q.difficulty === difficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Question Bank</h1>
        <p className={styles.subtitle}>
          Browse {state.questions.length} system design questions
        </p>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <Filter size={18} />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.select}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={styles.select}
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className={styles.stats}>
        <span>{filteredQuestions.length} questions found</span>
      </div>

      <div className={styles.grid}>
        {filteredQuestions.map((q) => {
          const progress = state.userProgress[q.id];
          return (
            <Card key={q.id} hover className={styles.questionCard}>
              <div className={styles.cardHeader}>
                <h3>{q.title}</h3>
                <div className={styles.badges}>
                  <Badge variant={q.difficulty.toLowerCase()} size="small">
                    {q.difficulty}
                  </Badge>
                  <Badge variant="category" size="small">
                    {q.category}
                  </Badge>
                </div>
              </div>
              <p className={styles.description}>{q.description}</p>
              {progress && (
                <div className={styles.progress}>
                  <span>Practiced {progress.timesPracticed} times</span>
                  <span>Best: {progress.bestScore}%</span>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <div className={styles.empty}>
          <p>No questions match your filters.</p>
          <button 
            className={styles.clearBtn}
            onClick={() => {
              setSearch('');
              setCategory('');
              setDifficulty('');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
