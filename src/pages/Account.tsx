import { useEffect, useState } from 'react'
import Button from '../components/Button'
import CandidateProfileForm from '../components/profile/CandidateProfileForm'
import ProfileLayout from '../components/profile/ProfileLayout'
import ProfileSection from '../components/profile/ProfileSection'
import RecruiterProfileForm from '../components/profile/RecruiterProfileForm'
import type {
  CandidateProfileData,
  CandidateUserProfile,
  RecruiterProfileData,
  RecruiterUserProfile,
  UserProfile,
} from '../types/profile'
import { getStoredProfile, saveStoredProfile } from '../data/profileStorage'
import './Register.css'
import './Account.css'

function Account() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [snapshot, setSnapshot] = useState<UserProfile | null>(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saveMessage, setSaveMessage] = useState('')
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    getStoredProfile().then((stored) => {
      setProfile(stored)
      setLoading(false)
    })
  }, [])

  function updateProfile(nextProfile: UserProfile) {
    setProfile(nextProfile)
  }

  function startEditing() {
    if (!profile) return
    setSnapshot(profile)
    setEditing(true)
    setSaveMessage('')
    setSaveError('')
  }

  function cancelEditing() {
    if (snapshot) setProfile(snapshot)
    setSnapshot(null)
    setEditing(false)
    setSaveMessage('')
    setSaveError('')
  }

  async function saveProfile(nextProfile: UserProfile) {
    setSaveError('')
    try {
      await saveStoredProfile(nextProfile)
      setProfile(nextProfile)
      setSnapshot(null)
      setEditing(false)
      setSaveMessage('Account changes saved.')
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : 'Could not save your profile.',
      )
    }
  }

  if (loading) return null
  if (!profile) {
    return (
      <ProfileLayout
        avatarLabel="--"
        description="We could not load your profile."
        title="Account"
      >
        <p>Profile unavailable. Try refreshing the page.</p>
      </ProfileLayout>
    )
  }

  const tone = profile.role
  const accountDetails = (
    <ProfileSection icon="manage_accounts" title="Account Details">
      <div className="candidate-field-grid">
        <label className="candidate-field">
          Name
          {editing ? (
            <input
              onChange={(event) =>
                updateProfile({ ...profile, name: event.target.value })
              }
              type="text"
              value={profile.name}
            />
          ) : (
            <span className="account-readonly-value">{profile.name || '—'}</span>
          )}
        </label>
        <label className="candidate-field">
          Email
          {editing ? (
            <input
              onChange={(event) =>
                updateProfile({ ...profile, email: event.target.value })
              }
              type="email"
              value={profile.email}
            />
          ) : (
            <span className="account-readonly-value">{profile.email || '—'}</span>
          )}
        </label>
      </div>
      <p className="account-role-display">
        Account type: <strong>{tone === 'candidate' ? 'Candidate' : 'Recruiter'}</strong>
      </p>
    </ProfileSection>
  )

  const actionBar = (
    <div className="account-actions">
      {editing ? (
        <Button onClick={cancelEditing} type="button" variant="secondary">
          Cancel
        </Button>
      ) : (
        <Button onClick={startEditing} type="button">
          <span className="material-symbols-outlined">edit</span>
          <span>Edit Profile</span>
        </Button>
      )}
    </div>
  )

  return (
    <ProfileLayout
      avatarLabel={tone === 'candidate' ? 'ME' : 'HR'}
      description="Review the details used for your profile and matching experience."
      title="Account"
      tone={tone}
    >
      <div className="account-page-forms">
        {actionBar}
        {accountDetails}

        {saveMessage ? <p className="account-form-message">{saveMessage}</p> : null}
        {saveError ? <p className="account-form-error">{saveError}</p> : null}

        {profile.role === 'candidate' ? (
          <CandidateProfileForm
            helperText="Saved details update your candidate profile."
            onChange={(candidate: CandidateProfileData) => {
              const next: CandidateUserProfile = { ...profile, candidate }
              updateProfile(next)
            }}
            onSubmit={() => saveProfile(profile)}
            profile={profile.candidate}
            readOnly={!editing}
            submitLabel="Save Candidate Profile"
          />
        ) : (
          <RecruiterProfileForm
            helperText="Saved details update your recruiter profile."
            onChange={(recruiter: RecruiterProfileData) => {
              const next: RecruiterUserProfile = { ...profile, recruiter }
              updateProfile(next)
            }}
            onSubmit={() => saveProfile(profile)}
            profile={profile.recruiter}
            readOnly={!editing}
            submitLabel="Save Recruiter Profile"
          />
        )}
      </div>
    </ProfileLayout>
  )
}

export default Account
