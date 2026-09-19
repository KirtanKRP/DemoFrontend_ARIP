import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../dashboard.css'
import '../laptop.css'
import Sidebar from '../components/Sidebar'
import { getStoredUser, currentMockUser, mockHistory } from '../data/mockData'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7z"/>,
    history: <><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5M12 7v5l3 2"/></>,
    file: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/></>,
    chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>,
    award: <><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.11"/></>,
    user: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    arrowRight: <path d="M5 12h14M12 5l7 7-7 7"/>
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function Swoop(){ return <svg className="swoop" viewBox="0 0 80 50" aria-hidden="true"><path d="M7 42C28 10 42 13 55 5M27 45c19-5 33-3 48 0"/></svg> }

export default function Overview() {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => getStoredUser() || currentMockUser)

  useEffect(() => {
    const syncUser = () => {
      setUser(getStoredUser() || currentMockUser)
    }
    window.addEventListener('preptalk_user_updated', syncUser)
    return () => window.removeEventListener('preptalk_user_updated', syncUser)
  }, [])

  const safeUser = user || currentMockUser

  return (
    <div className="dashboard-shell">
      <Sidebar active="Overview" />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="page-heading">
            <p>DASHBOARD OVERVIEW</p>
            <h1>Welcome, {safeUser.name || 'Candidate'} <Swoop/></h1>
            <span>Ready for your next mock interview? Track your progress and jump right back into practice.</span>
          </header>

          {/* Quick Launch Banner */}
          <div
            className="setup-card"
            style={{
              background: 'linear-gradient(135deg, #090a12, #181926)',
              color: '#ffffff',
              padding: '32px 36px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '22px',
              marginBottom: '28px',
              boxShadow: '0 16px 40px rgba(9, 10, 18, 0.25)'
            }}
          >
            <div>
              <span className="topic-tag" style={{ background: '#2a2b3d', color: '#a78bfa', fontSize: '12px', padding: '4px 12px' }}>
                AI VOICE INTERVIEW READY
              </span>
              <h2 style={{ font: '600 32px/1.1 "Bodoni Moda", Georgia, serif', margin: '12px 0 6px', color: '#ffffff' }}>
                Start a New AI Practice Session
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0, maxWidth: '480px' }}>
                Targeting <strong>{safeUser.role || 'Senior Software Engineer'}</strong>. Upload your latest resume or set up focus topics to generate tailored interview questions.
              </p>
            </div>
            <button
              className="black-button"
              style={{ background: '#ffffff', color: '#090a12', fontSize: '15px', height: '52px', padding: '0 28px' }}
              onClick={() => navigate('/interview/new')}
            >
              <Icon name="bolt" size={20} />
              Start Interview
            </button>
          </div>

          {/* Key Metrics Row */}
          <div className="history-stats-row">
            <div className="stat-card">
              <span className="stat-card-icon"><Icon name="award" size={24} /></span>
              <div>
                <b>88%</b>
                <small>Overall Readiness Score</small>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-card-icon"><Icon name="history" size={24} /></span>
              <div>
                <b>14 Sessions</b>
                <small>Interviews Practiced</small>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-card-icon"><Icon name="chart" size={24} /></span>
              <div>
                <b>7.5 Hours</b>
                <small>Voice Practice Time</small>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-card-icon"><Icon name="user" size={24} /></span>
              <div>
                <b style={{ fontSize: '18px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', wordBreak: 'break-word', lineHeight: 1.2 }}>{safeUser.role || 'Software Eng'}</b>
                <small>Active Target Role</small>
              </div>
            </div>
          </div>

          {/* Recent History Preview */}
          <div style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ font: '600 26px "Bodoni Moda", Georgia, serif', margin: 0, color: '#0f172a' }}>
                Recent Mock Interviews
              </h2>
              <button
                onClick={() => navigate('/history')}
                style={{ background: 'none', border: 0, color: '#6023e2', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                View All History <Icon name="arrowRight" size={16} />
              </button>
            </div>

            <div className="history-list">
              {mockHistory.slice(0, 3).map(item => (
                <div key={item.id} className="history-item-card">
                  <div className="history-role-info">
                    <h3>{item.role}</h3>
                    <div className="topic-tags">
                      {item.topics.map(t => (
                        <span key={t} className="topic-tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="resume-badge">
                      <Icon name="file" size={16} />
                      <span>{item.resumeName}</span>
                    </div>
                  </div>

                  <div className="date-column">
                    <span>{item.formattedDate}</span>
                    <small>{item.duration}</small>
                  </div>

                  <div>
                    <span className={`score-badge ${item.score >= 88 ? 'high' : 'mid'}`}>
                      {item.score}% Excellent
                    </span>
                  </div>

                  <div>
                    <button className="action-btn" onClick={() => navigate('/history')}>
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
