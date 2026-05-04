import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className={`top-bar ${mobileMenuOpen ? 'expanded' : ''}`}>
      <div className="top-bar-row">
        <NavLink className="brand" to="/">
          <span className="brand-mark">SI</span>
          <span>Swipe IT</span>
        </NavLink>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/account">Account</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>

        <button
          className="mobile-menu material-symbols-outlined"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? 'close' : 'menu'}
        </button>
      </div>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <NavLink to="/" end onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
        <NavLink to="/search" onClick={() => setMobileMenuOpen(false)}>Search</NavLink>
        <NavLink to="/account" onClick={() => setMobileMenuOpen(false)}>Account</NavLink>
        <NavLink to="/login" onClick={() => setMobileMenuOpen(false)}>Login</NavLink>
        <NavLink to="/register" onClick={() => setMobileMenuOpen(false)}>Register</NavLink>
      </nav>
    </header>
  )
}

export default Header
