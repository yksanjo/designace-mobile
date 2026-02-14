import type { Question, DiagramTemplate } from '../types/interview';

export const questions: Question[] = [
  {
    id: '1',
    title: 'Design Twitter',
    description: 'Design a system like Twitter where users can post short messages, follow other users, and see a timeline of posts from people they follow.',
    category: 'scalability',
    difficulty: 'hard',
    hints: [
      'Consider the read vs write ratio',
      'Think about how to handle viral content',
      'How would you implement the timeline efficiently?'
    ],
    evaluationCriteria: [
      'High-level architecture',
      'Data storage strategy',
      'Scalability considerations',
      'API design'
    ],
    expectedComponents: ['Load Balancer', 'API Gateway', 'User Service', 'Tweet Service', 'Timeline Service', 'Database', 'Cache', 'Message Queue'],
    sampleAnswer: 'Use a microservices architecture with separate services for users, tweets, and timeline...',
    companies: ['Twitter', 'Facebook', 'Instagram']
  },
  {
    id: '2',
    title: 'Design a URL Shortener',
    description: 'Design a service like bit.ly that takes long URLs and converts them to short, shareable links.',
    category: 'scalability',
    difficulty: 'medium',
    hints: [
      'How would you generate unique short codes?',
      'Consider the redirect mechanism',
      'Think about analytics tracking'
    ],
    evaluationCriteria: [
      'URL encoding strategy',
      'Database schema',
      'Redirect flow',
      'Analytics'
    ],
    expectedComponents: ['API Service', 'URL Database', 'Hash Generator', 'Redirect Handler', 'Analytics Service'],
    sampleAnswer: 'Use base62 encoding for generating short codes...',
    companies: ['bit.ly', 'TinyURL', 'Google']
  },
  {
    id: '3',
    title: 'Design a Chat System',
    description: 'Design a real-time messaging system like WhatsApp or Slack.',
    category: 'scalability',
    difficulty: 'hard',
    hints: [
      'Real-time communication patterns',
      'Message ordering and delivery',
      'Offline message handling'
    ],
    evaluationCriteria: [
      'Real-time architecture',
      'Message delivery guarantees',
      'Group chat handling',
      'Notification system'
    ],
    expectedComponents: ['WebSocket Server', 'Message Broker', 'Chat Database', 'Presence Service', 'Notification Service'],
    sampleAnswer: 'Use WebSockets for real-time communication with message queues for reliability...',
    companies: ['WhatsApp', 'Slack', 'Discord']
  },
  {
    id: '4',
    title: 'Design YouTube',
    description: 'Design a video streaming platform like YouTube.',
    category: 'scalability',
    difficulty: 'hard',
    hints: [
      'Video storage and encoding',
      'Content delivery strategy',
      'Recommendation system integration'
    ],
    evaluationCriteria: [
      'Video processing pipeline',
      'CDN architecture',
      'Streaming protocol',
      'Recommendation engine'
    ],
    expectedComponents: ['Upload Service', 'Video Encoder', 'Storage', 'CDN', 'Streaming Server', 'Recommendation Engine'],
    sampleAnswer: 'Use HLS/DASH for adaptive streaming with CDN for global distribution...',
    companies: ['YouTube', 'Netflix', 'Twitch']
  },
  {
    id: '5',
    title: 'Design an API Gateway',
    description: 'Design an API Gateway that handles authentication, rate limiting, and request routing.',
    category: 'api',
    difficulty: 'medium',
    hints: [
      'Authentication flows',
      'Rate limiting strategies',
      'Service discovery'
    ],
    evaluationCriteria: [
      'Authentication methods',
      'Rate limiting algorithm',
      'Request routing',
      'Monitoring'
    ],
    expectedComponents: ['Gateway Service', 'Auth Service', 'Rate Limiter', 'Service Registry', 'Monitoring'],
    sampleAnswer: 'Implement token bucket algorithm for rate limiting...',
    companies: ['Kong', 'AWS API Gateway', 'Netflix Zuul']
  },
  {
    id: '6',
    title: 'Design a Distributed Cache',
    description: 'Design a distributed caching system like Redis or Memcached.',
    category: 'caching',
    difficulty: 'hard',
    hints: [
      'Cache invalidation strategies',
      'Consistency models',
      'Sharding strategies'
    ],
    evaluationCriteria: [
      'Consistency strategy',
      'Eviction policies',
      'Replication',
      'Sharding'
    ],
    expectedComponents: ['Cache Node', 'Coordinator', 'Replication Manager', 'Eviction Policy'],
    sampleAnswer: 'Use consistent hashing for sharding with write-through caching...',
    companies: ['Redis', 'Memcached', 'DynamoDB']
  },
  {
    id: '7',
    title: 'Design a Database for E-commerce',
    description: 'Design the database schema for an e-commerce platform.',
    category: 'database',
    difficulty: 'medium',
    hints: [
      'ACID properties',
      'Query patterns',
      'Data relationships'
    ],
    evaluationCriteria: [
      'Schema design',
      'Indexing strategy',
      'Transaction handling',
      'Normalization'
    ],
    expectedComponents: ['Users Table', 'Products Table', 'Orders Table', 'Inventory Table', 'Payments Table'],
    sampleAnswer: 'Use a combination of relational for transactions and NoSQL for product catalog...',
    companies: ['Amazon', 'Shopify', 'eBay']
  },
  {
    id: '8',
    title: 'Design a Rate Limiter',
    description: 'Design a rate limiter that prevents API abuse.',
    category: 'api',
    difficulty: 'medium',
    hints: [
      'Algorithm choice',
      'Distributed counting',
      'Client identification'
    ],
    evaluationCriteria: [
      'Algorithm design',
      'Storage backend',
      'Scalability',
      'Accuracy'
    ],
    expectedComponents: ['Rate Limiter Service', 'Redis Counter', 'Policy Manager'],
    sampleAnswer: 'Use sliding window algorithm with Redis for distributed counting...',
    companies: ['Stripe', 'GitHub', 'Twitter']
  },
  {
    id: '9',
    title: 'Design a Distributed ID Generator',
    description: 'Design a system that generates unique IDs across multiple machines.',
    category: 'distributed-systems',
    difficulty: 'medium',
    hints: [
      'ID structure',
      'Clock synchronization',
      'Collision prevention'
    ],
    evaluationCriteria: [
      'ID uniqueness',
      'Performance',
      'Scalability',
      'Sortability'
    ],
    expectedComponents: ['ID Generator', 'Timestamp Service', 'Worker ID Allocator'],
    sampleAnswer: 'Use Snowflake-style ID with timestamp, worker ID, and sequence number...',
    companies: ['Twitter', 'Discord', 'Uber']
  },
  {
    id: '10',
    title: 'Design a News Feed System',
    description: 'Design a news feed system like Facebook or LinkedIn.',
    category: 'scalability',
    difficulty: 'hard',
    hints: [
      'Fan-out strategies',
      'Ranking algorithms',
      'Content personalization'
    ],
    evaluationCriteria: [
      'Feed generation',
      'Ranking strategy',
      'Caching',
      'Real-time updates'
    ],
    expectedComponents: ['Feed Service', 'Content Service', 'Ranking Engine', 'Cache', 'Message Queue'],
    sampleAnswer: 'Use pull-based fan-out for friends and push-based for celebrities...',
    companies: ['Facebook', 'LinkedIn', 'Instagram']
  },
  {
    id: '11',
    title: 'Design a Payment System',
    description: 'Design a secure payment processing system.',
    category: 'microservices',
    difficulty: 'hard',
    hints: [
      'Security considerations',
      'Transaction atomicity',
      'Fraud detection'
    ],
    evaluationCriteria: [
      'Security architecture',
      'Transaction handling',
      'Compliance',
      'Idempotency'
    ],
    expectedComponents: ['Payment Gateway', 'Processor', 'Fraud Detection', 'Ledger', 'Notification Service'],
    sampleAnswer: 'Use event sourcing with saga pattern for distributed transactions...',
    companies: ['Stripe', 'PayPal', 'Square']
  },
  {
    id: '12',
    title: 'Design a Search Engine',
    description: 'Design a search engine like Google or Elasticsearch.',
    category: 'scalability',
    difficulty: 'hard',
    hints: [
      'Indexing strategy',
      'Ranking algorithm',
      'Query processing'
    ],
    evaluationCriteria: [
      'Index architecture',
      'Ranking strategy',
      'Crawling strategy',
      'Query optimization'
    ],
    expectedComponents: ['Crawler', 'Indexer', 'Search Engine', 'Ranking Engine', 'Storage'],
    sampleAnswer: 'Use inverted index for efficient text search with PageRank for ranking...',
    companies: ['Google', 'Elasticsearch', 'Algolia']
  },
  {
    id: '13',
    title: 'Design a File Storage System',
    description: 'Design a file storage service like Dropbox or Google Drive.',
    category: 'scalability',
    difficulty: 'hard',
    hints: [
      'File synchronization',
      'Conflict resolution',
      'Storage optimization'
    ],
    evaluationCriteria: [
      'Upload/download flow',
      'Sync mechanism',
      'Storage efficiency',
      'Security'
    ],
    expectedComponents: ['Storage Service', 'Sync Engine', 'Conflict Resolver', 'CDN', 'Encryption Layer'],
    sampleAnswer: 'Use block-level sync with delta compression...',
    companies: ['Dropbox', 'Google Drive', 'iCloud']
  },
  {
    id: '14',
    title: 'Design a Job Scheduler',
    description: 'Design a distributed job scheduler like Airflow or Celery.',
    category: 'microservices',
    difficulty: 'hard',
    hints: [
      'Task dependencies',
      'Fault tolerance',
      'Resource allocation'
    ],
    evaluationCriteria: [
      'Scheduling algorithm',
      'Failure handling',
      'Resource management',
      'Monitoring'
    ],
    expectedComponents: ['Scheduler', 'Worker Pool', 'Task Queue', 'DAG Manager', 'Executor'],
    sampleAnswer: 'Use priority queue with backoff for retry and DAG for dependencies...',
    companies: ['Airflow', 'Celery', 'Kubernetes']
  },
  {
    id: '15',
    title: 'Design an Authentication System',
    description: 'Design a secure authentication system with OAuth/JWT.',
    category: 'api',
    difficulty: 'medium',
    hints: [
      'Token management',
      'Session handling',
      'Security best practices'
    ],
    evaluationCriteria: [
      'Auth flow',
      'Token strategy',
      'Security',
      'Scalability'
    ],
    expectedComponents: ['Auth Service', 'Token Service', 'Session Store', 'MFA Service'],
    sampleAnswer: 'Use JWT with refresh tokens and implement token rotation...',
    companies: ['Auth0', 'Okta', 'Firebase']
  },
  {
    id: '16',
    title: 'Design a Notification System',
    description: 'Design a push notification system.',
    category: 'microservices',
    difficulty: 'medium',
    hints: [
      'Delivery guarantees',
      'Device targeting',
      'Rate limiting'
    ],
    evaluationCriteria: [
      'Architecture',
      'Delivery strategy',
      'Preference management',
      'Analytics'
    ],
    expectedComponents: ['Notification Service', 'Push Provider', 'Device Registry', 'Queue'],
    sampleAnswer: 'Use topic-based pub/sub with exponential backoff for retries...',
    companies: ['Firebase', 'OneSignal', 'Airship']
  },
  {
    id: '17',
    title: 'Design a Log Aggregation System',
    description: 'Design a system to collect and analyze logs from distributed services.',
    category: 'distributed-systems',
    difficulty: 'hard',
    hints: [
      'Collection strategy',
      'Storage and search',
      'Real-time processing'
    ],
    evaluationCriteria: [
      'Ingestion pipeline',
      'Storage strategy',
      'Query interface',
      'Alerting'
    ],
    expectedComponents: ['Log Collector', 'Processor', 'Storage', 'Search Engine', 'Alert Manager'],
    sampleAnswer: 'Use Kafka for message streaming with Elasticsearch for search...',
    companies: ['ELK Stack', 'Datadog', 'Splunk']
  },
  {
    id: '18',
    title: 'Design a Recommendation System',
    description: 'Design a product recommendation engine like Amazon.',
    category: 'scalability',
    difficulty: 'hard',
    hints: [
      'Algorithm choice',
      'Real-time vs batch',
      'Personalization'
    ],
    evaluationCriteria: [
      'Algorithm design',
      'Data pipeline',
      'A/B testing',
      'Scalability'
    ],
    expectedComponents: ['Recommendation Engine', 'Feature Store', 'Model Training', 'A/B Testing'],
    sampleAnswer: 'Use collaborative filtering with content-based fallback...',
    companies: ['Amazon', 'Netflix', 'Spotify']
  },
  {
    id: '19',
    title: 'Design a Metrics Dashboard',
    description: 'Design a system metrics monitoring dashboard.',
    category: 'microservices',
    difficulty: 'medium',
    hints: [
      'Time-series storage',
      'Query aggregation',
      'Visualization'
    ],
    evaluationCriteria: [
      'Data collection',
      'Storage architecture',
      'Query performance',
      'Visualization'
    ],
    expectedComponents: ['Metrics Collector', 'Time-series DB', 'Query Engine', 'Dashboard UI'],
    sampleAnswer: 'Use Prometheus for collection with custom storage for retention...',
    companies: ['Prometheus', 'Grafana', 'DataDog']
  },
  {
    id: '20',
    title: 'Design a Feature Flag System',
    description: 'Design a feature toggle system for gradual rollouts.',
    category: 'microservices',
    difficulty: 'medium',
    hints: [
      'Targeting rules',
      'Evaluation strategy',
      'Rollback mechanism'
    ],
    evaluationCriteria: [
      'Flag management',
      'Evaluation performance',
      'Targeting',
      'Analytics'
    ],
    expectedComponents: ['Flag Service', 'Evaluation Engine', 'Targeting Rules', 'Analytics'],
    sampleAnswer: 'Use client-side evaluation with CDN caching for low latency...',
    companies: ['LaunchDarkly', 'Split.io', 'Optimizely']
  },
  // Additional questions to reach 100+
  {
    id: '21',
    title: 'Design a Web Crawler',
    description: 'Design a scalable web crawling system.',
    category: 'scalability',
    difficulty: 'hard',
    hints: ['URL prioritization', 'Duplicate detection', 'Politeness'],
    evaluationCriteria: ['Crawling strategy', 'Storage', 'Deduplication', 'Rate limiting'],
    expectedComponents: ['Crawler', 'URL Queue', 'Deduplicator', 'Storage'],
    sampleAnswer: 'Use BFS with URL fingerprinting for deduplication...',
    companies: ['Google', 'Bing']
  },
  {
    id: '22',
    title: 'Design a Pastebin Service',
    description: 'Design a service for sharing text snippets.',
    category: 'scalability',
    difficulty: 'easy',
    hints: ['Storage', 'Retrieval', 'Expiration'],
    evaluationCriteria: ['Storage strategy', 'Access patterns', 'URL generation'],
    expectedComponents: ['API', 'Storage', 'Expiration Worker'],
    sampleAnswer: 'Use object storage with base64 encoded keys...',
    companies: ['Pastebin', 'GitHub Gist']
  },
  {
    id: '23',
    title: 'Design a Distributed Lock',
    description: 'Design a distributed locking mechanism.',
    category: 'distributed-systems',
    difficulty: 'hard',
    hints: ['Consistency', 'Performance', 'Failure handling'],
    evaluationCriteria: ['Lock implementation', 'Deadlock prevention', 'Performance'],
    expectedComponents: ['Lock Manager', 'Lease Manager', 'Client Library'],
    sampleAnswer: 'Use ZooKeeper or etcd with TTL for lease management...',
    companies: ['Redis', 'ZooKeeper']
  },
  {
    id: '24',
    title: 'Design a Shopping Cart',
    description: 'Design a shopping cart for e-commerce.',
    category: 'database',
    difficulty: 'easy',
    hints: ['Data model', 'Concurrency', 'Persistence'],
    evaluationCriteria: ['Schema', 'Session management', 'Concurrency'],
    expectedComponents: ['Cart Service', 'Cart DB', 'Inventory Check'],
    sampleAnswer: 'Use Redis for session storage with database persistence...',
    companies: ['Amazon', 'Shopify']
  },
  {
    id: '25',
    title: 'Design a Ticket Booking System',
    description: 'Design a movie ticket booking system.',
    category: 'database',
    difficulty: 'hard',
    hints: ['Concurrency', 'Locking', 'Transactions'],
    evaluationCriteria: ['Concurrency handling', 'Seat locking', 'Payment integration'],
    expectedComponents: ['Booking Service', 'Seat Lock', 'Payment', 'Notification'],
    sampleAnswer: 'Use optimistic locking with two-phase commit...',
    companies: ['BookMyShow', 'Ticketmaster']
  }
];

// Generate more questions to reach 100+
const additionalCategories = [
  { category: 'scalability', count: 15 },
  { category: 'database', count: 15 },
  { category: 'api', count: 10 },
  { category: 'caching', count: 10 },
  { category: 'microservices', count: 15 },
  { category: 'distributed-systems', count: 15 }
];

const questionTemplates = [
  'Design a {company} clone for {feature}',
  'Design a system for {useCase}',
  'Design {service} with {constraint}',
  'Design an analytics platform for {domain}',
  'Design a real-time system for {useCase}'
];

const companies = ['Google', 'Facebook', 'Amazon', 'Netflix', 'Uber', 'Airbnb', 'Spotify', 'Twitter'];
const features = ['messaging', 'shopping', 'social', 'streaming', 'delivery', 'booking'];
const useCases = ['real-time updates', 'high concurrency', 'global distribution', 'offline support', 'AI integration'];
const services = ['API', 'Gateway', 'Cache', 'Queue', 'Database'];
const constraints = ['low latency', 'high availability', 'cost optimization', 'security'];
const domains = ['e-commerce', 'healthcare', 'finance', 'gaming', 'education'];


// Add generated questions
let id = 26;
additionalCategories.forEach(({ category, count }) => {
  for (let i = 0; i < count; i++) {
    const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
    const title = template
      .replace('{company}', companies[Math.floor(Math.random() * companies.length)])
      .replace('{feature}', features[Math.floor(Math.random() * features.length)])
      .replace('{useCase}', useCases[Math.floor(Math.random() * useCases.length)])
      .replace('{service}', services[Math.floor(Math.random() * services.length)])
      .replace('{constraint}', constraints[Math.floor(Math.random() * constraints.length)])
      .replace('{domain}', domains[Math.floor(Math.random() * domains.length)]);
    
    questions.push({
      id: String(id++),
      title,
      description: `Design and architect a system for ${title.toLowerCase()}. Consider scalability, reliability, and maintainability.`,
      category: category as any,
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as any,
      hints: ['Consider the core requirements', 'Think about data flow', 'Address scalability concerns'],
      evaluationCriteria: ['Architecture', 'Data model', 'API design', 'Trade-offs'],
      expectedComponents: ['Service', 'Database', 'Cache', 'Queue'],
      sampleAnswer: 'A comprehensive answer would cover...',
      companies: [companies[Math.floor(Math.random() * companies.length)]]
    });
  }
});

export const diagramTemplates: DiagramTemplate[] = [
  {
    id: '1',
    name: 'Basic Architecture',
    category: 'general',
    mermaidCode: `graph LR
    Client --> LB[Load Balancer]
    LB --> API[API Gateway]
    API --> S1[Service A]
    API --> S2[Service B]
    S1 --> DB[(Database)]
    S2 --> Cache[(Cache)]`
  },
  {
    id: '2',
    name: 'Microservices',
    category: 'microservices',
    mermaidCode: `graph TB
    Client --> Gateway
    Gateway --> User[User Service]
    Gateway --> Order[Order Service]
    Gateway --> Product[Product Service]
    User --> UserDB[(User DB)]
    Order --> OrderDB[(Order DB)]
    Order --> Product
    Product --> ProductDB[(Product DB)]`
  },
  {
    id: '3',
    name: 'Event-Driven',
    category: 'messaging',
    mermaidCode: `graph LR
    Producer --> Queue[Message Queue]
    Queue --> Consumer1[Consumer A]
    Queue --> Consumer2[Consumer B]
    Consumer1 --> DB1[(Database)]
    Consumer2 --> DB2[(Database)]`
  },
  {
    id: '4',
    name: 'Database Sharding',
    category: 'database',
    mermaidCode: `graph TB
    App[Application] --> Router[Shard Router]
    Router --> Shard1[(Shard 1)]
    Router --> Shard2[(Shard 2)]
    Router --> Shard3[(Shard 3)]
    Router --> Shard4[(Shard 4)]`
  },
  {
    id: '5',
    name: 'CDN Architecture',
    category: 'caching',
    mermaidCode: `graph LR
    User --> CDN[CDN]
    CDN --> Origin[Origin Server]
    CDN --> Edge1[Edge Location 1]
    CDN --> Edge2[Edge Location 2]
    CDN --> Edge3[Edge Location 3]`
  },
  {
    id: '6',
    name: 'Load Balancer',
    category: 'scalability',
    mermaidCode: `graph TB
    Users --> LB[Load Balancer]
    LB --> Server1[Server 1]
    LB --> Server2[Server 2]
    LB --> Server3[Server 3]
    Server1 --> DB[(Database)]
    Server2 --> DB
    Server3 --> DB`
  }
];

export function getQuestionsByCategory(category: string): Question[] {
  return questions.filter(q => q.category === category);
}

export function getQuestionsByDifficulty(difficulty: string): Question[] {
  return questions.filter(q => q.difficulty === difficulty);
}

export function getRandomQuestion(): Question {
  return questions[Math.floor(Math.random() * questions.length)];
}
