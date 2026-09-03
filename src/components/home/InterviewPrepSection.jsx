const interviewTypes = [
  {
    id: 'campus',
    label: 'Campus / Placement',
    desc: 'Practice for the rounds that get you through the gate—aptitude, GDs, HR, and technical panels.',
    size: 'large',
  },
  {
    id: 'technical',
    label: 'Technical',
    desc: 'Code walkthroughs, system design, and the why behind every answer.',
    size: 'small',
  },
  {
    id: 'hr',
    label: 'HR / Behavioral',
    desc: 'Structured answers to the questions that never go away.',
    size: 'small',
  },
  {
    id: 'managerial',
    label: 'Managerial',
    desc: 'Leadership, ownership, and decision-making under pressure.',
    size: 'small',
  },
  {
    id: 'scholarship',
    label: 'Scholarship',
    desc: 'Articulate your goals, your record, and your case clearly.',
    size: 'small',
  },
  {
    id: 'admissions',
    label: 'Admissions',
    desc: 'From undergrad to post-grad—practice until the story is tight.',
    size: 'small',
  },
]

export default function InterviewPrepSection() {
  return (
    <section className="prep-section" id="interview-prep" aria-labelledby="prep-heading">
      <div className="shell">

        <header className="prep-header">
          <p className="eyebrow prep-eyebrow">Interview prep</p>
          <h2 className="prep-heading" id="prep-heading">
            Every interview is different.<br />
            Your practice should be too.
          </h2>
        </header>

        <div className="prep-composition">

          {/* Primary large card */}
          <article className="prep-card prep-card--primary" data-type="campus">
            <div className="prep-card-content">
              <span className="prep-card-label">Campus / Placement</span>
              <h3 className="prep-card-title">
                Practice for the rounds that get you through the gate.
              </h3>
              <p className="prep-card-desc">
                Aptitude rounds, group discussions, HR panels, and technical interviews — PrepTalk covers the full placement cycle. Start here, then build out.
              </p>
            </div>
            <div className="prep-card-tag" aria-hidden="true">Most popular</div>
          </article>

          {/* Secondary grid */}
          <div className="prep-secondary-grid">
            {interviewTypes.slice(1).map((type) => (
              <article key={type.id} className="prep-card prep-card--secondary" data-type={type.id}>
                <span className="prep-card-label">{type.label}</span>
                <p className="prep-card-desc">{type.desc}</p>
                <span className="prep-card-arrow" aria-hidden="true">→</span>
              </article>
            ))}
          </div>

        </div>

        <p className="prep-closing">
          From your first placement to every next room.
        </p>

      </div>
    </section>
  )
}
