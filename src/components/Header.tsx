import { Brain, Play, Settings, Trophy, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  currentView: 'practice' | 'progress' | 'topics';
  onViewChange: (view: 'practice' | 'progress' | 'topics') => void;
  streak: number;
}

export function Header({ currentView, onViewChange, streak }: HeaderProps) {
  return (
    <header className="h-16 bg-bg-secondary border-b border-border flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent-primary/20 rounded-lg flex items-center justify-center">
          <Brain className="w-6 h-6 text-accent-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-text-primary">DesignAce AI</h1>
          <p className="text-xs text-text-secondary">System Design Interview Prep</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-1">
        <button
          onClick={() => onViewChange('practice')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
            currentView === 'practice'
              ? 'bg-accent-primary/20 text-accent-primary'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
          )}
        >
          <Play className="w-4 h-4" />
          <span className="text-sm font-medium">Practice</span>
        </button>

        <button
          onClick={() => onViewChange('topics')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
            currentView === 'topics'
              ? 'bg-accent-primary/20 text-accent-primary'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
          )}
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium">Topics</span>
        </button>

        <button
          onClick={() => onViewChange('progress')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
            currentView === 'progress'
              ? 'bg-accent-primary/20 text-accent-primary'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
          )}
        >
          <Trophy className="w-4 h-4" />
          <span className="text-sm font-medium">Progress</span>
        </button>
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Streak */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-warning/10 rounded-full">
          <span className="text-lg">🔥</span>
          <span className="text-sm font-semibold text-accent-warning">{streak}</span>
        </div>

        <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
