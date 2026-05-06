import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Header from './components/base/Header'
import RecruiterProfile from './pages/RecruiterProfile'
import AppProvider from './context/AppProvider'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Search from './pages/Search'

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recruiterprofile" element={<RecruiterProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <p>&copy; {new Date().getFullYear()} SwipeIT. All rights reserved.</p>
        </footer>
      </div>
    </AppProvider>
  )
}

export default App
