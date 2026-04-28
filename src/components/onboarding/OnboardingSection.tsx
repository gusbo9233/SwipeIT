import type { ReactNode } from 'react'

type OnboardingSectionProps = {
  children: ReactNode
  className?: string
  icon: string
  title: string
}

function OnboardingSection({
  children,
  className = '',
  icon,
  title,
}: OnboardingSectionProps) {
  return (
    <section className={`candidate-form-section ${className}`.trim()}>
      <div className="candidate-section-title">
        <span className="material-symbols-outlined">{icon}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

export default OnboardingSection
