import type { FormEvent } from 'react'
import type { CandidateProfileData } from '../registration/types'
import IconInput from './IconInput'
import PreferenceGrid from './PreferenceGrid'
import ProfileSection from './ProfileSection'
import ProfileSubmit from './ProfileSubmit'
import SearchableChips from './SearchableChips'

type CandidateProfileFormProps = {
  helperText: string
  onChange: (profile: CandidateProfileData) => void
  onSubmit: () => void
  profile: CandidateProfileData
  readOnly?: boolean
  submitLabel: string
}

const suggestedSkills = ['Python', 'PostgreSQL']

const workPreferences = [
  { icon: 'calendar_today', label: 'Full-time', value: 'full-time' },
  { icon: 'chips', label: 'Part-time', value: 'part-time' },
  { icon: 'handshake', label: 'Contract / Freelance', value: 'contract' },
]

function CandidateProfileForm({
  helperText,
  onChange,
  onSubmit,
  profile,
  readOnly = false,
  submitLabel,
}: CandidateProfileFormProps) {
  function updateField<Key extends keyof CandidateProfileData>(
    field: Key,
    value: CandidateProfileData[Key],
  ) {
    onChange({ ...profile, [field]: value })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="candidate-profile-form" onSubmit={handleSubmit}>
      <fieldset className="profile-fieldset" disabled={readOnly}>
      <ProfileSection icon="person" title="Personal Information">
        <div className="candidate-field-grid">
          <label className="candidate-field">
            Full Name
            <input
              onChange={(event) => updateField('fullName', event.target.value)}
              type="text"
              value={profile.fullName}
            />
          </label>
          <label className="candidate-field">
            Phone Number
            <input
              onChange={(event) => updateField('phoneNumber', event.target.value)}
              type="tel"
              value={profile.phoneNumber}
            />
          </label>
        </div>
      </ProfileSection>

      <ProfileSection icon="link" title="Professional Links">
        <div className="candidate-link-list">
          <IconInput
            icon="share"
            onChange={(value) => updateField('linkedIn', value)}
            value={profile.linkedIn}
          />
          <IconInput
            icon="code"
            onChange={(value) => updateField('github', value)}
            value={profile.github}
          />
        </div>
      </ProfileSection>

      <ProfileSection className="skills-section" icon="bolt" title="Technical Skills">
        <div className="section-glow" />
        <SearchableChips
          onChange={(skills) => updateField('skills', skills)}
          selected={profile.skills}
          suggested={suggestedSkills}
        />
      </ProfileSection>

      <ProfileSection icon="work_history" title="Working Preferences">
        <PreferenceGrid
          items={workPreferences}
          onChange={(values) => updateField('workPreferences', values)}
          selectedValues={profile.workPreferences}
        />
      </ProfileSection>

      </fieldset>
      {readOnly ? null : <ProfileSubmit helperText={helperText} label={submitLabel} />}
    </form>
  )
}

export default CandidateProfileForm
