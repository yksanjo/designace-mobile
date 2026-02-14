import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AIInterviewPanel } from './components/AIInterviewPanel';
import { Whiteboard } from './components/Whiteboard';
import { ProgressView } from './components/ProgressView';
import { questions } from './data/questions';
import { generateFeedback } from './lib/feedback';
import type { Question, Feedback, Category } from './types/interview';

function App() {
  const [currentView, setCurrentView] = useState<'practice' | 'progress' | 'topics'>('practice');
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
  const [feedback, setFeedback] = useState<Feedback | undefined>();
  const [isTyping, setIsTyping] = useState(false);
  const [diagram, setDiagram] = useState<string>('');
  const [streak, setStreak] = useState(5);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);
  const [weakAreas, setWeakAreas] = useState<Category[]>([]);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('designace-progress');
    if (saved) {
      const progress = JSON.parse(saved);
      setStreak(progress.streak || 5);
      setCompletedQuestions(progress.completedQuestions || []);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    const progress = { streak, completedQuestions };
    localStorage.setItem('designace-progress', JSON.stringify(progress));
  }, [streak, completedQuestions]);

  const handleSubmitAnswer = (text: string, diagramCode?: string) => {
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const answer = {
        questionId: currentQuestion.id,
        text,
        diagram: diagramCode,
        timestamp: new Date()
      };
      
      const newFeedback = generateFeedback(currentQuestion, answer);
      setFeedback(newFeedback);
      setIsTyping(false);
      
      // Update progress
      if (!completedQuestions.includes(currentQuestion.id)) {
        setCompletedQuestions(prev => [...prev, currentQuestion.id]);
        setStreak(s => s + 1);
        
        // Update weak areas based on feedback
        if (newFeedback.overallScore < 60) {
          setWeakAreas(prev => {
            const newAreas = [...prev];
            if (!newAreas.includes(currentQuestion.category)) {
              newAreas.push(currentQuestion.category);
            }
            return newAreas;
          });
        }
      }
    }, 1500);
  };

  const handleNextQuestion = () => {
    const currentIndex = questions.findIndex(q => q.id === currentQuestion.id);
    const nextIndex = (currentIndex + 1) % questions.length;
    setCurrentQuestion(questions[nextIndex]);
    setFeedback(undefined);
    setDiagram('');
  };

  const categoryProgress: Record<string, { completed: number; total: number }> = {
    scalability: { 
      completed: completedQuestions.filter(id => questions.find(q => q.id === id)?.category === 'scalability').length, 
      total: questions.filter(q => q.category === 'scalability').length 
    },
    database: { 
      completed: completedQuestions.filter(id => questions.find(q => q.id === id)?.category === 'database').length, 
      total: questions.filter(q => q.category === 'database').length 
    },
    api: { 
      completed: completedQuestions.filter(id => questions.find(q => q.id === id)?.category === 'api').length, 
      total: questions.filter(q => q.category === 'api').length 
    },
    caching: { 
      completed: completedQuestions.filter(id => questions.find(q => q.id === id)?.category === 'caching').length, 
      total: questions.filter(q => q.category === 'caching').length 
    },
    microservices: { 
      completed: completedQuestions.filter(id => questions.find(q => q.id === id)?.category === 'microservices').length, 
      total: questions.filter(q => q.category === 'microservices').length 
    },
    'distributed-systems': { 
      completed: completedQuestions.filter(id => questions.find(q => q.id === id)?.category === 'distributed-systems').length, 
      total: questions.filter(q => q.category === 'distributed-systems').length 
    },
  };

  return (
    <div className="h-screen flex flex-col bg-bg-primary">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
        streak={streak}
      />
      
      {currentView === 'practice' ? (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - AI Interview */}
          <div className="w-2/5 border-r border-border flex flex-col">
            <AIInterviewPanel
              question={currentQuestion}
              onSubmitAnswer={handleSubmitAnswer}
              feedback={feedback}
              isTyping={isTyping}
            />
            
            {feedback && (
              <div className="p-4 border-t border-border">
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-accent-primary text-white py-2.5 rounded-lg font-medium hover:bg-accent-primary/90 transition-colors"
                >
                  Next Question →
                </button>
              </div>
            )}
          </div>
          
          {/* Right Panel - Whiteboard */}
          <div className="w-3/5">
            <Whiteboard
              diagram={diagram}
              onDiagramChange={setDiagram}
            />
          </div>
        </div>
      ) : (
        <ProgressView
          completedQuestions={completedQuestions.length}
          totalQuestions={questions.length}
          streak={streak}
          weakAreas={weakAreas}
          categoryProgress={categoryProgress}
        />
      )}
    </div>
  );
}

export default App;
