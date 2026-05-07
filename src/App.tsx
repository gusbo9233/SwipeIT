import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Header from './components/base/Header'
import AppProvider from './context/AppProvider'
import Home from './pages/Home'
import Login, { loginRoute } from './pages/Login'
import Register, { registerRoute } from './pages/Register'
import Profile, { profileRoute } from './pages/Profile'
import RecruiterProfile, { recruiterProfileRoute } from './pages/RecruiterProfile'
import ProtectedRoute from './pages/ProtectedRoute'
import NotFound from './pages/NotFound'
import Search, { searchRoute } from './pages/Search'
import About, { aboutRoute } from './pages/About'

function App() {
  return (
    <AppProvider>
      <div className="content">
        <Header />
        <main className="site-main">
          <Routes>
            <Route index element={<Home />} />
            <Route path={aboutRoute} element={<About />} />
            <Route path={loginRoute} element={<Login />} />
            <Route path={registerRoute} element={<Register />} />

            <Route element={<ProtectedRoute allowedRoles={['candidate', 'recruiter']} />}>
              <Route path={profileRoute} element={<Profile />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
              <Route path={searchRoute} element={<Search />} />
              <Route path={recruiterProfileRoute} element={<RecruiterProfile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <p>
            &copy; {new Date().getFullYear()} SwipeIT. All rights reserved.{' '}
            <Link to={aboutRoute}>About Us</Link>
          </p>
        </footer>
      </div>
    </AppProvider>
  )
}

export default App
