import type { FormEvent } from 'react'

type RecruiterPreferencesSetupProps = {
  onBack: () => void
}

const hiringFocus = ['Frontend', 'Backend', 'Full-stack']
const hiringSignals = [
  { checked: true, icon: 'groups', label: 'Permanent roles', value: 'permanent' },
  { icon: 'public', label: 'Remote hiring', value: 'remote' },
  { icon: 'bolt', label: 'Fast availability', value: 'availability' },
]

function RecruiterPreferencesSetup({ onBack }: RecruiterPreferencesSetupProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <div className="candidate-onboarding recruiter-onboarding">
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
          <div className="candidate-profile-dot recruiter-profile-dot" aria-label="Recruiter profile">
            HR
          </div>
        </div>
      </header>

      <main className="candidate-onboarding-main">
        <section className="candidate-onboarding-heading">
          <h1>Set up hiring</h1>
          <p>Tell us about your company so candidate matches start relevant.</p>
        </section>

        <form className="candidate-profile-form" onSubmit={handleSubmit}>
          <section className="candidate-form-section">
            <SectionTitle icon="business" title="Company Information" />
            <div className="candidate-field-grid">
              <label className="candidate-field">
                Company Name
                <input placeholder="Acme Studio" type="text" />
              </label>
              <label className="candidate-field">
                Company Website
                <input placeholder="https://company.com" type="url" />
              </label>
              <label className="candidate-field">
                Company Size
                <select defaultValue="">
                  <option disabled value="">
                    Select size
                  </option>
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>51-200</option>
                  <option>201+</option>
                </select>
              </label>
              <label className="candidate-field">
                Hiring Location
                <input placeholder="Stockholm / Remote" type="text" />
              </label>
            </div>
          </section>

          <section className="candidate-form-section">
            <SectionTitle icon="badge" title="Recruiter Contact" />
            <div className="candidate-link-list">
              <IconInput icon="mail" placeholder="recruiting@company.com" type="email" />
              <IconInput icon="link" placeholder="linkedin.com/company/company-name" />
            </div>
          </section>

          <section className="candidate-form-section skills-section">
            <div className="section-glow recruiter-glow" />
            <SectionTitle icon="manage_search" title="Hiring Focus" />
            <label className="skill-search">
              <span className="material-symbols-outlined">search</span>
              <input placeholder="Search roles or skills (e.g. React, DevOps)" type="text" />
            </label>
            <div className="candidate-chip-list">
              {hiringFocus.map((focus) => (
                <button className="skill-chip is-selected recruiter-chip" key={focus} type="button">
                  <span>{focus}</span>
                  <span className="material-symbols-outlined">close</span>
                </button>
              ))}
              <button className="skill-chip" type="button">
                <span className="material-symbols-outlined">add</span>
                <span>DevOps</span>
              </button>
              <button className="skill-chip" type="button">
                <span className="material-symbols-outlined">add</span>
                <span>Data</span>
              </button>
            </div>
          </section>

          <section className="candidate-form-section">
            <SectionTitle icon="tune" title="Candidate Preferences" />
            <div className="work-preference-grid">
              {hiringSignals.map((signal) => (
                <label className="work-preference recruiter-preference" key={signal.value}>
                  <input defaultChecked={signal.checked} name={signal.value} type="checkbox" />
                  <span className="material-symbols-outlined">{signal.icon}</span>
                  <strong>{signal.label}</strong>
                </label>
              ))}
            </div>
          </section>

          <section className="candidate-form-section recruiter-note-section">
            <SectionTitle icon="description" title="Role Pitch" />
            <label className="candidate-field">
              What should candidates know?
              <textarea placeholder="Describe your team, hiring needs, and what makes the role compelling." />
            </label>
          </section>

          <div className="candidate-submit-block">
            <button className="candidate-submit recruiter-submit" type="submit">
              <span>Complete Hiring Setup</span>
              <span className="material-symbols-outlined">check_circle</span>
            </button>
            <p>Candidate recommendations will use these settings first.</p>
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
  type?: 'email' | 'url'
}

function IconInput({ icon, placeholder, type = 'url' }: IconInputProps) {
  return (
    <label className="candidate-icon-input">
      <span className="candidate-input-icon material-symbols-outlined">{icon}</span>
      <input placeholder={placeholder} type={type} />
    </label>
  )
}

export default RecruiterPreferencesSetup
