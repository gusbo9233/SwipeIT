import type { FormEvent } from 'react'

type CandidatePreferencesSetupProps = {
  onBack: () => void
}

const selectedSkills = ['React', 'Node.js', 'TypeScript']
const suggestedSkills = ['Python', 'PostgreSQL']

const workPreferences = [
  { checked: true, icon: 'calendar_today', label: 'Full-time', value: 'full-time' },
  { icon: 'chips', label: 'Part-time', value: 'part-time' },
  {
    icon: 'handshake',
    label: 'Contract / Freelance',
    value: 'contract',
  },
]

function CandidatePreferencesSetup({ onBack }: CandidatePreferencesSetupProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <div className="candidate-onboarding">
      <header className="candidate-topbar">
        <div className="candidate-topbar-inner">
          <div className="candidate-brand-row">
            <button
              className="candidate-back material-symbols-outlined"
              onClick={onBack}
              type="button"
              aria-label="Back to registration"
            >
              arrow_back
            </button>
            <span>Swipe IT</span>
          </div>
          <div className="candidate-profile-dot" aria-label="Candidate profile">
            AR
          </div>
        </div>
      </header>

      <main className="candidate-onboarding-main">
        <section className="candidate-onboarding-heading">
          <h1>Complete your profile</h1>
          <p>Help us match you with the right engineering opportunities.</p>
        </section>

        <form className="candidate-profile-form" onSubmit={handleSubmit}>
          <section className="candidate-form-section">
            <SectionTitle icon="person" title="Personal Information" />
            <div className="candidate-field-grid">
              <label className="candidate-field">
                Full Name
                <input placeholder="Alex Rivera" type="text" />
              </label>
              <label className="candidate-field">
                Phone Number
                <input placeholder="+1 (555) 000-0000" type="tel" />
              </label>
            </div>
          </section>

          <section className="candidate-form-section">
            <SectionTitle icon="link" title="Professional Links" />
            <div className="candidate-link-list">
              <IconInput icon="share" placeholder="linkedin.com/in/username" />
              <IconInput icon="code" placeholder="github.com/username" />
            </div>
          </section>

          <section className="candidate-form-section skills-section">
            <div className="section-glow" />
            <SectionTitle icon="bolt" title="Technical Skills" />
            <label className="skill-search">
              <span className="material-symbols-outlined">search</span>
              <input placeholder="Search skills (e.g. React, Python, AWS)" type="text" />
            </label>
            <div className="candidate-chip-list">
              {selectedSkills.map((skill) => (
                <button className="skill-chip is-selected" key={skill} type="button">
                  <span>{skill}</span>
                  <span className="material-symbols-outlined">close</span>
                </button>
              ))}
              {suggestedSkills.map((skill) => (
                <button className="skill-chip" key={skill} type="button">
                  <span className="material-symbols-outlined">add</span>
                  <span>{skill}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="candidate-form-section">
            <SectionTitle icon="work_history" title="Working Preferences" />
            <div className="work-preference-grid">
              {workPreferences.map((preference) => (
                <label className="work-preference" key={preference.value}>
                  <input
                    defaultChecked={preference.checked}
                    name={preference.value}
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined">
                    {preference.icon}
                  </span>
                  <strong>{preference.label}</strong>
                </label>
              ))}
            </div>
          </section>

          <div className="candidate-submit-block">
            <button className="candidate-submit" type="submit">
              <span>Complete Profile</span>
              <span className="material-symbols-outlined">check_circle</span>
            </button>
            <p>By continuing, you agree to our Terms of Service</p>
          </div>
        </form>
      </main>
    </div>
  )
}

type SectionTitleProps = {
  icon: string
  title: string
}

function SectionTitle({ icon, title }: SectionTitleProps) {
  return (
    <div className="candidate-section-title">
      <span className="material-symbols-outlined">{icon}</span>
      <h2>{title}</h2>
    </div>
  )
}

type IconInputProps = {
  icon: string
  placeholder: string
}

function IconInput({ icon, placeholder }: IconInputProps) {
  return (
    <label className="candidate-icon-input">
      <span className="candidate-input-icon material-symbols-outlined">{icon}</span>
      <input placeholder={placeholder} type="url" />
    </label>
  )
}

export default CandidatePreferencesSetup
