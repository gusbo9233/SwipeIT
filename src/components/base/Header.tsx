import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import Button from '../Button'
import { authService } from '../../service/authService'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  }

  const handleLogout = () => {
    closeMobileMenu();
    authService.logout();
  }

  return (
    <header className={`top-bar ${mobileMenuOpen ? 'expanded' : ''}`}>
      <div className="top-bar-row">
        <NavLink className="brand" to="/">
          <span className="brand-mark">SI</span>
          <span>Swipe IT</span>
        </NavLink>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Button to="/">Home</Button>
          <Button to="/login">Login</Button>
          <Button to="/register">Register</Button>
          <Button variant="link" onClick={handleLogout}>Logout</Button>
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
        <Button to="/" onClick={closeMobileMenu}>Home</Button>
        <Button to="/login" onClick={closeMobileMenu}>Login</Button>
        <Button to="/register" onClick={closeMobileMenu}>Register</Button>
        <Button variant="link" onClick={handleLogout}>Logout</Button>
      </nav>
    </header>
  )
}

export default Header
