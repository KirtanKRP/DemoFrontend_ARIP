import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../interview.css'
import {
  INTERVIEW_STATES,
  createMockSession,
  saveInterviewSession,
  endInterviewSession,
  getStatusDisplay,
} from '../data/interviewService'

// ═══════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════

/** Interviewer badge — top left */
function InterviewerBadge({ interviewer }) {
  const initial = interviewer.name ? interviewer.name[0].toUpperCase() : '?'

  return (
    <div className="interviewer-badge" role="status" aria-label={`Interviewer: ${interviewer.name}`}>
      <div
        className="interviewer-avatar"
        style={{ background: interviewer.avatarGradient || '#a78bfa' }}
        aria-hidden="true"
      >
        {interviewer.avatarUrl
          ? <img src={interviewer.avatarUrl} alt={interviewer.name} />
          : <span>{initial}</span>
        }
      </div>
      <div className="interviewer-info">
        <div className="interviewer-name">{interviewer.name}</div>
        <div className="interviewer-role">{interviewer.role}</div>
      </div>
    </div>
  )
}

/** Session timer — top right */
function SessionTimer({ duration, isRunning }) {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!isRunning) return
    intervalRef.current = setInterval(() => {
      setElapsed(prev => {
        if (prev >= duration) {
          clearInterval(intervalRef.current)
          return duration
        }
        return prev + 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [isRunning, duration])

  const remaining = Math.max(0, duration - elapsed)
  const minutes = String(Math.floor(remaining / 60)).padStart(2, '0')
  const seconds = String(remaining % 60).padStart(2, '0')

  return (
    <div className="session-timer" role="timer" aria-label={`Time remaining: ${minutes}:${seconds}`}>
      <span className="timer-dot" aria-hidden="true" />
      {minutes}:{seconds}
    </div>
  )
}

/** AI Orb — center visual, state-aware */
function AIOrb({ state, audioLevel = 0 }) {
  return (
    <div className="ai-orb-container">
      <div className="ai-orb" data-state={state} aria-hidden="true">
        <div className="ai-orb-glow" />
        <div
          className="ai-orb-sphere"
          style={audioLevel > 0 ? { transform: `scale(${1 + audioLevel * 0.08})` } : undefined}
        />
        <div className="ai-orb-highlight" />
        <div className="ai-orb-highlight" />
        <div className="ai-orb-highlight" />
        <div className="ai-orb-highlight" />
      </div>
    </div>
  )
}

/** Question Card — center right */
function InterviewQuestionCard({ question }) {
  return (
    <div className="question-card" role="region" aria-label="Current interview question">
      <div className="question-label">
        <span className="question-label-dot" aria-hidden="true" />
        CURRENT QUESTION
      </div>
      <p className="question-text">{question}</p>
    </div>
  )
}

/** Status indicator — bottom */
function InterviewStatusIndicator({ state, interviewerName }) {
  const { label, dotColor } = getStatusDisplay(state, interviewerName)

  return (
    <div className="interview-status" role="status" aria-live="polite" aria-label={label}>
      <span className="status-dot" style={{ background: dotColor }} aria-hidden="true" />
      {label}
    </div>
  )
}

/** End Session confirmation modal */
function EndSessionModal({ onCancel, onConfirm, isEnding }) {
  const cancelRef = useRef(null)

  useEffect(() => {
    cancelRef.current?.focus()
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isEnding) onCancel()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onCancel, isEnding])

  return (
    <div className="interview-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="end-session-title">
      <div className="interview-modal">
        <h3 id="end-session-title">End this interview?</h3>
        <p>
          Your current answers will be saved, but unanswered questions won't be included in the evaluation.
        </p>
        <div className="interview-modal-actions">
          <button
            ref={cancelRef}
            className="modal-cancel-btn"
            onClick={onCancel}
            disabled={isEnding}
            type="button"
          >
            Cancel
          </button>
          <button
            className="modal-end-btn"
            onClick={onConfirm}
            disabled={isEnding}
            type="button"
          >
            {isEnding ? 'Ending…' : 'End Interview'}
          </button>
        </div>
      </div>
    </div>
  )
}



// ═══════════════════════════════════════════════════════════════
// Main Interview Page
// ═══════════════════════════════════════════════════════════════

export default function InterviewLive() {
  const navigate = useNavigate()

  // ── Read duration from URL params (set by InterviewDashboard) ──
  const searchParams = new URLSearchParams(window.location.search)
  const durationParam = parseInt(searchParams.get('duration') || '15', 10)
  const durationSeconds = durationParam * 60

  // ── Session setup ──────────────────────────────────────────
  const [session] = useState(() => createMockSession({ interviewer: 'sophia', duration: durationSeconds, questionCount: 6 }))
  const [interviewState, setInterviewState] = useState(INTERVIEW_STATES.INITIALIZING)
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [showEndModal, setShowEndModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isEnding, setIsEnding] = useState(false)
  const [timerRunning, setTimerRunning] = useState(false)

  // Mock audio level for future audio-reactive orb
  const [mockAudioLevel] = useState(0)

  // ── Initialization flow ────────────────────────────────────
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setInterviewState(INTERVIEW_STATES.AI_SPEAKING)
      setTimerRunning(true)
    }, 2200)

    return () => clearTimeout(initTimer)
  }, [])

  // ── Demo auto-cycle (simulates AI speaking → listening) ────
  useEffect(() => {
    if (interviewState !== INTERVIEW_STATES.AI_SPEAKING) return

    const speakTimer = setTimeout(() => {
      setInterviewState(INTERVIEW_STATES.LISTENING)
    }, 6000)

    return () => clearTimeout(speakTimer)
  }, [interviewState, currentQIndex])

  // ── Question navigation ────────────────────────────────────
  const currentQuestion = session.questions[currentQIndex]

  // ── Save & Exit ────────────────────────────────────────────
  const handleSaveExit = useCallback(async () => {
    if (isSaving) return
    setIsSaving(true)
    try {
      await saveInterviewSession({
        ...session,
        currentQuestionIndex: currentQIndex,
        status: 'SAVED',
      })
      navigate('/dashboard')
    } catch {
      setIsSaving(false)
    }
  }, [isSaving, session, currentQIndex, navigate])

  // ── End Session ────────────────────────────────────────────
  const handleEndConfirm = useCallback(async () => {
    if (isEnding) return
    setIsEnding(true)
    try {
      await endInterviewSession({
        ...session,
        currentQuestionIndex: currentQIndex,
        status: 'COMPLETED',
      })
      setInterviewState(INTERVIEW_STATES.COMPLETED)
      setTimerRunning(false)
      setShowEndModal(false)
      // Navigate to dashboard (future: navigate to review page)
      setTimeout(() => navigate('/dashboard'), 600)
    } catch {
      setIsEnding(false)
    }
  }, [isEnding, session, currentQIndex, navigate])

  // ── Render ─────────────────────────────────────────────────
  const isInitializing = interviewState === INTERVIEW_STATES.INITIALIZING

  return (
    <div className="interview-page">
      <div className="interview-frame">
        {/* ── Header ──────────────────────────────────────── */}
        <header className="interview-header">
          <InterviewerBadge interviewer={session.interviewer} />
          <SessionTimer duration={session.duration} isRunning={timerRunning} />
        </header>

        {/* ── Main Stage ──────────────────────────────────── */}
        <main className="interview-stage">
          <AIOrb state={interviewState} audioLevel={mockAudioLevel} />
          {!isInitializing && (
            <InterviewQuestionCard
              question={currentQuestion.text}
            />
          )}
        </main>

        {/* ── Bottom Controls ─────────────────────────────── */}
        <footer className="interview-bottom">
          <InterviewStatusIndicator
            state={interviewState}
            interviewerName={session.interviewer.name}
          />

          <div className="interview-controls">
            {isSaving ? (
              <div className="saving-indicator">
                <span className="saving-spinner" />
                Saving…
              </div>
            ) : (
              <button
                className="save-exit-btn"
                onClick={handleSaveExit}
                disabled={isSaving || isInitializing}
                type="button"
                aria-label="Save progress and exit interview"
              >
                Save & Exit
              </button>
            )}

            <button
              className="end-session-btn"
              onClick={() => setShowEndModal(true)}
              disabled={isInitializing}
              type="button"
              aria-label="End interview session"
            >
              <span className="end-session-dot" aria-hidden="true" />
              END SESSION
            </button>
          </div>
        </footer>

        {/* ── Initialization Overlay ──────────────────────── */}
        {isInitializing && (
          <div className="interview-init-overlay" role="status" aria-label="Preparing interview">
            <AIOrb state={INTERVIEW_STATES.INITIALIZING} />
            <p className="init-text">Preparing your interview…</p>
            <div className="init-dots" aria-hidden="true">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      {/* ── End Session Modal ─────────────────────────────── */}
      {showEndModal && (
        <EndSessionModal
          onCancel={() => setShowEndModal(false)}
          onConfirm={handleEndConfirm}
          isEnding={isEnding}
        />
      )}
    </div>
  )
}
