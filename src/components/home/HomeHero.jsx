import { useState } from 'react'
import InterviewMockup from './InterviewMockup'

const Arrow = () => <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" /></svg>

export default function HomeHero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
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
        <InterviewMockup />
      </section>
    </>
  )
}
