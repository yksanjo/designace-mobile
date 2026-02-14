import { NavLink, useLocation } from 'react-router-dom';
import { Brain, BookOpen, LayoutGrid, BarChart3, Home, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import styles from './Header.module.css';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/practice', icon: Brain, label: 'Practice' },
  { path: '/questions', icon: BookOpen, label: 'Questions' },
  { path: '/review', icon: LayoutGrid, label: 'Review' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
];

export default function Header() {
  const { state } = useApp();
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Brain size={28} />
        </div>
        <span className={styles.logoText}>DesignAce</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.stats}>
        <div className={styles.streak}>
          <Flame size={18} className={styles.flameIcon} />
          <span>{state.streak} day streak</span>
        </div>
        <div className={styles.progressRing}>
          <svg viewBox="0 0 36 36" className={styles.progressSvg}>
            <path
              className={styles.progressBg}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={styles.progressFill}
              strokeDasharray={`${(state.stats.mastered / state.stats.totalQuestions) * 100}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className={styles.progressText}>
            {Math.round((state.stats.mastered / state.stats.totalQuestions) * 100)}%
          </span>
        </div>
      </div>
    </header>
  );
}
