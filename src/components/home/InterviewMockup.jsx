import { useEffect, useRef } from 'react'

function SophiaAvatar() {
  return <svg viewBox="0 0 40 40" className="profile-img" role="img" aria-label="Sophia"><rect width="40" height="40" rx="20" fill="#c88e70" /><path d="M6 36c2-8 7-12 14-12s12 4 14 12" fill="#f3d2bf" /><ellipse cx="20" cy="17" rx="8" ry="10" fill="#f3d2bf" /><path d="M12 18c-1-8 4-13 10-13 7 0 10 6 8 14-2-4-5-6-10-6-3 0-6 2-8 5Z" fill="#2d2527" /><path d="M15 18h3m4 0h3" stroke="#3b2928" strokeWidth="1.1" strokeLinecap="round" /><path d="M18 23c1.2.8 2.7.8 4 0" stroke="#b76561" strokeWidth="1" fill="none" strokeLinecap="round" /></svg>
}

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
    return () => { window.removeEventListener('scroll', updateCard); window.removeEventListener('resize', updateCard) }
  }, [])

  return (
    <div className="new-card-scene" ref={cardRef}>
      <article className="new-interview-card">
        <div className="new-card-header"><div className="interviewer-profile"><SophiaAvatar /><div className="profile-text"><span className="profile-name">Sophia</span><span className="profile-role">AI INTERVIEWER</span></div></div><div className="timer-pill">10:00</div></div>
        <div className="new-card-body"><div className="orb-container"><div className="magic-orb">{[[25, 25], [40, 20], [55, 30], [45, 55], [70, 45], [60, 70], [30, 60]].map(([top, left]) => <i className="orb-sparkle" style={{ top: `${top}%`, left: `${left}%` }} key={`${top}-${left}`} />)}</div></div><div className="question-box"><div className="question-label"><span className="dot" />CURRENT QUESTION</div><p className="question-text">Great to have you here. Let's start with floide.js. Can you explain the difference between synchronous and asynchronous programming in that context?</p></div></div>
        <div className="new-card-footer"><button className="status-pill"><span className="status-icon"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12 2.5c.7 5.9 3.6 8.8 9.5 9.5-5.9.7-8.8 3.6-9.5 9.5-.7-5.9-3.6-8.8-9.5-9.5 5.9-.7 8.8-3.6 9.5-9.5Z" /></svg></span>SOPHIA SPEAKING</button><button className="end-btn"><span className="stop-icon" />END SESSION</button></div>
      </article>
    </div>
  )
}
