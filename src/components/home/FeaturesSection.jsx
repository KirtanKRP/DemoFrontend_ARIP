export default function FeaturesSection() {
  return (
    <section className="feat-section" id="features" aria-labelledby="feat-heading">
      <div className="feat-shell shell">

        {/* Header row */}
        <header className="feat-header">
          <p className="feat-eyebrow eyebrow">Everything you need to practice properly</p>
          <h2 className="feat-heading" id="feat-heading">
            Your interview.<br />
            Not a random<br />
            question set.
          </h2>
          <p className="feat-sub">
            PrepTalk builds your session from your resume and the role you're targeting—so every question is grounded in context that actually matters.
          </p>
        </header>

        {/* Primary composition */}
        <div className="feat-composition" aria-label="Feature overview">

          {/* Large primary card */}
          <article className="feat-card feat-card--primary" data-feat="personalization">
            <div className="feat-card-inner">
              <div className="feat-flow-diagram" aria-hidden="true">
                <div className="feat-flow-source">
                  <span className="feat-flow-chip">Resume</span>
                  <span className="feat-flow-chip">Job description</span>
                </div>
                <div className="feat-flow-arrow">
                  <span className="feat-flow-line" />
                  <span className="feat-flow-label">generates</span>
                </div>
                <div className="feat-flow-output">
                  <span className="feat-flow-output-text">Personalised interview</span>
                </div>
              </div>
              <div className="feat-card-copy">
                <h3 className="feat-card-title">Built around you, not a template.</h3>
                <p className="feat-card-desc">
                  Upload your resume, paste a job description, pick an interview type. PrepTalk generates questions that reflect the actual role—not a generic question bank.
                </p>
              </div>
            </div>
          </article>

          {/* Right column: 2 supporting cards + label list */}
          <div className="feat-aside">

            <article className="feat-card feat-card--secondary" data-feat="voice">
              <div className="feat-card-num">02</div>
              <h3 className="feat-card-title">Real voice. Real pressure.</h3>
              <p className="feat-card-desc">
                Speak your answers aloud. PrepTalk listens and responds like a real interviewer—no typing, no scripts.
              </p>
              <div className="feat-voice-indicator" aria-hidden="true">
                <span className="feat-voice-bar" style={{ '--h': '14px' }} />
                <span className="feat-voice-bar" style={{ '--h': '22px' }} />
                <span className="feat-voice-bar" style={{ '--h': '9px' }} />
                <span className="feat-voice-bar" style={{ '--h': '18px' }} />
                <span className="feat-voice-bar" style={{ '--h': '12px' }} />
                <span className="feat-voice-bar" style={{ '--h': '25px' }} />
                <span className="feat-voice-bar" style={{ '--h': '8px' }} />
              </div>
            </article>

            <article className="feat-card feat-card--secondary" data-feat="feedback">
              <div className="feat-card-num">03</div>
              <h3 className="feat-card-title">Feedback that's actually useful.</h3>
              <p className="feat-card-desc">
                After every session, you get a clear evaluation—not just a score. Understand what worked and what to sharpen.
              </p>
              <div className="feat-score-preview" aria-hidden="true">
                <span className="feat-score-num">82</span>
                <span className="feat-score-label">clarity</span>
              </div>
            </article>

            {/* Small supporting labels */}
            <ul className="feat-label-list" aria-label="Additional features">
              <li className="feat-label-item">
                <span className="feat-label-dot" aria-hidden="true" />
                Configurable interview length &amp; difficulty
              </li>
              <li className="feat-label-item">
                <span className="feat-label-dot" aria-hidden="true" />
                Session history &amp; progress tracking
              </li>
              <li className="feat-label-item">
                <span className="feat-label-dot" aria-hidden="true" />
                All interview types supported
              </li>
            </ul>

          </div>
        </div>

      </div>
    </section>
  )
}
