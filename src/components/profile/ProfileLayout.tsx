import type { ReactNode } from 'react'

type ProfileLayoutProps = {
  avatarLabel: string
  children: ReactNode
  description: string
  backLabel?: string
  onBack?: () => void
  title: string
  tone?: 'candidate' | 'recruiter'
}

function ProfileLayout({
  avatarLabel,
  backLabel = 'Back',
  children,
  description,
  onBack,
  title,
  tone = 'candidate',
}: ProfileLayoutProps) {
  const showTopbar = Boolean(onBack)

  return (
    <div className={`candidate-onboarding ${tone}-onboarding`}>
      {showTopbar ? (
        <header className="candidate-topbar">
          <div className="candidate-topbar-inner">
            <div className="candidate-brand-row">
              <button
                aria-label={backLabel}
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
      ) : null}

      <main className="candidate-onboarding-main">
        <section className="candidate-onboarding-heading">
          <h1>{title}</h1>
          <p>{description}</p>
        </section>
        {children}
      </main>
    </div>
  )
}

export default ProfileLayout
