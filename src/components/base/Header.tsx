import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import './Header.css'
import Button from '../Button'
import { searchRoute } from '../../pages/Search'
import { homeRoute } from '../../pages/Home'
import { profileRoute } from '../../pages/Profile'
import { recruiterProfileRoute } from '../../pages/RecruiterProfile'
import { loginRoute } from '../../pages/Login'
import { registerRoute } from '../../pages/Register'

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

  const NavContent = (onItemClick?: () => void) => {
    return <>
      {/* Navigation for all users */}
      <Button variant="link" to={homeRoute} onClick={onItemClick}>Home</Button>

      {user?.role === 'recruiter' && (
        <>
          <Button variant="link" to={searchRoute} onClick={onItemClick}>Search</Button>
          <Button variant="link" to={recruiterProfileRoute} onClick={onItemClick}>Profile</Button>
        </>
      )}

      {user?.role === 'candidate' && (
        <>
          <Button variant="link" to={profileRoute} onClick={onItemClick}>Profile</Button>
        </>
      )}

      {/* Conditional Auth Links */}
      {!user ? (
        <>
          <Button variant="link" to={loginRoute} onClick={onItemClick}>Login</Button>
          <Button variant="link" to={registerRoute} onClick={onItemClick}>Register</Button>
        </>
      ) : (
        <Button variant="link" onClick={handleLogout}>Logout</Button>
      )}
    </>
  }

  return (
    <header className={`top-bar ${mobileMenuOpen ? 'expanded' : ''}`}>
      <div className="top-bar-row">
        <NavLink className="brand" to={homeRoute}>
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
