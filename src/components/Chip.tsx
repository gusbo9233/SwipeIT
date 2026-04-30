import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ChipProps = {
  children: ReactNode
  onClick?: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>

function Chip({ children, onClick, className = '', ...rest }: ChipProps) {
  const classes = `skill-chip is-selected ${className}`
  return (
    <button
      aria-label={onClick ? `Remove ${children}` : undefined}
      className={classes}
      type="button"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Chip
