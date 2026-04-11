import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Experiences from './pages/Experiences'
import Formations from './pages/Formations'
import Skills from './pages/Skills'
import Languages from './pages/Languages'
import JobOffers from './pages/JobOffers'
import Generate from './pages/Generate'
import Documents from './pages/Documents'
import Layout from './components/Layout'

const PrivateRoute = ({ children }) => {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" />
}

const PublicRoute = ({ children }) => {
  const { token } = useAuth()
  return !token ? children : <Navigate to="/dashboard" />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="experiences" element={<Experiences />} />
            <Route path="formations" element={<Formations />} />
            <Route path="skills" element={<Skills />} />
            <Route path="languages" element={<Languages />} />
            <Route path="job-offers" element={<JobOffers />} />
            <Route path="generate" element={<Generate />} />
            <Route path="documents" element={<Documents />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}