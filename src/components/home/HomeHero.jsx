import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InterviewMockup from './InterviewMockup'

const Arrow = () => <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" /></svg>

export default function HomeHero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section className="preptalk-home-hero" id="top">
      <nav className="hero-nav" aria-label="Primary navigation">
        <button className="hero-wordmark" onClick={() => scrollTo('top')} aria-label="PrepTalk home"><span className="wordmark-mark" aria-hidden="true"><i /><i /><i /></span><span>PrepTalk</span></button>
        <div className="hero-nav-links" aria-label="Primary links">
          <button onClick={() => scrollTo('features')}>Features</button>
          <button onClick={() => scrollTo('how')}>How it works</button>
          <button onClick={() => scrollTo('interview-prep')}>Interview prep</button>
          <button onClick={() => scrollTo('pricing')}>Pricing</button>
          <button onClick={() => scrollTo('resources')}>Resources</button>
        </div>
        <div className="hero-nav-action"><button onClick={() => navigate('/login')}>Log in <Arrow /></button></div>
        <button className="hero-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen ? '×' : '≡'}</button>
        {menuOpen && <div className="hero-mobile-menu">
          <button onClick={() => { scrollTo('features'); setMenuOpen(false) }}>Features</button>
          <button onClick={() => { scrollTo('how'); setMenuOpen(false) }}>How it works</button>
          <button onClick={() => { scrollTo('interview-prep'); setMenuOpen(false) }}>Interview prep</button>
          <button onClick={() => { scrollTo('pricing'); setMenuOpen(false) }}>Pricing</button>
          <button onClick={() => { scrollTo('resources'); setMenuOpen(false) }}>Resources</button>
          <button onClick={() => { navigate('/signup'); setMenuOpen(false) }}>Start practicing</button>
        </div>}
      </nav>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-layout"><div className="hero-copy"><p className="script">Speak with clarity.</p><h1>Practice the<br />moment that<br />matters.</h1><div className="hero-actions"><button className="hero-primary-cta" onClick={() => navigate('/signup')}>Start your first interview <Arrow /></button><span className="hero-reassurance"><i aria-hidden="true">✓</i>No credit card required</span></div></div><InterviewMockup /></div>
    </section>
  )
}
