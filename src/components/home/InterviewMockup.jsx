import { useEffect, useRef } from 'react'

export default function InterviewMockup() {
  const cardRef = useRef(null)

  useEffect(() => {
    const updateCard = () => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const viewport = window.innerHeight / 2
      const delta = Math.max(-1, Math.min(1, (center - viewport) / viewport))
      cardRef.current.style.setProperty('--scroll-progress', delta.toFixed(3))
    }
    updateCard()
    window.addEventListener('scroll', updateCard, { passive: true })
    window.addEventListener('resize', updateCard)
    return () => {
      window.removeEventListener('scroll', updateCard)
      window.removeEventListener('resize', updateCard)
    }
  }, [])

  return (
    <div className="new-card-scene" ref={cardRef}>
      <article className="new-interview-card">
        <div className="new-card-header">
          <div className="interviewer-profile">
            <img src="https://ui-avatars.com/api/?name=Sophia&background=random&color=fff&size=150" alt="Sophia" className="profile-img" />
            <div className="profile-text">
              <span className="profile-name">Sophia</span>
              <span className="profile-role">AI INTERVIEWER</span>
            </div>
          </div>
          <div className="timer-pill">10:00</div>
        </div>

        <div className="new-card-body">
          <div className="orb-container">
            <div className="magic-orb">
              <div className="orb-sparkle" style={{ top: '25%', left: '25%' }}></div>
              <div className="orb-sparkle" style={{ top: '40%', left: '20%' }}></div>
              <div className="orb-sparkle" style={{ top: '55%', left: '30%' }}></div>
              <div className="orb-sparkle" style={{ top: '45%', left: '55%' }}></div>
              <div className="orb-sparkle" style={{ top: '70%', left: '45%' }}></div>
              <div className="orb-sparkle" style={{ top: '60%', left: '70%' }}></div>
              <div className="orb-sparkle" style={{ top: '30%', left: '60%' }}></div>
            </div>
          </div>
          <div className="question-box">
            <div className="question-label">
              <span className="dot"></span> CURRENT QUESTION
            </div>
            <p className="question-text">
              Great to have you here. Let's start with floide.js. Can you explain the difference between synchronous and asynchronous programming in that context?
            </p>
          </div>
        </div>

        <div className="new-card-footer">
          <button className="status-pill">
            <span className="status-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2.5c.7 5.9 3.6 8.8 9.5 9.5-5.9.7-8.8 3.6-9.5 9.5-.7-5.9-3.6-8.8-9.5-9.5 5.9-.7 8.8-3.6 9.5-9.5Z" /></svg>
            </span>
            SOPHIA SPEAKING
          </button>
          <button className="end-btn">
            <span className="stop-icon"></span>
            END SESSION
          </button>
        </div>
      </article>
    </div>
  )
}
