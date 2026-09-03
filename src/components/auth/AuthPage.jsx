import { useNavigate } from 'react-router-dom'
import AuthDots from './AuthDots'
import AuthForm from './AuthForm'

/* Reuses the same wordmark visual treatment as HomeHero,
   but fully independent from .preptalk-home-hero classes */
function AuthWordmark() {
  const navigate = useNavigate()
  return (
    <button
      className="auth-wordmark"
      onClick={() => navigate('/')}
      aria-label="PrepTalk — go to home"
    >
      <span className="auth-wm-mark" aria-hidden="true">
        <i /><i /><i />
      </span>
      PrepTalk
    </button>
  )
}

export default function AuthPage({ mode }) {
  const navigate = useNavigate()

  const switchMode = () =>
    navigate(mode === 'login' ? '/signup' : '/login', { replace: true })

  return (
    <div className="auth-page" data-mode={mode}>

      {/* Top nav — wordmark only */}
      <nav className="auth-nav" aria-label="Authentication navigation">
        <AuthWordmark />
      </nav>

      {/* Two-column body */}
      <div className="auth-shell">

        {/* ── LEFT — editorial brand side ─────────────────── */}
        <div className="auth-editorial" aria-label="PrepTalk brand statement">
          {/* Dots live behind editorial content */}
          <AuthDots />

          <span className="auth-editorial-eyebrow" aria-hidden="true">
            Speak with clarity.
          </span>

          <h1 className="auth-editorial-headline">
            Practice the<br />
            moment that<br />
            matters.
          </h1>

          <p className="auth-editorial-tagline">
            Interview readiness, practiced.
          </p>
        </div>

        {/* ── RIGHT — authentication form ──────────────────── */}
        <div className="auth-form-panel">
          <div
            className="auth-form-surface"
            role="main"
            aria-label={mode === 'login' ? 'Log in to PrepTalk' : 'Create a PrepTalk account'}
          >
            <AuthForm mode={mode} onSwitch={switchMode} />
          </div>
        </div>

      </div>
    </div>
  )
}
