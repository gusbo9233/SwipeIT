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
} from '../types/Profile'
import { getStoredProfile, saveStoredProfile } from '../data/profileStorage'
import './Register.css'
import './Profile.css'

function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [snapshot, setSnapshot] = useState<UserProfile | null>(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    getStoredProfile()
      .then((storedProfile) => setProfile(storedProfile))
      .catch((error: unknown) => {
        setLoadError(error instanceof Error ? error.message : 'Could not load your profile.')
      })
      .finally(() => setLoading(false))
  }, [])

  function updateProfile(nextProfile: UserProfile) {
    setProfile(nextProfile)
  }

  function startEditing() {
    if (!profile) {
      return
    }

    setSnapshot(profile)
    setEditing(true)
    setSaveMessage('')
    setSaveError('')
  }

  function cancelEditing() {
    if (snapshot) {
      setProfile(snapshot)
    }

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
      setSaveMessage('Profile changes saved.')
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Could not save your profile.')
    }
  }

  if (loading) {
    return null
  }

  if (loadError || !profile) {
    return (
      <ProfileLayout
        avatarLabel="--"
        description="We could not load your profile."
        title="Profile"
      >
        <p className="form-message form-message-error">
          {loadError || 'Profile unavailable. Try refreshing the page.'}
        </p>
      </ProfileLayout>
    )
  }

  const tone = profile.role

  return (
    <ProfileLayout
      avatarLabel={tone === 'candidate' ? 'ME' : 'HR'}
      description="Review the details used for your profile and matching experience."
      title="Profile"
      tone={tone}
    >
      {saveMessage ? (
        <div className="success-toast">
          <span className="material-symbols-outlined">check_circle</span>
          {saveMessage}
        </div>
      ) : null}
      {saveError ? (
        <div className="error-toast">
          <span className="material-symbols-outlined">error_outline</span>
          {saveError}
        </div>
      ) : null}
      <div className="profile-page-forms">
        <div className="profile-actions">
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

        <ProfileSection icon="manage_accounts" title="Profile Details">
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
                <span className="profile-readonly-value">{profile.name || '-'}</span>
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
                <span className="profile-readonly-value">{profile.email || '-'}</span>
              )}
            </label>
          </div>

          <p className="profile-role-summary">
            Profile type: <strong>{tone === 'candidate' ? 'Candidate' : 'Recruiter'}</strong>
          </p>
        </ProfileSection>

        {profile.role === 'candidate' ? (
          <CandidateProfileForm
            helperText="Saved details update your candidate profile."
            onChange={(candidate: CandidateProfileData) => {
              const nextProfile: CandidateUserProfile = { ...profile, candidate }
              updateProfile(nextProfile)
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
              const nextProfile: RecruiterUserProfile = { ...profile, recruiter }
              updateProfile(nextProfile)
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

export default Profile
