import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const navLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'About', to: '/about' },
  { label: 'Search', to: '/search' },
  { label: 'Swipe', to: '/swipe' },
  { label: 'Candidate', to: '/candidate-profile' },
  { label: 'Recruiter', to: '/recruiter-profile' },
  { label: 'Account', to: '/account' },
  { label: 'Login', to: '/login' },
  { label: 'Register', to: '/register' },
]

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
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
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
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
