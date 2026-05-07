import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Header from './components/base/Header'
import AppProviders from './context/AppProvider'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import RecruiterProfile from './pages/RecruiterProfile'
import NotFound from './pages/NotFound'
import Search from './pages/Search'
import About from './pages/About'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return (
    <AppProviders>
      <div className="content">
        <Header />
        <main className="site-main">
          <Routes>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Recruiter Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
              <Route path="/search" element={<Search />} />
              <Route path="/recruiter-profile" element={<RecruiterProfile/>} />     
            </Route>
            
            {/* Candidate Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['candidate']} />}>
            </Route>

            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <p>&copy; {new Date().getFullYear()} SwipeIT. All rights reserved. <Link to="/about">About Us</Link></p>
        </footer>
      </div>
    </AppProviders>
  )
}

export default App
