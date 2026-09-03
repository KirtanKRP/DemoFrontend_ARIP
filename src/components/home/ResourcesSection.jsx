const resources = [
  {
    id: 'r1',
    category: 'Answer frameworks',
    title: 'How to structure any behavioral answer.',
    desc: 'STAR, SOAR, and when to abandon the formula entirely. A practical guide to answering questions that ask you to "tell me about a time…"',
  },
  {
    id: 'r2',
    category: 'Technical interview prep',
    title: 'Talking through your code under pressure.',
    desc: 'The skill isn\'t just getting the answer—it\'s explaining your thinking as you work. What good technical communication actually sounds like.',
  },
  {
    id: 'r3',
    category: 'Interview preparation',
    title: 'The week before: a preparation checklist.',
    desc: 'What to prepare, what to research, and what to stop worrying about. A focused approach to the days leading up to a high-stakes interview.',
  },
]

export default function ResourcesSection() {
  return (
    <section className="res-section" id="resources" aria-labelledby="res-heading">
      <div className="shell">

        <header className="res-header">
          <p className="eyebrow res-eyebrow">Resources</p>
          <h2 className="res-heading" id="res-heading">
            Worth reading<br />before you practice.
          </h2>
        </header>

        <ol className="res-list" aria-label="Featured resources">
          {resources.map((item, idx) => (
            <li key={item.id} className="res-item" data-index={String(idx + 1).padStart(2, '0')}>
              <div className="res-item-inner">
                <div className="res-item-meta">
                  <span className="res-item-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="res-item-category">{item.category}</span>
                </div>
                <div className="res-item-body">
                  <h3 className="res-item-title">{item.title}</h3>
                  <p className="res-item-desc">{item.desc}</p>
                </div>
                <div className="res-item-action" aria-hidden="true">
                  <span className="res-arrow">→</span>
                </div>
              </div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  )
}
