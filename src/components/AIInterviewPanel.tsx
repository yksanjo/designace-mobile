import { useState } from 'react';
import { Bot, Send, Lightbulb, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Question, Feedback } from '../types/interview';

interface AIInterviewPanelProps {
  question: Question;
  onSubmitAnswer: (text: string, diagram?: string) => void;
  feedback?: Feedback;
  isTyping?: boolean;
}

export function AIInterviewPanel({ question, onSubmitAnswer, feedback, isTyping }: AIInterviewPanelProps) {
  const [answer, setAnswer] = useState('');
  const [showHints, setShowHints] = useState(false);

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer);
      setAnswer('');
    }
  };

  const difficultyColors = {
    easy: 'bg-accent-success/20 text-accent-success',
    medium: 'bg-accent-warning/20 text-accent-warning',
    hard: 'bg-accent-error/20 text-accent-error'
  };

  return (
    <div className="h-full flex flex-col bg-bg-secondary">
      {/* AI Avatar & Question */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start gap-3">
          {/* AI Avatar */}
          <div className="w-10 h-10 bg-accent-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-6 h-6 text-accent-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-text-primary">AI Interviewer</span>
              {isTyping && (
                <span className="text-xs text-text-secondary animate-pulse">typing...</span>
              )}
            </div>
            
            {/* Question Card */}
            <div className="bg-bg-tertiary rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', difficultyColors[question.difficulty])}>
                  {question.difficulty}
                </span>
                <span className="text-xs text-text-secondary">{question.category}</span>
              </div>
              
              <h3 className="text-base font-semibold text-text-primary mb-2">{question.title}</h3>
              <p className="text-sm text-text-secondary">{question.description}</p>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {question.companies.map(company => (
                  <span key={company} className="text-xs px-2 py-0.5 bg-bg-secondary rounded text-text-secondary">
                    {company}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Hints Button */}
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-1 mt-3 text-xs text-accent-warning hover:text-accent-warning/80 transition-colors"
            >
              <Lightbulb className="w-3 h-3" />
              Need a hint?
            </button>
            
            {/* Hints */}
            {showHints && (
              <div className="mt-2 space-y-1">
                {question.hints.map((hint, i) => (
                  <p key={i} className="text-xs text-text-secondary bg-accent-warning/10 px-3 py-2 rounded">
                    💡 {hint}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Answer Input */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="mb-4">
          <label className="text-sm font-medium text-text-primary mb-2 block">Your Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Describe your system design approach, including architecture, data flow, and key components..."
            className="w-full h-40 bg-bg-tertiary border border-border rounded-lg p-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-primary resize-none font-mono"
          />
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className="w-full flex items-center justify-center gap-2 bg-accent-primary text-white py-2.5 rounded-lg font-medium hover:bg-accent-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          Submit Answer for Review
        </button>
      </div>

      {/* Feedback Section */}
      {feedback && (
        <div className="border-t border-border p-4 bg-bg-tertiary/50">
          <h4 className="text-sm font-semibold text-text-primary mb-3">AI Feedback</h4>
          
          {/* Score */}
          <div className="flex items-center gap-3 mb-4">
            <div className={cn(
              'text-2xl font-bold',
              feedback.overallScore >= 70 ? 'text-accent-success' :
              feedback.overallScore >= 50 ? 'text-accent-warning' : 'text-accent-error'
            )}>
              {feedback.overallScore}%
            </div>
            <div className="text-xs text-text-secondary">
              {feedback.overallScore >= 70 ? 'Great job!' : feedback.overallScore >= 50 ? 'Good progress!' : 'Keep practicing!'}
            </div>
          </div>
          
          {/* Strengths */}
          {feedback.strengths.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1 mb-1">
                <CheckCircle className="w-3 h-3 text-accent-success" />
                <span className="text-xs font-medium text-accent-success">Strengths</span>
              </div>
              <ul className="space-y-1">
                {feedback.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-text-secondary pl-4">{s}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Improvements */}
          {feedback.improvements.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1 mb-1">
                <XCircle className="w-3 h-3 text-accent-error" />
                <span className="text-xs font-medium text-accent-error">Areas to Improve</span>
              </div>
              <ul className="space-y-1">
                {feedback.improvements.map((s, i) => (
                  <li key={i} className="text-xs text-text-secondary pl-4">{s}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Suggestions */}
          {feedback.suggestions.length > 0 && (
            <div>
              <div className="flex items-center gap-1 mb-1">
                <AlertTriangle className="w-3 h-3 text-accent-warning" />
                <span className="text-xs font-medium text-accent-warning">Suggestions</span>
              </div>
              <ul className="space-y-1">
                {feedback.suggestions.map((s, i) => (
                  <li key={i} className="text-xs text-text-secondary pl-4">{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
