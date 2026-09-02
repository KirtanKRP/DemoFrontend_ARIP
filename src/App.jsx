import { useEffect, useRef, useState } from 'react'

const Arrow = () => <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" /></svg>
const Spark = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c.7 5.9 3.6 8.8 9.5 9.5-5.9.7-8.8 3.6-9.5 9.5-.7-5.9-3.6-8.8-9.5-9.5 5.9-.7 8.8-3.6 9.5-9.5Z" /></svg>

function InterviewCard() {
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return <main>
    <nav className="nav shell">
      <button className="wordmark" onClick={() => scrollTo('top')} aria-label="PrepTalk home">PT<span>.</span></button>
      <div className="nav-center">PrepTalk</div>
      <div className="nav-actions">
        <button className="text-link" onClick={() => scrollTo('how')}>How it works</button>
        <button className="pill dark" onClick={() => scrollTo('start')}>Start practicing <Arrow /></button>
      </div>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen ? '×' : '≡'}</button>
      {menuOpen && <div className="mobile-menu"><button onClick={() => scrollTo('how')}>How it works</button><button onClick={() => scrollTo('start')}>Start practicing</button></div>}
    </nav>

    <section className="hero grid-bg" id="top">
      <div className="shell hero-copy">
        <p className="script">Speak with clarity.</p>
        <h1>Practice the moment<br />that matters.</h1>
        <p className="lede">Resume-aware, voice-first mock interviews that help you find your words before the real room.</p>
        <div className="hero-actions"><button className="pill dark" onClick={() => scrollTo('start')}>Try a practice round <Arrow /></button><button className="pill light" onClick={() => scrollTo('how')}>See how it works</button></div>
      </div>
      <InterviewCard />
    </section>

    <section className="statement shell" id="how">
      <div><p className="script">A better rehearsal.</p><h2>Not another chatbot.</h2></div>
      <p>PrepTalk brings the full interview lifecycle into one focused place: your resume, your target role, a real voice conversation, clear feedback, and proof that you’re getting better.</p>
    </section>

    <section className="scroll-story" id="start">
      <div className="shell story-inner">
        <div className="story-copy"><p className="eyebrow">Built for the whole practice loop</p><h2>Every session moves you forward.</h2><p>Choose your role, speak naturally, and leave with something useful—not just another list of questions.</p><button className="pill dark">Build my first session <Arrow /></button></div>
        <div className="stack" aria-label="Interview practice flow">
          <article className="stack-card card-resume"><span>01</span><h3>Your resume</h3><p>Questions grounded in the work you’ve actually done.</p><div className="resume-lines"><i /><i /><i /></div></article>
          <article className="stack-card card-voice"><span>02</span><h3>Your voice</h3><p>A calm, structured interview that listens.</p><div className="mini-wave">|||||||||</div></article>
          <article className="stack-card card-report"><span>03</span><h3>Your next step</h3><p>Feedback that makes the next answer sharper.</p><div className="report-score">82 <small>clarity</small></div></article>
        </div>
      </div>
    </section>

    <section className="future shell">
      <p className="eyebrow">Designed to grow with you</p>
      <div className="future-grid"><h2>From first placement<br />to every next room.</h2><p>Start with campus placements. Grow into technical, HR, managerial, scholarship, and admissions interviews—without changing the practice habit that got you there.</p></div>
    </section>
    <footer className="footer shell"><span>PT.</span><p>Interview readiness, practiced.</p><button className="text-link" onClick={() => scrollTo('top')}>Back to top ↑</button></footer>
  </main>
}

export default App
