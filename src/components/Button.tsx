import './Button.css'
import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'transparent'

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
  const classes = `button button-${variant} ${className}`

  if (to) {
    return (
      <NavLink className={classes} to={to}>
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
