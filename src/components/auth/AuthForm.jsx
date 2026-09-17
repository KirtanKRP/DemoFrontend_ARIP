import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── Inline SVG icons ──────────────────────────────────────── */
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22"/>
  </svg>
)

const ArrowIcon = () => (
  <svg className="auth-cta-arrow" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"/>
  </svg>
)

/* ── Validation ────────────────────────────────────────────── */
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

function validate(fields, mode) {
  const errors = {}
  if (!fields.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!isValidEmail(fields.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!fields.password) {
    errors.password = 'Please enter your password.'
  } else if (mode === 'signup' && fields.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }
  if (mode === 'signup') {
    if (!fields.name.trim()) errors.name = 'Please enter your full name.'
    if (!fields.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.'
    } else if (fields.password !== fields.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.'
    }
  }
  return errors
}

/* ── Text field ────────────────────────────────────────────── */
function TextField({ id, label, type = 'text', value, onChange, error, errId, placeholder, autoComplete, inputMode }) {
  return (
    <div className="auth-field">
      <label className="auth-label" htmlFor={id}>{label}</label>
      <div className="auth-input-wrap">
        <input
          id={id}
          type={type}
          className="auth-input"
          style={{ paddingRight: '14px' }}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          inputMode={inputMode}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errId : undefined}
        />
      </div>
      {error && <p id={errId} className="auth-field-error" role="alert">{error}</p>}
    </div>
  )
}

/* ── Password field with visibility toggle ─────────────────── */
function PwField({ id, label, value, onChange, error, errId, autoComplete, rightSlot }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="auth-field">
      <div className="auth-field-row">
        <label className="auth-label" htmlFor={id}>{label}</label>
        {rightSlot}
      </div>
      <div className="auth-input-wrap">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className="auth-input"
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errId : undefined}
        />
        <button
          type="button"
          className="auth-pw-toggle"
          onClick={() => setVisible(v => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          tabIndex={0}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {error && <p id={errId} className="auth-field-error" role="alert">{error}</p>}
    </div>
  )
}

/* ── AuthForm ──────────────────────────────────────────────── */
export default function AuthForm({ mode, onSwitch }) {
  const navigate = useNavigate()
  const isLogin = mode === 'login'

  const [fields, setFields] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors]       = useState({})
  const [loading, setLoading]     = useState(false)
  const [forgotMsg, setForgotMsg] = useState(false)

  const set = (key) => (e) => {
    setFields(f => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors(err => { const n = { ...err }; delete n[key]; return n })
  }

  /* ── Submit ──────────────────────────────────────────────── */
  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(fields, mode)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    /*
     * INTEGRATION POINT
     * Replace this block with real auth calls:
     *   login:  POST /api/auth/login  { email, password }
     *   signup: POST /api/auth/signup { name, email, password }
     * On success: navigate('/dashboard') or navigate(location.state?.redirect ?? '/')
     */
    console.info('[PrepTalk Auth] Ready for backend integration.', { mode, email: fields.email })
    setTimeout(() => {
      localStorage.setItem('preptalk_user', JSON.stringify({
        name: fields.name || fields.email.split('@')[0],
        email: fields.email,
        avatar: (fields.name || fields.email)[0].toLowerCase()
      }))
      setLoading(false); navigate('/interview/new')
    }, 650)
  }

  /* ── Google ──────────────────────────────────────────────── */
  const handleGoogle = () => {
    /*
     * INTEGRATION POINT — connect Google OAuth here.
     * e.g. signInWithPopup(auth, googleProvider)
     */
    navigate('/interview/new')
  }

  /* ── Forgot password ─────────────────────────────────────── */
  const handleForgot = (e) => {
    e.preventDefault()
    setForgotMsg(true)
  }

  return (
    <>
      <h2 className="auth-form-heading">
        {isLogin ? 'Welcome back.' : 'Start practicing.'}
      </h2>
      <p className="auth-form-subtext">
        {isLogin
          ? 'Pick up where your practice left off.'
          : 'Build the habit before the interview demands it.'}
      </p>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label={isLogin ? 'Log in form' : 'Create account form'}
      >
        {/* Full name — signup only */}
        {!isLogin && (
          <TextField
            id="auth-name"
            label="Full name"
            value={fields.name}
            onChange={set('name')}
            error={errors.name}
            errId="auth-name-err"
            autoComplete="name"
            placeholder="Arjun Mehta"
          />
        )}

        {/* Email */}
        <TextField
          id="auth-email"
          label="Email"
          type="email"
          value={fields.email}
          onChange={set('email')}
          error={errors.email}
          errId="auth-email-err"
          autoComplete="email"
          placeholder="you@example.com"
          inputMode="email"
        />

        {/* Password */}
        <PwField
          id="auth-password"
          label="Password"
          value={fields.password}
          onChange={set('password')}
          error={errors.password}
          errId="auth-pw-err"
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          rightSlot={isLogin && (
            <button
              type="button"
              className="auth-forgot"
              onClick={handleForgot}
              aria-label="Forgot your password?"
            >
              Forgot password?
            </button>
          )}
        />

        {/* Forgot password notice */}
        {forgotMsg && isLogin && (
          <p className="auth-forgot-notice" role="status">
            Password recovery will be available soon.
          </p>
        )}

        {/* Confirm password — signup only */}
        {!isLogin && (
          <PwField
            id="auth-confirm-password"
            label="Confirm password"
            value={fields.confirmPassword}
            onChange={set('confirmPassword')}
            error={errors.confirmPassword}
            errId="auth-confirm-err"
            autoComplete="new-password"
          />
        )}

        {/* Primary CTA */}
        <button
          type="submit"
          className="auth-cta"
          disabled={loading}
          aria-busy={loading}
        >
          <span className="auth-cta-label">
            {loading
              ? (isLogin ? 'Signing in…' : 'Creating account…')
              : (isLogin ? 'Log in' : 'Create account')}
          </span>
          {loading
            ? <span className="auth-spinner" aria-hidden="true" />
            : <ArrowIcon />}
        </button>

        {/* Divider */}
        <div className="auth-divider" role="separator" aria-hidden="true">
          <span className="auth-divider-line" />
          <span className="auth-divider-text">or</span>
          <span className="auth-divider-line" />
        </div>

        {/* Google */}
        <button
          type="button"
          className="auth-google"
          onClick={handleGoogle}
          aria-label="Continue with Google"
        >
          <svg className="auth-google-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Terms — signup only */}
        {!isLogin && (
          <p className="auth-legal">
            By creating an account, you agree to PrepTalk's{' '}
            <button type="button">Terms</button>
            {' '}and{' '}
            <button type="button">Privacy Policy</button>.
          </p>
        )}
      </form>

      {/* Switch link */}
      <p className="auth-switch" style={{ marginTop: '20px' }}>
        {isLogin ? (
          <>Don't have an account?{' '}
            <button className="auth-switch-link" type="button" onClick={onSwitch}>
              Create one →
            </button>
          </>
        ) : (
          <>Already practicing?{' '}
            <button className="auth-switch-link" type="button" onClick={onSwitch}>
              Log in →
            </button>
          </>
        )}
      </p>
    </>
  )
}
