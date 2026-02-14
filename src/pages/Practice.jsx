import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Lightbulb, X, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Whiteboard from '../components/whiteboard/Whiteboard';
import TradeOffAnalysis from '../components/interview/TradeOffAnalysis';
import styles from './Practice.module.css';

const INTERVIEWER_PERSONA = `You are an expert system design interviewer at a top tech company (FAANG level). 
Your role is to guide the candidate through a system design problem, ask probing questions, and provide constructive feedback.
Be professional, encouraging, and thorough. Ask follow-up questions based on the candidate's responses.
Focus on: scalability, reliability, availability, and trade-offs.`;

const FOLLOW_UP_QUESTIONS = {
  Scalability: [
    "How would you handle 10x traffic growth?",
    "What caching strategies would you implement?",
    "How would you distribute this across data centers?",
  ],
  'Distributed Systems': [
    "How would you ensure consistency?",
    "What happens when a server fails?",
    "How do you handle network partitions?",
  ],
  'Database Design': [
    "What are the read/write patterns?",
    "How would you handle schema migrations?",
    "What's your backup and recovery strategy?",
  ],
  'API Design': [
    "How would you handle versioning?",
    "What's your rate limiting strategy?",
    "How do you handle API deprecation?",
  ],
  Caching: [
    "What's your cache invalidation strategy?",
    "How would you handle cache stampede?",
    "What's your cache hit ratio target?",
  ],
  Microservices: [
    "How do services communicate?",
    "How would you handle distributed transactions?",
    "What's your deployment strategy?",
  ],
};

export default function Practice() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showTradeOff, setShowTradeOff] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.currentSession?.messages]);

  const startSession = (question) => {
    setSelectedQuestion(question);
    dispatch({ type: 'START_SESSION', payload: { question } });
    setSessionEnded(false);
    
    // Initial AI message
    const introMessage = {
      id: Date.now(),
      role: 'ai',
      content: `Great! Let's discuss "${question.title}". 

${question.description}

Take your time to think through this. You can use the whiteboard to draw your architecture, and let me know when you're ready to walk me through your design.

What are your initial thoughts on how you'd approach this?`,
      timestamp: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: introMessage });
  };

  const handleSend = async () => {
    if (!input.trim() || !state.currentSession) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    setInput('');

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const followUps = FOLLOW_UP_QUESTIONS[selectedQuestion.category] || FOLLOW_UP_QUESTIONS['Scalability'];
      const randomFollowUp = followUps[Math.floor(Math.random() * followUps.length)];
      
      const aiResponse = {
        id: Date.now() + 1,
        role: 'ai',
        content: generateAIResponse(userMessage.content, selectedQuestion, randomFollowUp),
        timestamp: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_MESSAGE', payload: aiResponse });
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput, question, followUp) => {
    const responses = [
      `That's an interesting approach. ${followUp}`,
      `Good point. Have you considered the implications on ${question.category.toLowerCase()}?`,
      `I see. Walk me through how that would handle scale.`,
      `That's valid. What are the trade-offs you're considering?`,
      `Interesting design choice. How would you handle failure scenarios?`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const endSession = () => {
    // Calculate score based on messages and diagram
    const messageCount = state.currentSession?.messages?.length || 0;
    const hasDiagram = state.currentSession?.diagram?.length > 20;
    const baseScore = Math.min(100, messageCount * 8);
    const diagramBonus = hasDiagram ? 15 : 0;
    const score = Math.min(100, baseScore + diagramBonus);

    dispatch({ type: 'END_SESSION', payload: { score } });
    setSessionEnded(true);
  };

  const resetSession = () => {
    setSelectedQuestion(null);
    setSessionEnded(false);
    setShowHints(false);
    setShowTradeOff(false);
  };

  if (!state.currentSession) {
    return (
      <div className={styles.container}>
        <div className={styles.questionSelect}>
          <h1>Select a Question</h1>
          <p className={styles.subtitle}>Choose a system design problem to practice</p>
          
          <div className={styles.filters}>
            <select 
              className={styles.select}
              onChange={(e) => {
                const filtered = e.target.value 
                  ? state.questions.filter(q => q.category === e.target.value)
                  : state.questions;
              }}
            >
              <option value="">All Categories</option>
              {[...new Set(state.questions.map(q => q.category))].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className={styles.questionGrid}>
            {state.questions.slice(0, 20).map((q) => (
              <Card 
                key={q.id} 
                hover 
                className={styles.questionCard}
                onClick={() => startSession(q)}
              >
                <div className={styles.questionHeader}>
                  <h3>{q.title}</h3>
                  <Badge variant={q.difficulty.toLowerCase()} size="small">
                    {q.difficulty}
                  </Badge>
                </div>
                <p className={styles.questionDesc}>{q.description}</p>
                <Badge variant="category" size="small">{q.category}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (sessionEnded) {
    const lastSession = state.sessions[0];
    return (
      <div className={styles.container}>
        <Card className={styles.sessionSummary}>
          <h2>Session Complete!</h2>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreValue}>{lastSession?.score || 0}</span>
            <span className={styles.scoreLabel}>Score</span>
          </div>
          <p className={styles.summaryText}>
            You covered the "{selectedQuestion.title}" problem. 
            Keep practicing to improve your system design skills!
          </p>
          <div className={styles.summaryActions}>
            <Button onClick={resetSession}>Practice Another</Button>
            <Button variant="secondary" onClick={() => navigate('/analytics')}>
              View Analytics
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.session}>
      <div className={styles.sidebar}>
        <div className={styles.questionInfo}>
          <h3>{selectedQuestion.title}</h3>
          <div className={styles.questionMeta}>
            <Badge variant={selectedQuestion.difficulty.toLowerCase()}>
              {selectedQuestion.difficulty}
            </Badge>
            <Badge variant="category">{selectedQuestion.category}</Badge>
          </div>
          <p className={styles.questionDesc}>{selectedQuestion.description}</p>
        </div>
        
        <div className={styles.tools}>
          <Button 
            variant={showHints ? 'primary' : 'ghost'} 
            size="small"
            onClick={() => setShowHints(!showHints)}
          >
            <Lightbulb size={16} />
            Hints
          </Button>
          <Button 
            variant={showTradeOff ? 'primary' : 'ghost'}
            size="small"
            onClick={() => setShowTradeOff(!showTradeOff)}
          >
            <MessageSquare size={16} />
            Trade-offs
          </Button>
        </div>

        {showHints && (
          <div className={styles.hintsPanel}>
            <h4>Hints</h4>
            <ul>
              {selectedQuestion.hints.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ul>
          </div>
        )}

        {showTradeOff && (
          <TradeOffAnalysis category={selectedQuestion.category} />
        )}
      </div>

      <div className={styles.main}>
        <div className={styles.chatContainer}>
          <div className={styles.messages}>
            {state.currentSession.messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`${styles.message} ${styles[msg.role]}`}
              >
                <div className={styles.messageBubble}>
                  {msg.content}
                </div>
                <span className={styles.timestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className={`${styles.message} ${styles.ai}`}>
                <div className={`${styles.messageBubble} ${styles.typing}`}>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <textarea
              className={styles.input}
              placeholder="Describe your design approach..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div className={styles.inputActions}>
              <Button onClick={handleSend} disabled={!input.trim()}>
                <Send size={18} />
                Send
              </Button>
              <Button variant="danger" onClick={endSession}>
                <CheckCircle size={18} />
                End Session
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.whiteboardContainer}>
          <Whiteboard />
        </div>
      </div>
    </div>
  );
}
