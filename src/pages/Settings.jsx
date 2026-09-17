import { useState } from 'react'
import '../dashboard.css'
import '../laptop.css'
import Sidebar from '../components/Sidebar'
import { getStoredUser, saveStoredUser, currentMockUser } from '../data/mockData'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    user: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    file: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/></>,
    check: <path d="M20 6L9 17l-5-5"/>,
    alert: <><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></>
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export default function Settings() {
  const user = getStoredUser() || currentMockUser
  const [form, setForm] = useState({
    name: user?.name || 'Kirtan Patel',
    email: user?.email || 'kirtan1999@gmail.com',
    role: user?.role || 'Senior Software Engineer',
    language: user?.language || 'English',
    notifications: user?.notifications !== undefined ? user.notifications : true
  })

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleSaveClick = (e) => {
    e.preventDefault()
    setShowConfirmModal(true)
  }

  const confirmAndSave = () => {
    const updatedUser = {
      ...user,
      name: form.name,
      email: form.email,
      role: form.role,
      language: form.language,
      notifications: form.notifications,
      avatar: (form.name ? form.name.trim()[0] : 'K')?.toUpperCase() || 'K'
    }
    
    saveStoredUser(updatedUser)
    setShowConfirmModal(false)
    setToastMessage('Settings saved successfully! Side menu and profile updated.')

    setTimeout(() => {
      setToastMessage('')
    }, 4000)
  }

  const field = (label, key, icon, type = 'text') => (
    <label className="manual-field">
      {label}
      <span>
        <Icon name={icon} />
        <input
          value={form[key]}
          onChange={e => setForm({ ...form, [key]: e.target.value })}
          type={type}
        />
      </span>
    </label>
  )

  return (
    <div className="dashboard-shell">
      <Sidebar active="Settings" />
      <main className="dashboard-main">
        <div className="dashboard-content" style={{ maxWidth: '820px', paddingRight: '40px' }}>
          <header className="page-heading">
            <p>ACCOUNT PREFERENCES</p>
            <h1>Settings</h1>
            <span>Manage your personal profile, preferences, and account settings.</span>
          </header>

          {toastMessage && (
            <div className="settings-toast" role="status">
              <Icon name="check" size={20} />
              <span>{toastMessage}</span>
            </div>
          )}

          <section className="setup-card" style={{ marginTop: '20px', padding: '35px' }}>
            <h2 className="manual-heading-title" style={{ fontSize: '24px', marginBottom: '8px' }}>Personal Profile</h2>
            <p style={{ color: 'var(--dash-muted)', fontSize: '15px', marginBottom: '25px' }}>Update your basic account & role information.</p>
            
            <div className="fields-grid" style={{ gap: '20px', marginBottom: '35px' }}>
              {field('Full Name', 'name', 'user')}
              {field('Email Address', 'email', 'file', 'email')}
              {field('Target Job Role', 'role', 'user')}
            </div>

            <hr style={{ border: 0, borderTop: '1px solid #eeedf0', margin: '0 0 35px' }} />

            <h2 className="manual-heading-title" style={{ fontSize: '24px', marginBottom: '8px' }}>App Preferences</h2>
            <p style={{ color: 'var(--dash-muted)', fontSize: '15px', marginBottom: '25px' }}>Customize how PrepTalk works for you across all sessions.</p>

            <div className="fields-grid" style={{ gap: '20px', marginBottom: '35px' }}>
              <label className="manual-field">
                Display Language
                <span>
                  <Icon name="globe" />
                  <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })}>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Gujarati</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </span>
              </label>
            </div>

            <label className="report-toggle" style={{ marginBottom: '35px' }}>
              <span>
                <Icon name="bell" />
                <b>Email Notifications</b>
                <small>Receive updates about new mock interview features and your weekly progress reports.</small>
              </span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={form.notifications}
                  onChange={e => setForm({ ...form, notifications: e.target.checked })}
                />
                <em style={{ marginLeft: '10px', fontSize: '12px', fontStyle: 'normal', color: '#626b85' }}>Enable notifications</em>
              </div>
            </label>

            <hr style={{ border: 0, borderTop: '1px solid #eeedf0', margin: '0 0 35px' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button style={{ background: 'none', border: 0, color: '#e53e33', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Delete Account</button>
              <button className="black-button" onClick={handleSaveClick}>Save Changes</button>
            </div>
          </section>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="round-icon"><Icon name="alert" size={26} /></span>
              <div>
                <h3>Confirm Profile Changes</h3>
                <p>Are you sure you want to update your account settings?</p>
              </div>
            </div>

            <div className="modal-preview-box">
              <div className="modal-preview-row">
                <span>Full Name:</span>
                <strong>{form.name}</strong>
              </div>
              <div className="modal-preview-row">
                <span>Email:</span>
                <strong>{form.email}</strong>
              </div>
              <div className="modal-preview-row">
                <span>Target Role:</span>
                <strong>{form.role}</strong>
              </div>
              <div className="modal-preview-row">
                <span>Language:</span>
                <strong>{form.language}</strong>
              </div>
              <div className="modal-preview-row">
                <span>Notifications:</span>
                <strong>{form.notifications ? 'Enabled' : 'Disabled'}</strong>
              </div>
            </div>

            <div className="modal-actions-row">
              <button className="cancel-button" onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button className="confirm-button" onClick={confirmAndSave}>Confirm & Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
