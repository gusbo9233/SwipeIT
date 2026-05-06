import './Button.css'
import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

// 1. Added 'link' to the variant type
type ButtonVariant = 'primary' | 'secondary' | 'transparent' | 'link'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: ButtonVariant
  type?: 'button' | 'submit' | 'reset'
  to?: string
}

function Button(props: ButtonProps) {
  const { to, onClick, className = '', variant = 'primary', children, type = 'button' } = props
  
  // The class 'button-link' will handle the NavLink look
  const classes = `button button-${variant} ${className}`

  if (to) {
    return (
      <NavLink className={classes} to={to} end>
        {children}
      </NavLink>
    )
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button