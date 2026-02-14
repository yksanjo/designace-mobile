export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 'scalability' | 'database' | 'api' | 'caching' | 'microservices' | 'distributed-systems';

export interface Question {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  hints: string[];
  evaluationCriteria: string[];
  expectedComponents: string[];
  sampleAnswer: string;
  companies: string[];
}

export interface Answer {
  questionId: string;
  text: string;
  diagram?: string;
  timestamp: Date;
}

export interface Feedback {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  missingComponents: string[];
  tradeoffs: { topic: string; analysis: string }[];
}

export interface Session {
  id: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  feedbacks: Feedback[];
  startedAt: Date;
  completedAt?: Date;
}

export interface UserProgress {
  completedQuestions: string[];
  weakAreas: Category[];
  streak: number;
  lastReview: Record<string, Date>;
  nextReview: Record<string, Date>;
  easinessFactor: Record<string, number>;
}

export interface DiagramTemplate {
  id: string;
  name: string;
  category: string;
  mermaidCode: string;
}
