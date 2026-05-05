import type { FormEvent } from 'react'
import IconInput from '../onboarding/IconInput'
import OnboardingLayout from '../onboarding/OnboardingLayout'
import OnboardingSection from '../onboarding/OnboardingSection'
import OnboardingSubmit from '../onboarding/OnboardingSubmit'
import PreferenceGrid from '../onboarding/PreferenceGrid'
import SearchableChips from '../onboarding/SearchableChips'

type RecruiterPreferencesSetupProps = {
  onBack: () => void
}

const hiringFocus = ['Frontend', 'Backend', 'Full-stack']
const suggestedFocus = ['DevOps', 'Data']

const hiringSignals = [
  { checked: true, icon: 'groups', label: 'Permanent roles', value: 'permanent' },
  { icon: 'public', label: 'Remote hiring', value: 'remote' },
  { icon: 'bolt', label: 'Fast availability', value: 'availability' },
]

function RecruiterPreferencesSetup({ onBack }: RecruiterPreferencesSetupProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log("Profile submitted");
    
  }

  return (
    <OnboardingLayout
      avatarLabel="HR"
      description="Tell us about your company so candidate matches start relevant."
      onBack={onBack}
      title="Set up hiring"
      tone="recruiter"
    >
      <form className="candidate-profile-form" onSubmit={handleSubmit}>
        <OnboardingSection icon="business" title="Company Information">
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
        </OnboardingSection>

        <OnboardingSection icon="badge" title="Recruiter Contact">
          <div className="candidate-link-list">
            <IconInput icon="mail" placeholder="recruiting@company.com" type="email" />
            <IconInput icon="link" placeholder="linkedin.com/company/company-name" />
          </div>
        </OnboardingSection>

        <OnboardingSection className="skills-section" icon="manage_search" title="Hiring Focus">
          <div className="section-glow recruiter-glow" />
          <SearchableChips
            accentClassName="recruiter-chip"
            placeholder="Search roles or skills (e.g. React, DevOps)"
            selected={hiringFocus}
            suggested={suggestedFocus}
          />
        </OnboardingSection>

        <OnboardingSection icon="tune" title="Candidate Preferences">
          <PreferenceGrid itemClassName="recruiter-preference" items={hiringSignals} />
        </OnboardingSection>

        <OnboardingSection
          className="recruiter-note-section"
          icon="description"
          title="Role Pitch"
        >
          <label className="candidate-field">
            What should candidates know?
            <textarea placeholder="Describe your team, hiring needs, and what makes the role compelling." />
          </label>
        </OnboardingSection>

        <OnboardingSubmit
          helperText="Candidate recommendations will use these settings first."
          label="Complete Hiring Setup"
          tone="recruiter"
        />
      </form>
    </OnboardingLayout>
  )
}

export default RecruiterPreferencesSetup
