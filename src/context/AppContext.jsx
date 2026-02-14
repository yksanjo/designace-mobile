import { createContext, useContext, useReducer, useEffect } from 'react';
import questionsData from '../data/questions.json';

const AppContext = createContext();

const STORAGE_KEY = 'designace_progress';

const initialState = {
  questions: questionsData.questions,
  userProgress: {},
  sessions: [],
  currentSession: null,
  currentQuestion: null,
  dueQuestions: [],
  streak: 0,
  stats: {
    totalPracticed: 0,
    totalQuestions: questionsData.questions.length,
    averageScore: 0,
    mastered: 0,
  }
};

// SM-2 Algorithm implementation
function calculateNextReview(quality, previousInterval, repetitions, easeFactor) {
  let interval;
  let newEaseFactor = easeFactor;
  let newRepetitions = repetitions;

  if (quality >= 3) {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(previousInterval * easeFactor);
    }
    newRepetitions = repetitions + 1;
  } else {
    newRepetitions = 0;
    interval = 1;
  }

  newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEaseFactor < 1.3) newEaseFactor = 1.3;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    interval,
    easeFactor: newEaseFactor,
    repetitions: newRepetitions,
    nextReview: nextDate.toISOString(),
  };
}

function appReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, ...action.payload };

    case 'START_SESSION': {
      const { question } = action.payload;
      const session = {
        id: Date.now(),
        questionId: question.id,
        startTime: new Date().toISOString(),
        messages: [],
        diagram: '',
        score: 0,
      };
      return {
        ...state,
        currentSession: session,
        currentQuestion: question,
      };
    }

    case 'ADD_MESSAGE': {
      if (!state.currentSession) return state;
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          messages: [...state.currentSession.messages, action.payload],
        },
      };
    }

    case 'UPDATE_DIAGRAM': {
      if (!state.currentSession) return state;
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          diagram: action.payload,
        },
      };
    }

    case 'END_SESSION': {
      if (!state.currentSession || !state.currentQuestion) return state;
      
      const { score } = action.payload;
      const questionProgress = state.userProgress[state.currentQuestion.id] || {
        repetitions: 0,
        easeFactor: 2.5,
        interval: 0,
        nextReview: new Date().toISOString(),
        timesPracticed: 0,
        bestScore: 0,
      };

      const sm2Result = calculateNextReview(
        Math.floor(score / 20),
        questionProgress.interval,
        questionProgress.repetitions,
        questionProgress.easeFactor
      );

      const updatedProgress = {
        ...questionProgress,
        ...sm2Result,
        timesPracticed: questionProgress.timesPracticed + 1,
        bestScore: Math.max(questionProgress.bestScore, score),
        lastPracticed: new Date().toISOString(),
      };

      const newUserProgress = {
        ...state.userProgress,
        [state.currentQuestion.id]: updatedProgress,
      };

      const completedSession = {
        ...state.currentSession,
        endTime: new Date().toISOString(),
        score,
      };

      const newDueQuestions = calculateDueQuestions(newUserProgress, state.questions);
      
      // Calculate new stats
      const totalPracticed = Object.keys(newUserProgress).length;
      const allScores = Object.values(newUserProgress).map(p => p.bestScore);
      const averageScore = allScores.length > 0 
        ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
        : 0;
      const mastered = Object.values(newUserProgress).filter(p => p.repetitions >= 5).length;

      // Update streak
      const today = new Date().toDateString();
      const lastPractice = state.sessions[0]?.endTime 
        ? new Date(state.sessions[0].endTime).toDateString() 
        : null;
      let newStreak = state.streak;
      if (!lastPractice) {
        newStreak = 1;
      } else if (lastPractice === today) {
        // Same day, no change
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastPractice === yesterday.toDateString()) {
          newStreak = state.streak + 1;
        } else {
          newStreak = 1;
        }
      }

      return {
        ...state,
        userProgress: newUserProgress,
        sessions: [completedSession, ...state.sessions].slice(0, 50),
        currentSession: null,
        currentQuestion: null,
        dueQuestions: newDueQuestions,
        streak: newStreak,
        stats: {
          ...state.stats,
          totalPracticed,
          averageScore,
          mastered,
        },
      };
    }

    case 'SET_DUE_QUESTIONS': {
      return {
        ...state,
        dueQuestions: action.payload,
      };
    }

    default:
      return state;
  }
}

function calculateDueQuestions(progress, questions) {
  const now = new Date();
  return questions.filter(q => {
    const p = progress[q.id];
    if (!p) return true; // New questions
    return new Date(p.nextReview) <= now;
  });
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const dueQuestions = calculateDueQuestions(parsed.userProgress || {}, questionsData.questions);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            ...parsed,
            questions: questionsData.questions,
            dueQuestions,
          },
        });
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    const toSave = {
      userProgress: state.userProgress,
      sessions: state.sessions,
      streak: state.streak,
      stats: state.stats,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [state.userProgress, state.sessions, state.streak, state.stats]);

  // Calculate due questions on init
  useEffect(() => {
    if (Object.keys(state.userProgress).length > 0) {
      const due = calculateDueQuestions(state.userProgress, state.questions);
      dispatch({ type: 'SET_DUE_QUESTIONS', payload: due });
    }
  }, [state.questions, state.userProgress]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
