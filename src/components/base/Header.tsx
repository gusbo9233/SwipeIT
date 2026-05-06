import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import Button from '../Button'
import { useAuth } from '../../context/AuthProvider'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth();
  
  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  const handleLogout = () => {
    closeMobileMenu();
    logout();
  }

  const NavContent = (onItemClick?: () => void) => {
    return           <>
    {/* Navigation for all users */}
          <Button variant="link" to="/" onClick={onItemClick}>Home</Button>

          {/* Navigation for Recruiters */}
          {user?.role === 'recruiter' && (
            <>
              <Button variant="link" to="/search" onClick={onItemClick}>Search</Button>
              <Button variant="link" to="/swipe" onClick={onItemClick}>Swipe IT</Button>
            </>
          )}

          {/* Conditional Auth Links */}
          {!user ? (
            <>
              <Button variant="link" to="/login" onClick={onItemClick}>Login</Button>
              <Button variant="link" to="/register" onClick={onItemClick}>Register</Button>
            </>
          ) : (
            <Button variant="link" onClick={handleLogout}>Logout</Button>
          )}
            </>
  }
  
  return (
    <header className={`top-bar ${mobileMenuOpen ? 'expanded' : ''}`}>
      <div className="top-bar-row">
        <NavLink className="brand" to="/">
          <span className="brand-mark">SI</span>
          <span>Swipe IT</span>
        </NavLink>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {NavContent(closeMobileMenu)}
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
        {NavContent(closeMobileMenu)}
      </nav>
    </header>
  )
}

export default Header
