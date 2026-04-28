import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonBaseProps = {
  children: ReactNode
  className?: string
  variant?: ButtonVariant
}

type ButtonLinkProps = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type ButtonActionProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
  }

type ButtonProps = ButtonLinkProps | ButtonActionProps

function buttonClasses(variant: ButtonVariant, className = '') {
  return ['button', `button-${variant}`, className].filter(Boolean).join(' ')
}

function isLinkButton(props: ButtonProps): props is ButtonLinkProps {
  return 'href' in props && typeof props.href === 'string'
}

function Button(props: ButtonProps) {
  const { className = '', variant = 'primary' } = props
  const classes = ['button', `button-${variant}`, className]
    .filter(Boolean)
    .join(' ')

  if (isLinkButton(props)) {
    const { children: linkChildren, className: _className, variant: _variant, ...linkProps } = props

    return (
      <a className={buttonClasses(variant, className)} {...linkProps}>
        {linkChildren}
      </a>
    )
  }

  const {
    children: buttonChildren,
    className: _className,
    variant: _variant,
    type = 'button',
    ...buttonProps
  } = props

  return (
    <button className={classes} type={type} {...buttonProps}>
      {buttonChildren}
    </button>
  )
}

export default Button
