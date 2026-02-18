const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

/* ── Helper ── */
const request = async (url, options = {}) => {
    try {
        const response = await fetch(`${API_BASE}${url}`, {
            headers: { 'Content-Type': 'application/json', ...options.headers },
            ...options,
        });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

/* ── Resume Analysis ── */
export const analyzeResume = async (resumeFile, jobDescription) => {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('job_description', jobDescription);

    try {
        const response = await fetch(`${API_BASE}/analyze-resume`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) throw new Error('Resume analysis failed');
        return await response.json();
    } catch (error) {
        console.warn('API unavailable, using demo data');
        return getDemoAnalysis();
    }
};

/* ── Roadmap Generation ── */
export const generateRoadmap = async (skills) => {
    try {
        return await request('/generate-roadmap', {
            method: 'POST',
            body: JSON.stringify({ skills }),
        });
    } catch {
        return getDemoRoadmap();
    }
};

/* ── Test Generation ── */
export const generateTest = async (topic, type = 'mcq', count = 10) => {
    try {
        return await request('/generate-test', {
            method: 'POST',
            body: JSON.stringify({ topic, type, count }),
        });
    } catch {
        return getDemoTest(topic, type);
    }
};

/* ── Submit Answer ── */
export const submitAnswer = async (testId, questionId, answer) => {
    try {
        return await request('/submit-answer', {
            method: 'POST',
            body: JSON.stringify({ testId, questionId, answer }),
        });
    } catch {
        return { correct: Math.random() > 0.4, explanation: 'Demo mode - connect backend for real evaluation.' };
    }
};

/* ── AI Chat ── */
export const sendChatMessage = async (message, context = '') => {
    try {
        return await request('/chat', {
            method: 'POST',
            body: JSON.stringify({ message, context }),
        });
    } catch {
        return { reply: getDemoChatReply(message) };
    }
};

/* ── Analytics ── */
export const getAnalytics = async () => {
    try {
        return await request('/analytics');
    } catch {
        return getDemoAnalytics();
    }
};

/* ═══════════════════════════════════════
   DEMO DATA (used when backend is offline)
   ═══════════════════════════════════════ */

const getDemoAnalysis = () => ({
    matchedSkills: [
        { name: 'React.js', match: 92 },
        { name: 'JavaScript', match: 88 },
        { name: 'CSS/Tailwind', match: 95 },
        { name: 'Git/GitHub', match: 90 },
    ],
    missingSkills: [
        { name: 'TypeScript', priority: 'high', weeks: 3 },
        { name: 'System Design', priority: 'high', weeks: 4 },
        { name: 'Node.js/Express', priority: 'medium', weeks: 3 },
        { name: 'SQL & Databases', priority: 'medium', weeks: 2 },
        { name: 'Docker & CI/CD', priority: 'low', weeks: 2 },
    ],
    overallMatch: 72,
    estimatedPrepTime: '8-10 weeks',
});

const getDemoRoadmap = () => ({
    weeks: [
        {
            week: 1, title: 'TypeScript Fundamentals',
            topics: [
                {
                    name: 'Types & Interfaces', completed: false,
                    theory: 'TypeScript adds static typing to JavaScript, catching errors at compile time rather than runtime. Key concepts include:\n\n• Primitive types: string, number, boolean, null, undefined\n• Union types: string | number — a value that can be either type\n• Intersection types: A & B — combines multiple types\n• Interfaces: Define object shapes and can be extended\n• Type aliases: Flexible alternative to interfaces, supports unions',
                    resources: [
                        { type: 'video', title: 'TypeScript Full Course — Net Ninja', url: 'https://youtube.com/watch?v=2pZmKW9-I_k', duration: '2h 30m' },
                        { type: 'video', title: 'TS in 100 Seconds — Fireship', url: 'https://youtube.com/watch?v=zQnBQ4tB3ZA', duration: '2m' },
                        { type: 'article', title: 'TypeScript Official Handbook', url: 'https://typescriptlang.org/docs/handbook' },
                        { type: 'practice', title: 'TypeScript Exercises (Interactive)', url: 'https://typescript-exercises.github.io' },
                    ]
                },
                {
                    name: 'Generics & Utility Types', completed: false,
                    theory: 'Generics allow reusable components that work with multiple types:\n\n• function identity<T>(value: T): T — generic function\n• Utility types: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>\n• Conditional types: T extends U ? X : Y\n• Mapped types: { [K in keyof T]: boolean }',
                    resources: [
                        { type: 'video', title: 'Generics Deep Dive — Jack Herrington', url: 'https://youtube.com', duration: '45m' },
                        { type: 'article', title: 'TypeScript Generics Guide', url: 'https://typescriptlang.org/docs/handbook/2/generics.html' },
                        { type: 'practice', title: 'Type Challenges on GitHub', url: 'https://github.com/type-challenges/type-challenges' },
                    ]
                },
            ],
            projects: [
                { title: 'Type-safe Todo App', description: 'Build a todo list with fully typed state (Todo interface, filter enums, typed actions). Practice interfaces, generics, and type narrowing.', difficulty: 'Easy', time: '2-3 hours' },
                { title: 'JSON Schema Validator', description: 'Create a utility function that validates unknown JSON data against TypeScript interfaces at runtime using type guards.', difficulty: 'Medium', time: '3-4 hours' },
            ],
            videos: [
                { title: 'TypeScript Tutorial for Beginners', channel: 'Net Ninja', url: 'https://www.youtube.com/watch?v=2pZmKW9-I_k', duration: '2h 30m' },
                { title: 'TypeScript in 100 Seconds', channel: 'Fireship', url: 'https://www.youtube.com/watch?v=zQnBQ4tB3ZA', duration: '2 min' },
                { title: 'No BS TS — Generics & Utility Types', channel: 'Jack Herrington', url: 'https://www.youtube.com/watch?v=EcCTIExsqmI', duration: '45 min' },
                { title: 'TypeScript Full Course 2024', channel: 'Dave Gray', url: 'https://www.youtube.com/watch?v=gieEQFIfgYc', duration: '8h' },
            ],
            interviews: [
                { q: 'What is the difference between interface and type in TypeScript?', type: 'technical' },
                { q: 'How do generics improve code reusability? Give an example.', type: 'technical' },
                { q: 'Tell me about a time you had to learn a new technology quickly.', type: 'hr' },
            ],
        },
        {
            week: 2, title: 'Advanced TypeScript + React',
            topics: [
                {
                    name: 'React with TypeScript', completed: false,
                    theory: 'TypeScript enhances React development with static type checking:\n\n• Typing props: interface Props { name: string; age?: number }\n• Typing state: const [count, setCount] = useState<number>(0)\n• Typing events: React.ChangeEvent<HTMLInputElement>\n• FC<Props> vs regular functions for components\n• Custom hooks with typed return values',
                    resources: [
                        { type: 'video', title: 'React + TypeScript Full Setup — Codevolution', url: 'https://youtube.com', duration: '1h 15m' },
                        { type: 'video', title: 'React TS Tips — Matt Pocock', url: 'https://youtube.com', duration: '20m' },
                        { type: 'article', title: 'React TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app' },
                        { type: 'practice', title: 'Convert JS App to TS Exercise', url: 'https://react-typescript-cheatsheet.netlify.app/docs/migration' },
                    ]
                },
                {
                    name: 'API Types & Validation', completed: false,
                    theory: 'Runtime validation ensures API responses match expected types:\n\n• Zod: Schema-first validation with .parse() and .safeParse()\n• io-ts: Functional approach to runtime types\n• Axios interceptors for typed responses\n• Creating type-safe API layers with generics',
                    resources: [
                        { type: 'video', title: 'Zod: Runtime Validation Tutorial', url: 'https://youtube.com', duration: '35m' },
                        { type: 'article', title: 'Zod Documentation', url: 'https://zod.dev' },
                        { type: 'practice', title: 'Build a Type-safe API Client', url: 'https://github.com' },
                    ]
                },
            ],
            projects: [
                { title: 'Weather Dashboard (React + TS)', description: 'Fetch weather data from OpenWeather API with fully typed responses using Zod. Display current weather, forecast, and handle loading/error states with typed components.', difficulty: 'Medium', time: '4-5 hours' },
                { title: 'Typed Form Builder', description: 'Build a dynamic form component that infers field types from a schema object. Use generics and conditional types for type-safe form handling.', difficulty: 'Hard', time: '5-6 hours' },
            ],
            videos: [
                { title: 'React TypeScript Tutorial', channel: 'Codevolution', url: 'https://www.youtube.com/watch?v=FJDVKeh7RJI', duration: '1h 15m' },
                { title: 'React with TypeScript Crash Course', channel: 'Laith Academy', url: 'https://www.youtube.com/watch?v=jrKcJxF0lAU', duration: '1h 40m' },
                { title: 'Total TypeScript Tips — React', channel: 'Matt Pocock', url: 'https://www.youtube.com/watch?v=hBk4nV7q6-w', duration: '20 min' },
                { title: 'Zod + React Form Validation', channel: 'Web Dev Simplified', url: 'https://www.youtube.com/watch?v=L6BE-U3oy80', duration: '35 min' },
            ],
            interviews: [
                { q: 'How do you type React component props and state?', type: 'technical' },
                { q: 'Explain discriminated unions in TypeScript with a React example.', type: 'technical' },
                { q: 'Describe a project where you improved code quality. What was the impact?', type: 'hr' },
            ],
        },
        {
            week: 3, title: 'System Design Basics',
            topics: [
                {
                    name: 'Scalability Concepts', completed: false,
                    theory: 'Core system design concepts for interviews:\n\n• Horizontal scaling: Add more machines (vs vertical: upgrade one machine)\n• Load balancing: Round-robin, least connections, IP hash\n• Caching: Redis, Memcached, CDN edge caching\n• Database sharding: Split data across multiple DBs\n• CAP theorem: Consistency, Availability, Partition tolerance — choose 2\n• Microservices vs Monolith tradeoffs',
                    resources: [
                        { type: 'video', title: 'System Design Primer — Gaurav Sen', url: 'https://youtube.com', duration: '3h' },
                        { type: 'video', title: 'Designing Instagram — Tech Dummies', url: 'https://youtube.com', duration: '45m' },
                        { type: 'article', title: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer' },
                        { type: 'practice', title: 'Design Gurus: System Design', url: 'https://designgurus.io' },
                    ]
                },
                {
                    name: 'Database Design', completed: false,
                    theory: 'Database foundations for system design:\n\n• SQL: Relational, ACID, joins, normalization (1NF → 3NF)\n• NoSQL: Document (MongoDB), Key-Value (Redis), Column (Cassandra)\n• Indexing: B-tree vs Hash indexes, composite indexes\n• Query optimization: EXPLAIN plans, avoiding N+1 queries\n• When to use SQL vs NoSQL (consistency vs scalability)',
                    resources: [
                        { type: 'video', title: 'DB Design Masterclass — Hussein Nasser', url: 'https://youtube.com', duration: '2h' },
                        { type: 'article', title: 'SQL vs NoSQL Deep Dive', url: 'https://www.mongodb.com/nosql-explained/nosql-vs-sql' },
                        { type: 'practice', title: 'SQLBolt (Interactive)', url: 'https://sqlbolt.com' },
                        { type: 'practice', title: 'PostgreSQL Exercises', url: 'https://pgexercises.com' },
                    ]
                },
            ],
            projects: [
                { title: 'Design a URL Shortener', description: 'System design doc + working prototype: hash generation (base62), redirect service, click analytics dashboard, rate limiting. Draw architecture diagrams.', difficulty: 'Medium', time: '4-5 hours' },
                { title: 'Build a Chat API Schema', description: 'Design the database schema for a real-time chat application. Implement in PostgreSQL with users, conversations, messages, and read receipts.', difficulty: 'Medium', time: '3-4 hours' },
            ],
            videos: [
                { title: 'System Design for Beginners', channel: 'Gaurav Sen', url: 'https://www.youtube.com/watch?v=xpDnVSmNFX0', duration: '25 min' },
                { title: 'System Design Interview — URL Shortener', channel: 'NeetCode', url: 'https://www.youtube.com/watch?v=fMZMm_0ZhK4', duration: '20 min' },
                { title: 'Database Design Full Course', channel: 'Hussein Nasser', url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc', duration: '2h' },
                { title: 'SQL vs NoSQL — Which to Choose?', channel: 'Fireship', url: 'https://www.youtube.com/watch?v=W2Z7fbCLSTw', duration: '5 min' },
            ],
            interviews: [
                { q: 'Design a URL shortener like Bit.ly — walk me through the architecture.', type: 'technical' },
                { q: 'Explain CAP theorem with real-world examples.', type: 'technical' },
                { q: 'Tell me about a time you handled a high-pressure deadline.', type: 'hr' },
            ],
        },
        {
            week: 4, title: 'Node.js & Backend Fundamentals',
            topics: [
                {
                    name: 'Express.js REST APIs', completed: false,
                    theory: 'Express.js is a minimal Node.js web framework:\n\n• Routing: app.get(), app.post(), app.put(), app.delete()\n• Middleware: Request pipeline — logging, auth, error handling\n• Error handling: Try-catch + express-async-errors\n• Authentication: JWT tokens, bcrypt for password hashing\n• Project structure: routes/, controllers/, models/, middleware/',
                    resources: [
                        { type: 'video', title: 'Node.js + Express Crash Course — Traversy', url: 'https://youtube.com', duration: '2h 45m' },
                        { type: 'video', title: 'JWT Auth Tutorial — Web Dev Simplified', url: 'https://youtube.com', duration: '30m' },
                        { type: 'article', title: 'Express.js Best Practices', url: 'https://expressjs.com/en/advanced/best-practice-security.html' },
                        { type: 'practice', title: 'FreeCodeCamp APIs & Microservices', url: 'https://freecodecamp.org' },
                    ]
                },
                {
                    name: 'Authentication & Security', completed: false,
                    theory: 'Securing APIs is essential:\n\n• JWT: JSON Web Tokens for stateless auth (access + refresh tokens)\n• bcrypt: Hash passwords with salt rounds\n• CORS: Cross-Origin Resource Sharing configuration\n• Rate limiting: Prevent abuse with express-rate-limit\n• Input validation: Sanitize with express-validator or Joi',
                    resources: [
                        { type: 'video', title: 'Auth Deep Dive — Fireship', url: 'https://youtube.com', duration: '12m' },
                        { type: 'article', title: 'OWASP Top 10 Security Risks', url: 'https://owasp.org/www-project-top-ten/' },
                        { type: 'practice', title: 'Build a Secure Login Flow', url: 'https://github.com' },
                    ]
                },
            ],
            projects: [
                { title: 'REST API for a Blog', description: 'Build a complete CRUD API with Express: posts, comments, user auth (JWT + bcrypt), pagination, input validation. Deploy to Render/Railway.', difficulty: 'Medium', time: '6-8 hours' },
                { title: 'Real-time Chat Backend', description: 'Create a WebSocket-based chat server with Socket.io. Features: rooms, typing indicators, message history with MongoDB. Connect to a React frontend.', difficulty: 'Hard', time: '8-10 hours' },
            ],
            videos: [
                { title: 'Node.js + Express Crash Course', channel: 'Traversy Media', url: 'https://www.youtube.com/watch?v=SccSCuHhOw0', duration: '2h 45m' },
                { title: 'JWT Authentication Tutorial', channel: 'Web Dev Simplified', url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4', duration: '30 min' },
                { title: 'Node.js in 100 Seconds', channel: 'Fireship', url: 'https://www.youtube.com/watch?v=ENrzD9HAZK4', duration: '2 min' },
                { title: 'REST API with Node & Express Full Build', channel: 'The Net Ninja', url: 'https://www.youtube.com/watch?v=_7UQPve99r4', duration: '1h 30m' },
            ],
            interviews: [
                { q: 'Explain middleware in Express.js and the request lifecycle.', type: 'technical' },
                { q: 'How does JWT authentication work? What are access vs refresh tokens?', type: 'technical' },
                { q: 'What is your greatest strength and how has it helped in your career?', type: 'hr' },
            ],
        },
    ],
});

const getDemoTest = (topic, type) => {
    if (type === 'coding') {
        return {
            id: 'test_coding_1',
            type: 'coding',
            topic,
            timeLimit: 1800,
            questions: [
                { id: 'q1', title: 'Two Sum', difficulty: 'Easy', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }], hints: ['Try using a hash map for O(n) solution.'] },
                { id: 'q2', title: 'Valid Parentheses', difficulty: 'Easy', description: 'Given a string s containing just the characters ( ) { } [ ], determine if the input string is valid.', examples: [{ input: 's = "([])"', output: 'true' }], hints: ['Use a stack data structure.'] },
            ],
        };
    }
    if (type === 'behavioral') {
        return {
            id: 'test_hr_1',
            type: 'behavioral',
            topic,
            questions: [
                { id: 'q1', question: 'Tell me about a time you had to overcome a significant challenge at work or in a project.', tips: 'Use the STAR method: Situation, Task, Action, Result.' },
                { id: 'q2', question: 'Describe a situation where you had to work with a difficult team member.', tips: 'Focus on your communication and conflict resolution skills.' },
                { id: 'q3', question: 'Where do you see yourself in 5 years?', tips: 'Align your answer with the company\'s growth trajectory.' },
            ],
        };
    }
    return {
        id: 'test_mcq_1',
        type: 'mcq',
        topic,
        timeLimit: 600,
        questions: [
            { id: 'q1', question: `What is the output of: console.log(typeof null)?`, options: ['null', 'undefined', 'object', 'string'], correct: 2, explanation: 'typeof null returns "object" — this is a known JS quirk.' },
            { id: 'q2', question: 'Which hook is used for side effects in React?', options: ['useState', 'useEffect', 'useRef', 'useMemo'], correct: 1, explanation: 'useEffect runs side effects after render, like API calls.' },
            { id: 'q3', question: 'What does CSS flexbox property "justify-content" control?', options: ['Cross axis', 'Main axis alignment', 'Wrapping', 'Order'], correct: 1, explanation: 'justify-content aligns items along the main axis (horizontal by default).' },
            { id: 'q4', question: 'What does REST stand for?', options: ['Random Execution State Transfer', 'Representational State Transfer', 'Resource Efficient System Transfer', 'Remote State Tracking'], correct: 1, explanation: 'REST = Representational State Transfer, a software architecture style.' },
            { id: 'q5', question: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correct: 1, explanation: 'Stack uses Last-In-First-Out — like a pile of plates.' },
        ],
    };
};

const getDemoChatReply = (message) => {
    const lower = message.toLowerCase();
    if (lower.includes('resume')) return "I'd recommend starting with Resume Island to upload your resume and get a personalized analysis. I'll identify skill gaps and create a tailored learning roadmap for you!";
    if (lower.includes('interview')) return "Head to the Interview Arena for mock interviews! I can simulate technical and behavioral rounds, and even accept voice responses. Let's practice your STAR method answers!";
    if (lower.includes('test') || lower.includes('quiz')) return "Visit Concept Caverns for AI-generated tests! I'll create MCQs, coding challenges, and timed assessments based on your skill gaps. Let's test your knowledge!";
    return "I've analyzed your career expedition status. I'd suggest focusing on your weakest areas first. Head to the Dashboard for a detailed performance breakdown, or try the Concept Caverns for targeted practice!";
};

const getDemoAnalytics = () => ({
    totalTests: 24,
    avgScore: 78,
    streak: 5,
    testsThisWeek: 4,
    scoreBreakdown: [
        { type: 'MCQ', score: 82, total: 15 },
        { type: 'Coding', score: 71, total: 6 },
        { type: 'Behavioral', score: 85, total: 3 },
    ],
    weakAreas: ['System Design', 'Dynamic Programming', 'SQL Queries'],
    revisionTopics: ['TypeScript Generics', 'REST API Design', 'React Performance'],
    performanceTrend: [
        { date: 'Week 1', score: 55 },
        { date: 'Week 2', score: 62 },
        { date: 'Week 3', score: 68 },
        { date: 'Week 4', score: 74 },
        { date: 'Week 5', score: 78 },
        { date: 'Week 6', score: 82 },
    ],
});
