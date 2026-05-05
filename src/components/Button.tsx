import './Button.css'
import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'transparent'

type ButtonProps = {
  'aria-label'?: string
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
  className?: string
  variant?: ButtonVariant
  type?: 'button' | 'submit' | 'reset'
  to?: string
}

function Button(props: ButtonProps) {
  const {
    'aria-label': ariaLabel,
    to,
    onClick,
    className = '',
    variant = 'primary',
    children,
    disabled = false,
    type = 'button',
  } = props
  const classes = `button button-${variant} ${className}`

  if (to) {
    return (
      <NavLink aria-label={ariaLabel} className={classes} to={to}>
        {children}
      </NavLink>
    )
  }

  return (
    <button
      aria-label={ariaLabel}
      className={classes}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
