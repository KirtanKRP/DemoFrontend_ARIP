const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const footerLinks = {
  Product: [
    { label: 'Features', id: 'features' },
    { label: 'How it works', id: 'how' },
    { label: 'Interview prep', id: 'interview-prep' },
    { label: 'Pricing', id: 'pricing' },
  ],
  Resources: [
    { label: 'Interview guides', id: 'resources' },
    { label: 'Preparation', id: 'resources' },
    { label: 'Resources', id: 'resources' },
  ],
  Company: [
    { label: 'About', id: null },
    { label: 'Contact', id: null },
  ],
  Legal: [
    { label: 'Privacy', id: null },
    { label: 'Terms', id: null },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer-inner shell">

        {/* Brand column */}
        <div className="site-footer-brand">
          <button
            className="site-footer-wordmark"
            onClick={() => scrollTo('top')}
            aria-label="Back to top"
          >
            <span className="site-footer-mark" aria-hidden="true">
              <i /><i /><i />
            </span>
            PrepTalk
          </button>
          <p className="site-footer-tagline">Interview readiness, practiced.</p>
        </div>

        {/* Link columns */}
        <nav className="site-footer-nav" aria-label="Footer navigation">
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="site-footer-col">
              <p className="site-footer-col-heading">{group}</p>
              <ul>
                {links.map(({ label, id }) => (
                  <li key={label}>
                    {id ? (
                      <button
                        className="site-footer-link"
                        onClick={() => scrollTo(id)}
                      >
                        {label}
                      </button>
                    ) : (
                      <span className="site-footer-link site-footer-link--muted">{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

      </div>

      {/* Bottom bar */}
      <div className="site-footer-bar">
        <div className="site-footer-bar-inner shell">
          <span className="site-footer-pt" aria-hidden="true">PT.</span>
          <p className="site-footer-copy">© {year} PrepTalk</p>
          <button
            className="site-footer-top"
            onClick={() => scrollTo('top')}
            aria-label="Back to top"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
