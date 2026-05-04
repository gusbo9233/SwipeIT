import type { FormEvent } from 'react'
import type { RecruiterProfileData } from '../registration/types'
import IconInput from './IconInput'
import PreferenceGrid from './PreferenceGrid'
import ProfileSection from './ProfileSection'
import ProfileSubmit from './ProfileSubmit'
import SearchableChips from './SearchableChips'

type RecruiterProfileFormProps = {
  helperText: string
  onChange: (profile: RecruiterProfileData) => void
  onSubmit: () => void
  profile: RecruiterProfileData
  submitLabel: string
}

const suggestedFocus = ['DevOps', 'Data']
const companySizeOptions = ['1-10', '11-50', '51-200', '201+']

const hiringSignals = [
  { icon: 'groups', label: 'Permanent roles', value: 'permanent' },
  { icon: 'public', label: 'Remote hiring', value: 'remote' },
  { icon: 'bolt', label: 'Fast availability', value: 'availability' },
]

function RecruiterProfileForm({
  helperText,
  onChange,
  onSubmit,
  profile,
  submitLabel,
}: RecruiterProfileFormProps) {
  function updateField<Key extends keyof RecruiterProfileData>(
    field: Key,
    value: RecruiterProfileData[Key],
  ) {
    onChange({ ...profile, [field]: value })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="candidate-profile-form" onSubmit={handleSubmit}>
      <ProfileSection icon="business" title="Company Information">
        <div className="candidate-field-grid">
          <label className="candidate-field">
            Company Name
            <input
              onChange={(event) => updateField('companyName', event.target.value)}
              type="text"
              value={profile.companyName}
            />
          </label>
          <label className="candidate-field">
            Company Website
            <input
              onChange={(event) => updateField('website', event.target.value)}
              type="url"
              value={profile.website}
            />
          </label>
          <label className="candidate-field">
            Company Size
            <select
              onChange={(event) => updateField('companySize', event.target.value)}
              value={profile.companySize}
            >
              <option disabled value="">
                Select size
              </option>
              {companySizeOptions.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </label>
          <label className="candidate-field">
            Hiring Location
            <input
              onChange={(event) => updateField('hiringLocation', event.target.value)}
              type="text"
              value={profile.hiringLocation}
            />
          </label>
        </div>
      </ProfileSection>

      <ProfileSection icon="badge" title="Recruiter Contact">
        <div className="candidate-link-list">
          <IconInput
            icon="mail"
            onChange={(value) => updateField('email', value)}
            type="email"
            value={profile.email}
          />
          <IconInput
            icon="link"
            onChange={(value) => updateField('linkedIn', value)}
            value={profile.linkedIn}
          />
        </div>
      </ProfileSection>

      <ProfileSection className="skills-section" icon="manage_search" title="Hiring Focus">
        <div className="section-glow recruiter-glow" />
        <SearchableChips
          accentClassName="recruiter-chip"
          onChange={(hiringFocus) => updateField('hiringFocus', hiringFocus)}
          selected={profile.hiringFocus}
          suggested={suggestedFocus}
        />
      </ProfileSection>

      <ProfileSection icon="tune" title="Candidate Preferences">
        <PreferenceGrid
          itemClassName="recruiter-preference"
          items={hiringSignals}
          onChange={(values) => updateField('hiringSignals', values)}
          selectedValues={profile.hiringSignals}
        />
      </ProfileSection>

      <ProfileSection className="recruiter-note-section" icon="description" title="Role Pitch">
        <label className="candidate-field">
          What should candidates know?
          <textarea
            onChange={(event) => updateField('rolePitch', event.target.value)}
            value={profile.rolePitch}
          />
        </label>
      </ProfileSection>

      <ProfileSubmit helperText={helperText} label={submitLabel} tone="recruiter" />
    </form>
  )
}

export default RecruiterProfileForm
