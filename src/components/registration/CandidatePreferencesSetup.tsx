import type { FormEvent } from 'react'
import IconInput from '../onboarding/IconInput'
import OnboardingLayout from '../onboarding/OnboardingLayout'
import OnboardingSection from '../onboarding/OnboardingSection'
import OnboardingSubmit from '../onboarding/OnboardingSubmit'
import PreferenceGrid from '../onboarding/PreferenceGrid'
import SearchableChips from '../onboarding/SearchableChips'

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
    <OnboardingLayout
      avatarLabel="AR"
      description="Help us match you with the right engineering opportunities."
      onBack={onBack}
      title="Complete your profile"
    >
      <form className="candidate-profile-form" onSubmit={handleSubmit}>
        <OnboardingSection icon="person" title="Personal Information">
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
        </OnboardingSection>

        <OnboardingSection icon="link" title="Professional Links">
          <div className="candidate-link-list">
            <IconInput icon="share" placeholder="linkedin.com/in/username" />
            <IconInput icon="code" placeholder="github.com/username" />
          </div>
        </OnboardingSection>

        <OnboardingSection className="skills-section" icon="bolt" title="Technical Skills">
          <div className="section-glow" />
          <SearchableChips
            placeholder="Search skills (e.g. React, Python, AWS)"
            selected={selectedSkills}
            suggested={suggestedSkills}
          />
        </OnboardingSection>

        <OnboardingSection icon="work_history" title="Working Preferences">
          <PreferenceGrid items={workPreferences} />
        </OnboardingSection>

        <OnboardingSubmit
          helperText="By continuing, you agree to our Terms of Service"
          label="Complete Profile"
        />
      </form>
    </OnboardingLayout>
  )
}

export default CandidatePreferencesSetup
