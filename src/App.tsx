import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Header from './components/base/Header'
import AppProvider from './context/AppProvider'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import RecruiterProfile from './pages/RecruiterProfile'
import ProtectedRoute from './pages/ProtectedRoute'
import NotFound from './pages/NotFound'
import Search from './pages/Search'
import About from './pages/About'

function App() {
  return (
    <AppProvider>
      <div className="content">
        <Header />
        <main className="site-main">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />

            <Route element={<ProtectedRoute allowedRoles={['candidate', 'recruiter']} />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
              <Route path="/search" element={<Search />} />
              <Route path="/recruiterprofile" element={<RecruiterProfile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <p>
            &copy; {new Date().getFullYear()} SwipeIT. All rights reserved.{' '}
            <Link to="/about">About Us</Link>
          </p>
        </footer>
      </div>
    </AppProvider>
  )
}

export default App
