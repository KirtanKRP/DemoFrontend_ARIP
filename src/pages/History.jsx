import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import '../dashboard.css'
import '../laptop.css'
import Sidebar from '../components/Sidebar'
import { mockHistory } from '../data/mockData'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    search: <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>,
    file: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>,
    check: <path d="M20 6L9 17l-5-5"/>,
    award: <><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.11"/></>,
    layers: <><path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></>,
    arrowRight: <path d="M5 12h14M12 5l7 7-7 7"/>,
    x: <path d="M18 6 6 18M6 6l12 12"/>
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export default function History() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSession, setSelectedSession] = useState(null)

  const categories = ['All', 'Frontend', 'Full Stack', 'System Design', 'Mobile']

  const filteredHistory = useMemo(() => {
    return mockHistory.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
      const query = searchTerm.toLowerCase()
      const matchesSearch =
        item.role.toLowerCase().includes(query) ||
        item.resumeName.toLowerCase().includes(query) ||
        item.topics.some(t => t.toLowerCase().includes(query))
      return matchesCategory && matchesSearch
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="dashboard-shell">
      <Sidebar active="History" />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="page-heading">
            <p>PAST MOCK SESSIONS</p>
            <h1>Interview History</h1>
            <span>Review your past performance, AI feedback reports, questions asked, and linked resumes.</span>
          </header>

          {/* Stats Summary Cards */}
          <div className="history-stats-row">
            <div className="stat-card">
              <span className="stat-card-icon"><Icon name="layers" size={24} /></span>
              <div>
                <b>14 Sessions</b>
                <small>Total Completed</small>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-card-icon"><Icon name="award" size={24} /></span>
              <div>
                <b>88% Avg</b>
                <small>Performance Score</small>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-card-icon"><Icon name="clock" size={24} /></span>
              <div>
                <b>7.5 Hours</b>
                <small>Total Practice Time</small>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-card-icon"><Icon name="file" size={24} /></span>
              <div>
                <b>4 Resumes</b>
                <small>Connected & Analyzed</small>
              </div>
            </div>
          </div>

          {/* Controls: Search Bar & Filters */}
          <div className="history-controls">
            <div className="history-search">
              <span className="history-search-icon"><Icon name="search" size={18} /></span>
              <input
                type="text"
                placeholder="Search by role title, resume name, or skill topic..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="history-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* History Item Cards List */}
          <div className="history-list">
            {filteredHistory.length === 0 ? (
              <div className="setup-card" style={{ textAlign: 'center', padding: '50px 20px' }}>
                <h3 style={{ font: '600 24px "Bodoni Moda", Georgia, serif', margin: '0 0 8px' }}>No mock interviews found</h3>
                <p style={{ color: 'var(--dash-muted)', margin: 0 }}>Try clearing your search query or selecting a different category filter.</p>
              </div>
            ) : (
              filteredHistory.map(item => (
                <div key={item.id} className="history-item-card">
                  {/* Column 1: Role & Topics */}
                  <div className="history-role-info">
                    <h3>{item.role}</h3>
                    <div className="topic-tags">
                      {item.topics.map(t => (
                        <span key={t} className="topic-tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Resume Details */}
                  <div>
                    <div className="resume-badge">
                      <Icon name="file" size={16} />
                      <span>{item.resumeName}</span>
                      <span className="resume-match-pill">{item.resumeMatchScore}</span>
                    </div>
                  </div>

                  {/* Column 3: Date & Time */}
                  <div className="date-column">
                    <span>{item.formattedDate}</span>
                    <small>Duration: {item.duration}</small>
                  </div>

                  {/* Column 4: Score */}
                  <div>
                    <span className={`score-badge ${item.score >= 88 ? 'high' : 'mid'}`}>
                      <Icon name="chart" size={16} />
                      {item.score}% {item.score >= 88 ? 'Excellent' : 'Good'}
                    </span>
                  </div>

                  {/* Column 5: Action Button */}
                  <div>
                    <button className="action-btn" onClick={() => setSelectedSession(item)}>
                      View Report
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Session Details Modal */}
      {selectedSession && (
        <div className="modal-overlay" onClick={() => setSelectedSession(null)}>
          <div className="modal-card" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="topic-tag" style={{ background: '#efe6ff', color: '#6023e2', fontSize: '12px' }}>
                  {selectedSession.category} • {selectedSession.difficulty}
                </span>
                <h2 style={{ font: '600 28px/1.1 "Bodoni Moda", Georgia, serif', margin: '8px 0 4px', color: '#0f172a' }}>
                  {selectedSession.role}
                </h2>
                <small style={{ color: 'var(--dash-muted)', fontSize: '13px' }}>
                  {selectedSession.formattedDate} • Duration: {selectedSession.duration}
                </small>
              </div>
              <button
                onClick={() => setSelectedSession(null)}
                style={{ background: 'none', border: 0, cursor: 'pointer', color: '#64748b', padding: '4px' }}
              >
                <Icon name="x" size={24} />
              </button>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px 20px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#334155' }}>
                  <Icon name="file" size={18} />
                  <span>Resume Attached: {selectedSession.resumeName}</span>
                </div>
                <span className={`score-badge ${selectedSession.score >= 88 ? 'high' : 'mid'}`} style={{ padding: '4px 12px', fontSize: '13px' }}>
                  Score: {selectedSession.score}%
                </span>
              </div>
            </div>

            {/* Strengths */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '15px', margin: '0 0 8px', color: '#047857', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon name="check" size={18} /> Key Strengths
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>
                {selectedSession.strengths.map((str, idx) => (
                  <li key={idx}>{str}</li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '15px', margin: '0 0 8px', color: '#b45309' }}>Areas for Growth</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>
                {selectedSession.improvements.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>

            {/* Questions Sample */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '15px', margin: '0 0 10px', color: '#0f172a' }}>Sample Questions & Responses</h4>
              {selectedSession.questions.map((q, idx) => (
                <div key={idx} style={{ background: '#f1f5f9', borderRadius: '10px', padding: '12px 16px', marginBottom: '10px' }}>
                  <b style={{ display: 'block', fontSize: '13px', color: '#1e293b', marginBottom: '4px' }}>Q: {q.q}</b>
                  <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>{q.a}</p>
                </div>
              ))}
            </div>

            <div className="modal-actions-row">
              <button className="cancel-button" onClick={() => setSelectedSession(null)}>
                Close
              </button>
              <button className="confirm-button" onClick={() => { setSelectedSession(null); navigate('/interview/new'); }}>
                Retry Interview <Icon name="arrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
