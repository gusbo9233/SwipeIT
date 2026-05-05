import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import Header from './components/base/Header'
import RequireAuth from './components/RequireAuth'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Search from './pages/Search'

function App() {
  return (
    <div className="content">
      <Header />
      <main className="site-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
          <Route path="/search" element={<RequireAuth><Search /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} SwipeIT. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
