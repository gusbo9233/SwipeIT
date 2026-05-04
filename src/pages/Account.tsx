import { useState } from 'react'
import CandidateProfileForm from '../components/profile/CandidateProfileForm'
import ProfileLayout from '../components/profile/ProfileLayout'
import ProfileSection from '../components/profile/ProfileSection'
import RecruiterProfileForm from '../components/profile/RecruiterProfileForm'
import type { RegistrationRole, UserProfile } from '../components/registration/types'
import {
  buildProfileFromRegistration,
  getStoredProfile,
  saveStoredProfile,
} from '../data/profileStorage'
import './Register.css'
import './Account.css'

const guestProfile = buildProfileFromRegistration({
  email: '',
  name: '',
  password: '',
  role: 'candidate',
})

const roleOptions: Array<{
  description: string
  label: string
  value: RegistrationRole
}> = [
  {
    description: 'Edit your candidate profile and matching preferences.',
    label: 'Candidate',
    value: 'candidate',
  },
  {
    description: 'Edit your company profile and hiring preferences.',
    label: 'Recruiter',
    value: 'recruiter',
  },
]

function Account() {
  const [profile, setProfile] = useState<UserProfile>(() => getStoredProfile() ?? guestProfile)
  const [saveMessage, setSaveMessage] = useState('')
  const activeTone = profile.role

  function updateProfile(nextProfile: UserProfile) {
    setProfile(nextProfile)
    setSaveMessage('')
  }

  function saveProfile(nextProfile = profile) {
    saveStoredProfile(nextProfile)
    setProfile(nextProfile)
    setSaveMessage('Account changes saved.')
  }

  return (
    <ProfileLayout
      avatarLabel={activeTone === 'candidate' ? 'ME' : 'HR'}
      description="Review the details used for your profile and matching experience."
      title="Account"
      tone={activeTone}
    >
      <div className="account-page-forms">
        <ProfileSection icon="manage_accounts" title="Account Details">
          <div className="candidate-field-grid">
            <label className="candidate-field">
              Name
              <input
                onChange={(event) =>
                  updateProfile({ ...profile, name: event.target.value })
                }
                type="text"
                value={profile.name}
              />
            </label>
            <label className="candidate-field">
              Email
              <input
                onChange={(event) =>
                  updateProfile({ ...profile, email: event.target.value })
                }
                type="email"
                value={profile.email}
              />
            </label>
          </div>

          <fieldset className="role-toggle account-role-toggle">
            <legend>Account type</legend>
            {roleOptions.map((role) => (
              <label
                className={`role-option ${
                  profile.role === role.value ? 'is-selected' : ''
                }`}
                key={role.value}
              >
                <input
                  checked={profile.role === role.value}
                  name="role"
                  onChange={() => updateProfile({ ...profile, role: role.value })}
                  type="radio"
                  value={role.value}
                />
                <span>
                  <strong>{role.label}</strong>
                  <small>{role.description}</small>
                </span>
              </label>
            ))}
          </fieldset>
        </ProfileSection>

        {saveMessage ? <p className="account-form-message">{saveMessage}</p> : null}

        {profile.role === 'candidate' ? (
          <CandidateProfileForm
            helperText="Saved details update your candidate profile."
            onChange={(candidate) => updateProfile({ ...profile, candidate })}
            onSubmit={() => saveProfile()}
            profile={profile.candidate}
            submitLabel="Save Candidate Profile"
          />
        ) : (
          <RecruiterProfileForm
            helperText="Saved details update your recruiter profile."
            onChange={(recruiter) => updateProfile({ ...profile, recruiter })}
            onSubmit={() => saveProfile()}
            profile={profile.recruiter}
            submitLabel="Save Recruiter Profile"
          />
        )}
      </div>
    </ProfileLayout>
  )
}

export default Account
