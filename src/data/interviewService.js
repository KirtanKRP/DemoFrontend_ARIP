/**
 * PrepTalk Interview Service — Frontend Mock Layer
 *
 * This module provides the data contract and mock implementation
 * for the live interview experience. When backend integration is
 * ready, only this module needs to be replaced.
 *
 * DO NOT import backend URLs or make real API calls here.
 */

// ── Interview state machine ──────────────────────────────────────
/** @typedef {"INITIALIZING"|"AI_SPEAKING"|"LISTENING"|"USER_SPEAKING"|"PROCESSING"|"COMPLETED"|"ERROR"} InterviewState */

export const INTERVIEW_STATES = {
  INITIALIZING: 'INITIALIZING',
  AI_SPEAKING: 'AI_SPEAKING',
  LISTENING: 'LISTENING',
  USER_SPEAKING: 'USER_SPEAKING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  ERROR: 'ERROR',
}

// ── Mock interview sessions ──────────────────────────────────────

const MOCK_QUESTIONS = [
  {
    id: 'q1',
    text: "Great to have you here. Let's start with Node.js. Can you explain the difference between synchronous and asynchronous programming in that context?",
  },
  {
    id: 'q2',
    text: "How would you handle error management in a large-scale Express.js application? Walk me through your approach to centralized error handling.",
  },
  {
    id: 'q3',
    text: "Can you describe the event loop in Node.js and how it affects performance in I/O-heavy applications?",
  },
  {
    id: 'q4',
    text: "Tell me about a time you optimized a slow database query. What tools and techniques did you use?",
  },
  {
    id: 'q5',
    text: "How do you approach testing in a React application? What's your strategy for unit, integration, and end-to-end tests?",
  },
  {
    id: 'q6',
    text: "Describe how you'd architect a real-time notification system. What technologies would you consider and why?",
  },
]

export const MOCK_INTERVIEWERS = {
  sophia: {
    name: 'Sophia',
    role: 'AI INTERVIEWER',
    avatarUrl: null, // Will use generated gradient avatar
    avatarGradient: 'linear-gradient(135deg, #c084fc, #a855f7, #7c3aed)',
  },
  alex: {
    name: 'Alex',
    role: 'AI INTERVIEWER',
    avatarUrl: null,
    avatarGradient: 'linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb)',
  },
  david: {
    name: 'David',
    role: 'AI INTERVIEWER',
    avatarUrl: null,
    avatarGradient: 'linear-gradient(135deg, #34d399, #10b981, #059669)',
  },
}

/**
 * Creates a new mock interview session.
 * Future: replace with real API call.
 */
export function createMockSession(config = {}) {
  const interviewer = MOCK_INTERVIEWERS[config.interviewer || 'sophia']
  const duration = config.duration || 600 // 10 minutes default

  return {
    id: `session-${Date.now()}`,
    interviewer,
    duration,
    startedAt: null,
    currentQuestionIndex: 0,
    questions: MOCK_QUESTIONS.slice(0, config.questionCount || 6),
    status: 'PENDING',
    answers: [],
  }
}

/**
 * Simulates saving the interview session.
 * Future: replace with real API call.
 * @returns {Promise<{success: boolean}>}
 */
export async function saveInterviewSession(session) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))

  // Store in localStorage for now (frontend mock)
  try {
    const saved = JSON.parse(localStorage.getItem('preptalk_saved_sessions') || '[]')
    saved.push({
      ...session,
      savedAt: new Date().toISOString(),
      status: 'SAVED',
    })
    localStorage.setItem('preptalk_saved_sessions', JSON.stringify(saved))
  } catch (e) {
    console.warn('[PrepTalk Mock] Could not save session to localStorage', e)
  }

  return { success: true }
}

/**
 * Simulates ending/completing the interview session.
 * Future: replace with real API call.
 * @returns {Promise<{success: boolean, reviewId: string}>}
 */
export async function endInterviewSession(session) {
  await new Promise(resolve => setTimeout(resolve, 600))

  try {
    const completed = JSON.parse(localStorage.getItem('preptalk_completed_sessions') || '[]')
    completed.push({
      ...session,
      completedAt: new Date().toISOString(),
      status: 'COMPLETED',
    })
    localStorage.setItem('preptalk_completed_sessions', JSON.stringify(completed))
  } catch (e) {
    console.warn('[PrepTalk Mock] Could not save completed session', e)
  }

  return { success: true, reviewId: `review-${Date.now()}` }
}

/**
 * Returns status label and dot color for a given interview state.
 */
export function getStatusDisplay(state, interviewerName = 'AI') {
  switch (state) {
    case INTERVIEW_STATES.INITIALIZING:
      return { label: 'PREPARING INTERVIEW', dotColor: '#f59e0b' }
    case INTERVIEW_STATES.AI_SPEAKING:
      return { label: `${interviewerName.toUpperCase()} SPEAKING`, dotColor: '#8b5cf6' }
    case INTERVIEW_STATES.LISTENING:
      return { label: 'YOUR TURN', dotColor: '#22c55e' }
    case INTERVIEW_STATES.USER_SPEAKING:
      return { label: "YOU'RE SPEAKING", dotColor: '#3b82f6' }
    case INTERVIEW_STATES.PROCESSING:
      return { label: 'ANALYZING RESPONSE', dotColor: '#f59e0b' }
    case INTERVIEW_STATES.COMPLETED:
      return { label: 'INTERVIEW COMPLETE', dotColor: '#10b981' }
    case INTERVIEW_STATES.ERROR:
      return { label: 'SOMETHING WENT WRONG', dotColor: '#ef4444' }
    default:
      return { label: 'STANDBY', dotColor: '#94a3b8' }
  }
}
