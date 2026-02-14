import type { Question, Answer, Feedback } from '../types/interview';

// Simulated AI feedback - In production, this would call an actual AI API
export function generateFeedback(question: Question, answer: Answer): Feedback {
  const textLength = answer.text.length;
  const hasDiagram = !!answer.diagram;
  
  // Calculate base score
  let score = 50;
  
  // Length scoring
  if (textLength > 500) score += 15;
  else if (textLength > 200) score += 10;
  else if (textLength > 100) score += 5;
  
  // Diagram bonus
  if (hasDiagram) score += 20;
  
  // Content analysis (simulated)
  const lowerText = answer.text.toLowerCase();
  
  // Check for key system design concepts
  const concepts = {
    scalability: ['scale', 'horizontal', 'vertical', 'load balancer', 'sharding', 'replication', 'partition', 'cache', 'cdn'],
    database: ['database', 'schema', 'index', 'sql', 'nosql', 'acid', 'transaction', 'replication', 'sharding'],
    api: ['api', 'rest', 'graphql', 'endpoint', 'authentication', 'authorization', 'rate limit', 'gateway'],
    microservices: ['microservice', 'service', 'container', 'orchestration', 'kubernetes', 'docker', 'message queue', 'event'],
    distributed: ['distributed', 'consensus', 'raft', 'paxos', 'CAP', 'byzantine', 'fault tolerance', 'consistency']
  };
  
  let conceptScore = 0;
  const foundConcepts: string[] = [];
  
  Object.entries(concepts).forEach(([, keywords]) => {
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        conceptScore += 2;
        if (!foundConcepts.includes(keyword)) {
          foundConcepts.push(keyword);
        }
      }
    });
  });
  
  score = Math.min(100, score + conceptScore);
  
  // Identify strengths
  const strengths: string[] = [];
  if (textLength > 500) strengths.push('Comprehensive answer with good detail');
  if (hasDiagram) strengths.push('Includes visual diagram which helps explain the architecture');
  if (foundConcepts.length > 5) strengths.push('Demonstrates good understanding of system design concepts');
  if (lowerText.includes('scalability')) strengths.push('Addresses scalability considerations');
  if (lowerText.includes('database')) strengths.push('Considers data storage aspects');
  
  // Identify improvements
  const improvements: string[] = [];
  if (textLength < 200) improvements.push('Answer could be more detailed');
  if (!hasDiagram) improvements.push('Adding a diagram would strengthen your answer');
  if (!lowerText.includes('database') && !lowerText.includes('storage')) improvements.push('Consider including data storage strategy');
  if (!lowerText.includes('api') && !lowerText.includes('endpoint')) improvements.push('Think about API design');
  if (!lowerText.includes('cache')) improvements.push('Consider caching strategies');
  if (!lowerText.includes('monitor') && !lowerText.includes('logging')) improvements.push('Include monitoring and observability');
  
  // Missing components
  const missingComponents: string[] = [];
  question.expectedComponents.forEach(comp => {
    const compLower = comp.toLowerCase();
    if (!lowerText.includes(compLower) && !lowerText.includes(compLower.split(' ')[0])) {
      missingComponents.push(comp);
    }
  });
  
  // Suggestions
  const suggestions: string[] = [];
  if (missingComponents.length > 0) {
    suggestions.push(`Consider adding: ${missingComponents.slice(0, 3).join(', ')}`);
  }
  if (!hasDiagram) {
    suggestions.push('Draw a high-level architecture diagram to illustrate your design');
  }
  if (improvements.length > 0) {
    suggestions.push(improvements[0]);
  }
  
  // Trade-offs
  const tradeoffs = [
    {
      topic: 'Consistency vs Availability',
      analysis: 'For this type of system, consider whether CP (Consistency over Availability) or AP (Availability over Consistency) is more important based on your use case.'
    },
    {
      topic: 'Latency vs Cost',
      analysis: 'Adding more caching layers improves latency but increases cost. Balance based on traffic patterns.'
    }
  ];
  
  // Check if answer mentions trade-offs
  if (lowerText.includes('tradeoff') || lowerText.includes('trade-off') || lowerText.includes('versus') || lowerText.includes('vs')) {
    strengths.push('Good consideration of trade-offs');
  } else {
    suggestions.push('Discuss trade-offs between different approaches (e.g., SQL vs NoSQL, sync vs async)');
  }
  
  return {
    overallScore: score,
    strengths,
    improvements,
    suggestions,
    missingComponents: missingComponents.slice(0, 5),
    tradeoffs
  };
}

// Generate follow-up questions based on the answer
export function generateFollowUp(_question: Question, answer: Answer): string[] {
  const followUps: string[] = [];
  const lowerText = answer.text.toLowerCase();
  
  // Database follow-ups
  if (lowerText.includes('database') || lowerText.includes('sql') || lowerText.includes('nosql')) {
    followUps.push('How would you handle database migrations?');
    followUps.push('What indexing strategy would you use?');
  }
  
  // Scalability follow-ups
  if (lowerText.includes('scale') || lowerText.includes('load balancer')) {
    followUps.push('How would you handle a 10x increase in traffic?');
    followUps.push('What happens when a server goes down?');
  }
  
  // Caching follow-ups
  if (lowerText.includes('cache') || lowerText.includes('redis')) {
    followUps.push('How would you handle cache invalidation?');
    followUps.push('What would be your cache hit ratio target?');
  }
  
  // Microservices follow-ups
  if (lowerText.includes('microservice') || lowerText.includes('service')) {
    followUps.push('How would services communicate with each other?');
    followUps.push('How do you handle distributed transactions?');
  }
  
  // If no specific follow-ups, use generic ones
  if (followUps.length === 0) {
    followUps.push('How would you handle failure in your system?');
    followUps.push('What metrics would you monitor?');
    followUps.push('How would you secure this system?');
  }
  
  return followUps.slice(0, 2);
}

// SM-2 Spaced Repetition Algorithm
export function calculateNextReview(
  quality: number, // 0-5 rating of recall quality
  previousEF: number, // Previous easiness factor
  previousInterval: number // Previous interval in days
): { nextInterval: number; easinessFactor: number } {
  // Quality: 0-5 (0-2 = fail, 3-5 = pass)
  let ef = previousEF;
  let interval = previousInterval;
  
  if (quality >= 3) {
    // Correct response
    if (interval === 0) {
      interval = 1;
    } else if (interval === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ef);
    }
  } else {
    // Incorrect response - reset
    interval = 1;
  }
  
  // Update easiness factor
  ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ef < 1.3) ef = 1.3;
  
  return {
    nextInterval: interval,
    easinessFactor: ef
  };
}
