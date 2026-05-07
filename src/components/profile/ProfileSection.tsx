import type { ReactNode } from 'react'

type ProfileSectionProps = {
  children: ReactNode
  className?: string
  icon: string
  title: string
}

function ProfileSection({
  children,
  className = '',
  icon,
  title,
}: ProfileSectionProps) {
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

export default ProfileSection
