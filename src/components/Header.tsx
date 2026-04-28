import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="top-bar">
      <NavLink className="brand" to="/">
        <span className="brand-mark">SI</span>
        <span>Swipe IT</span>
      </NavLink>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>

      <button className="mobile-menu material-symbols-outlined" type="button">
        menu
      </button>
    </header>
  )
}

export default Header
