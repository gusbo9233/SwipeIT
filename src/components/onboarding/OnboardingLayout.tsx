import type { ReactNode } from 'react'

type OnboardingLayoutProps = {
  avatarLabel: string
  children: ReactNode
  description: string
  onBack: () => void
  title: string
  tone?: 'candidate' | 'recruiter'
}

function OnboardingLayout({
  avatarLabel,
  children,
  description,
  onBack,
  title,
  tone = 'candidate',
}: OnboardingLayoutProps) {
  return (
    <div className={`candidate-onboarding ${tone}-onboarding`}>
      <header className="candidate-topbar">
        <div className="candidate-topbar-inner">
          <div className="candidate-brand-row">
            <button
              aria-label="Back to registration"
              className="candidate-back material-symbols-outlined"
              onClick={onBack}
              type="button"
            >
              arrow_back
            </button>
            <span>Swipe IT</span>
          </div>
          <div
            aria-label={`${tone} profile`}
            className={`candidate-profile-dot ${tone}-profile-dot`}
          >
            {avatarLabel}
          </div>
        </div>
      </header>

        <section className="candidate-onboarding-heading">
          <h1>{title}</h1>
          <p>{description}</p>
        </section>
        {children}
    </div>
  )
}

export default OnboardingLayout
