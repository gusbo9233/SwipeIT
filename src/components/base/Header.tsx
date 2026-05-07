import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import './Header.css'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { logout, user } = useAuth()

  function closeMobileMenu() {
    setMobileMenuOpen(false)
  }

  function handleLogout() {
    closeMobileMenu()
    logout()
  }

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
          <NavLink to={user?.role === 'recruiter' ? '/recruiterprofile' : '/profile'}>
            Profile
          </NavLink>
          <NavLink to="/about">About</NavLink>
          {user ? (
            <button className="nav-button" onClick={handleLogout} type="button">
              Logout ({user.name})
            </button>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
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
        <NavLink to="/" end onClick={closeMobileMenu}>Home</NavLink>
        <NavLink to="/search" onClick={closeMobileMenu}>Search</NavLink>
        <NavLink
          to={user?.role === 'recruiter' ? '/recruiterprofile' : '/profile'}
          onClick={closeMobileMenu}
        >
          Profile
        </NavLink>
        <NavLink to="/about" onClick={closeMobileMenu}>About</NavLink>
        {user ? (
          <button className="nav-button mobile-nav-button" onClick={handleLogout} type="button">
            Logout ({user.name})
          </button>
        ) : (
          <>
            <NavLink to="/login" onClick={closeMobileMenu}>Login</NavLink>
            <NavLink to="/register" onClick={closeMobileMenu}>Register</NavLink>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
