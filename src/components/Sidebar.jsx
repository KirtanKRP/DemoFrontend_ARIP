import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getStoredUser, currentMockUser } from '../data/mockData'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    home: <><path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-6h6v6"/></>,
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7z"/>,
    history: <><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5M12 7v5l3 2"/></>,
    gear: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>,
    logout: <><path d="M14 3h5v18h-5M10 17l4-5-4-5M14 12H3"/></>
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function Wordmark() {
  return (
    <div className="dash-wordmark">
      <span className="dash-mark"><i/><i/><i/></span>
      <b>PrepTalk</b>
    </div>
  )
}

export default function Sidebar({ active: activeProp }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(() => getStoredUser() || currentMockUser)

  useEffect(() => {
    const syncUser = () => {
      setUser(getStoredUser() || currentMockUser)
    }
    window.addEventListener('preptalk_user_updated', syncUser)
    window.addEventListener('storage', syncUser)
    return () => {
      window.removeEventListener('preptalk_user_updated', syncUser)
      window.removeEventListener('storage', syncUser)
    }
  }, [])

  const navItems = [
    { label: 'Overview', icon: 'home', path: '/dashboard' },
    { label: 'Start Interview', icon: 'bolt', path: '/interview/new' },
    { label: 'History', icon: 'history', path: '/history' }
  ]

  const currentPath = location.pathname

  const isNavActive = (path, label) => {
    if (activeProp) return activeProp === label
    if (path === '/dashboard' && (currentPath === '/dashboard' || currentPath === '/')) return true
    return currentPath === path
  }

  const isSettingsActive = activeProp ? activeProp === 'Settings' : currentPath === '/settings'

  const safeUser = user || currentMockUser
  const avatarChar = (safeUser.name ? safeUser.name.trim()[0] : 'K').toUpperCase()

  return (
    <aside className="sidebar">
      <Wordmark />
      <div className="sidebar-user">
        <span>{safeUser.avatar || avatarChar}</span>
        <div>
          <b>{safeUser.name || 'Kirtan Patel'}</b>
          <small>{safeUser.email || 'kirtan1999@gmail.com'}</small>
        </div>
      </div>
      
      <nav className="side-nav">
        <p>MAIN</p>
        {navItems.map(({ label, icon, path }) => {
          const active = isNavActive(path, label)
          return (
            <button
              key={label}
              className={active ? 'active' : ''}
              onClick={() => navigate(path)}
            >
              <span><Icon name={icon} /></span>
              {label}
            </button>
          )
        })}

        <p>ACCOUNT</p>
        <button
          className={isSettingsActive ? 'active' : ''}
          onClick={() => navigate('/settings')}
        >
          <span><Icon name="gear" /></span>
          Settings
        </button>
      </nav>

      <div className="sidebar-bottom">
        <button className="logout" onClick={() => navigate('/login')}>
          <Icon name="logout" />Logout
        </button>
        <div className="side-script">
          Better<br/>Conversations<br/>A Brighter You
          <svg viewBox="0 0 140 22"><path d="M4 14C44 3 77 21 136 5"/></svg>
        </div>
      </div>
    </aside>
  )
}
