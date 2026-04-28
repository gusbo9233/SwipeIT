import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import { Route, Routes, NavLink } from 'react-router-dom'

function App() {
  return (
    <>
      <header className="site-header">
        <div className="brand-mark">S</div>
        <nav className="site-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
      </header>
      <main className="site-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} SwipeIT. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
