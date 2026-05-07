import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import './Header.css'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  function closeMobileMenu() {
    setMobileMenuOpen(false)
  }

  function handleLogout() {
    closeMobileMenu()
    logout()
    navigate('/')
  }

  return (
    <header className={`top-bar ${mobileMenuOpen ? 'expanded' : ''}`}>
      <div className="top-bar-row">
        <NavLink className="brand" to="/">
          <span className="brand-mark">SI</span>
          <span>Swipe IT</span>
        </NavLink>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {user ? (
            <>
              <NavLink to="/" end>Home</NavLink>
              {user.role === 'recruiter' ? <NavLink to="/search">Search</NavLink> : null}
              <NavLink to={user.role === 'recruiter' ? '/recruiterprofile' : '/profile'}>
                Profile
              </NavLink>
              <button className="nav-button" onClick={handleLogout} type="button">
                Logout ({user.name})
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
          <NavLink to="/about">About</NavLink>
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
        {user ? (
          <>
            <NavLink to="/" end onClick={closeMobileMenu}>Home</NavLink>
            {user.role === 'recruiter' ? (
              <NavLink to="/search" onClick={closeMobileMenu}>Search</NavLink>
            ) : null}
            <NavLink
              to={user.role === 'recruiter' ? '/recruiterprofile' : '/profile'}
              onClick={closeMobileMenu}
            >
              Profile
            </NavLink>
            <button className="nav-button mobile-nav-button" onClick={handleLogout} type="button">
              Logout ({user.name})
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={closeMobileMenu}>Login</NavLink>
            <NavLink to="/register" onClick={closeMobileMenu}>Register</NavLink>
          </>
        )}
        <NavLink to="/about" onClick={closeMobileMenu}>About</NavLink>
      </nav>
    </header>
  )
}

export default Header
