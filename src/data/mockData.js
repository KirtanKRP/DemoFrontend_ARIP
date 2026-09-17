export const currentMockUser = {
  name: 'Kirtan Patel',
  email: 'kirtan1999@gmail.com',
  avatar: 'K',
  role: 'Senior Software Engineer',
  language: 'English',
  notifications: true
}

export const mockResumes = [
  'Kirtan_Patel_Resume.pdf',
  'Frontend_Developer_Resume.pdf',
  'Software_Engineer_Resume.pdf',
  'FullStack_Lead_Resume.pdf'
]

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('preptalk_user')
    if (raw && raw !== 'null' && raw !== 'undefined') {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object' && parsed.name) {
        return parsed
      }
    }
  } catch (e) {
    console.error('Error reading stored user', e)
  }
  return currentMockUser
}

export const saveStoredUser = (user) => {
  try {
    localStorage.setItem('preptalk_user', JSON.stringify(user))
    window.dispatchEvent(new Event('preptalk_user_updated'))
  } catch (e) {
    console.error('Error saving user', e)
  }
}

export const mockHistory = [
  {
    id: 'hist-1',
    role: 'Senior Frontend Lead',
    category: 'Frontend',
    resumeName: 'Kirtan_Patel_Resume.pdf',
    resumeMatchScore: '94%',
    dateTime: '2026-09-15 14:30',
    formattedDate: 'Sep 15, 2026 • 02:30 PM',
    duration: '30 mins',
    score: 92,
    status: 'Completed',
    difficulty: 'Hard',
    topics: ['React', 'System Design', 'Performance Optimization'],
    strengths: ['Deep knowledge of React virtual DOM', 'Clear explanation of SSR vs CSR tradeoffs', 'Strong architecture vision'],
    improvements: ['Could elaborate more on micro-frontend state isolation'],
    questions: [
      { q: 'How do you optimize render performance in large React applications?', a: 'Discussed memoization, windowing with react-window, and virtual DOM diffing strategies.' },
      { q: 'Explain your strategy for state management at scale.', a: 'Detailed Redux Toolkit, React Context scoping, and Zustand state slice patterns.' }
    ]
  },
  {
    id: 'hist-2',
    role: 'Full Stack Engineer',
    category: 'Full Stack',
    resumeName: 'FullStack_Lead_Resume.pdf',
    resumeMatchScore: '89%',
    dateTime: '2026-09-12 10:15',
    formattedDate: 'Sep 12, 2026 • 10:15 AM',
    duration: '45 mins',
    score: 85,
    status: 'Completed',
    difficulty: 'Medium',
    topics: ['Node.js', 'GraphQL', 'PostgreSQL', 'Docker'],
    strengths: ['Great API schema design skills', 'Excellent database indexing explanations'],
    improvements: ['Work on Docker multi-stage build optimizations'],
    questions: [
      { q: 'How do you prevent N+1 queries in GraphQL?', a: 'Explained DataLoader batching and caching mechanisms.' },
      { q: 'Describe PostgreSQL index selection logic.', a: 'Covered B-Tree vs GIN indexes for JSONB fields.' }
    ]
  },
  {
    id: 'hist-3',
    role: 'React Native Developer',
    category: 'Mobile',
    resumeName: 'Frontend_Developer_Resume.pdf',
    resumeMatchScore: '82%',
    dateTime: '2026-09-08 16:45',
    formattedDate: 'Sep 08, 2026 • 04:45 PM',
    duration: '15 mins',
    score: 78,
    status: 'Completed',
    difficulty: 'Easy',
    topics: ['React Native', 'Mobile UI', 'AsyncStorage'],
    strengths: ['Good understanding of native bridges and reanimated 2'],
    improvements: ['Review iOS deployment process & provisioning profiles'],
    questions: [
      { q: 'How does the New Architecture in React Native improve UI responsiveness?', a: 'Touched on Fabric renderer and JSI interface.' }
    ]
  },
  {
    id: 'hist-4',
    role: 'System Design Architect',
    category: 'System Design',
    resumeName: 'Software_Engineer_Resume.pdf',
    resumeMatchScore: '96%',
    dateTime: '2026-09-02 11:00',
    formattedDate: 'Sep 02, 2026 • 11:00 AM',
    duration: '60 mins',
    score: 88,
    status: 'Completed',
    difficulty: 'Hard',
    topics: ['Distributed Systems', 'Kafka', 'Redis Caching', 'Load Balancing'],
    strengths: ['Articulate trade-offs between consistency and availability', 'Solid cache invalidation strategy'],
    improvements: ['Include consensus algorithms like Raft in deep dives'],
    questions: [
      { q: 'Design a high-throughput notification service handling 1M msg/sec.', a: 'Proposed Kafka topic partitioning with worker consumer groups.' }
    ]
  },
  {
    id: 'hist-5',
    role: 'UI/UX Developer',
    category: 'Frontend',
    resumeName: 'Kirtan_Patel_Resume.pdf',
    resumeMatchScore: '91%',
    dateTime: '2026-08-28 09:30',
    formattedDate: 'Aug 28, 2026 • 09:30 AM',
    duration: '30 mins',
    score: 95,
    status: 'Completed',
    difficulty: 'Medium',
    topics: ['CSS Architecture', 'Accessibility (a11y)', 'Figma to Code'],
    strengths: ['Outstanding ARIA standards compliance', 'Clean modular CSS custom properties'],
    improvements: ['No major weaknesses noted'],
    questions: [
      { q: 'How do you ensure WCAG AAA compliance in design systems?', a: 'Explained contrast ratios, screen reader announcements, and keyboard navigation testing.' }
    ]
  }
]
