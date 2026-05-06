import type { FormEvent } from 'react'
import type { RecruiterProfileData } from '../../types/Profile'
import IconInput from './IconInput'
import ProfileSection from './ProfileSection'
import ProfileSubmit from './ProfileSubmit'

type RecruiterProfileFormProps = {
  helperText: string
  onChange: (profile: RecruiterProfileData) => void
  onSubmit: () => void
  profile: RecruiterProfileData
  readOnly?: boolean
  submitLabel: string
}

const companySizeOptions = ['1-10', '11-50', '51-200', '201+']

function RecruiterProfileForm({
  helperText,
  onChange,
  onSubmit,
  profile,
  readOnly = false,
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
      <fieldset className="profile-fieldset" disabled={readOnly}>
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

      <ProfileSection className="recruiter-note-section" icon="description" title="Role Pitch">
        <label className="candidate-field">
          What should candidates know?
          <textarea
            onChange={(event) => updateField('rolePitch', event.target.value)}
            value={profile.rolePitch}
          />
        </label>
      </ProfileSection>

      </fieldset>
      {readOnly ? null : (
        <ProfileSubmit helperText={helperText} label={submitLabel} tone="recruiter" />
      )}
    </form>
  )
}

export default RecruiterProfileForm
