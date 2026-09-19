import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Overview from './pages/Overview'
import InterviewDashboard from './pages/InterviewDashboard'
import History from './pages/History'
import Settings from './pages/Settings'
import InterviewLive from './pages/InterviewLive'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Overview />} />
        <Route path="/interview/new" element={<InterviewDashboard />} />
        <Route path="/interview/live" element={<InterviewLive />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
