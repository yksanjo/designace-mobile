import { Trophy, Target, Zap, Calendar, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProgressViewProps {
  completedQuestions: number;
  totalQuestions: number;
  streak: number;
  weakAreas: string[];
  categoryProgress: Record<string, { completed: number; total: number }>;
}

export function ProgressView({ completedQuestions, totalQuestions, streak, weakAreas, categoryProgress }: ProgressViewProps) {
  const overallProgress = Math.round((completedQuestions / totalQuestions) * 100);

  return (
    <div className="h-full overflow-auto p-6">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Your Progress</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-bg-secondary border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-primary/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-accent-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{completedQuestions}</p>
              <p className="text-xs text-text-secondary">Questions Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-success/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-accent-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{overallProgress}%</p>
              <p className="text-xs text-text-secondary">Overall Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-warning/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{streak}</p>
              <p className="text-xs text-text-secondary">Day Streak</p>
            </div>
          </div>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-error/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent-error" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{weakAreas.length}</p>
              <p className="text-xs text-text-secondary">Areas to Improve</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Overall Progress</h3>
        <div className="flex items-center gap-8">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--bg-tertiary)"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="10"
                strokeDasharray={`${overallProgress * 2.51} 251`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-text-primary">{overallProgress}%</span>
            </div>
          </div>
          
          <div className="flex-1">
            <p className="text-text-secondary mb-4">
              You've completed {completedQuestions} out of {totalQuestions} system design questions.
              Keep practicing to improve your skills!
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-text-secondary" />
              <span className="text-text-secondary">Next review: Tomorrow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Progress by Category</h3>
        <div className="space-y-4">
          {Object.entries(categoryProgress).map(([category, progress]) => {
            const percentage = Math.round((progress.completed / progress.total) * 100);
            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary capitalize">{category}</span>
                  <span className="text-sm text-text-secondary">{progress.completed}/{progress.total}</span>
                </div>
                <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      percentage >= 70 ? 'bg-accent-success' :
                      percentage >= 40 ? 'bg-accent-warning' : 'bg-accent-error'
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weak Areas */}
      {weakAreas.length > 0 && (
        <div className="bg-bg-secondary border border-border rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Areas to Focus On</h3>
          <div className="flex flex-wrap gap-2">
            {weakAreas.map(area => (
              <span
                key={area}
                className="px-3 py-1.5 bg-accent-error/10 text-accent-error rounded-full text-sm font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
