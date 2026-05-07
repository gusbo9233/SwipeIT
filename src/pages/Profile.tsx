import { useState } from 'react'
import CandidateProfileForm from '../components/profile/CandidateProfileForm'
import ProfileLayout from '../components/profile/ProfileLayout'
import ProfileSection from '../components/profile/ProfileSection'
import RecruiterProfileForm from '../components/profile/RecruiterProfileForm'
import { useAuth } from '../context/AuthProvider'
import type { UserProfile } from '../types/Profile'
import {
  buildProfileFromRegistration,
  getProfileForUser,
  getStoredProfile,
  saveStoredProfile,
} from '../data/profileStorage'
import './Register.css'
import './Profile.css'

export const profileRoute = '/profile'

const guestProfile = buildProfileFromRegistration({
  email: '',
  name: '',
  password: '',
  role: 'candidate',
})

function Profile() {
  const { updateUser, user } = useAuth()
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (!user) {
      return getStoredProfile() ?? guestProfile
    }

    return getStoredProfile(user) ?? getProfileForUser(user)
  })
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [showErrorToast, setShowErrorToast] = useState(false)
  const activeTone = profile.role

  function updateProfile(nextProfile: UserProfile) {
    setProfile(nextProfile)
  }

  function saveProfile(nextProfile = profile) {
    try {
      saveStoredProfile(nextProfile)
      if (user) {
        updateUser({
          email: nextProfile.email,
          id: user.id,
          name: nextProfile.name,
          role: nextProfile.role,
        })
      }
      setProfile(nextProfile)
      setShowSuccessToast(true)
      setTimeout(() => setShowSuccessToast(false), 3000)
    } catch (error) {
      console.error('Failed to save profile', error)
      setShowErrorToast(true)
      setTimeout(() => setShowErrorToast(false), 3000)
    }
  }

  return (
    <ProfileLayout
      avatarLabel={activeTone === 'candidate' ? 'ME' : 'HR'}
      description="Review the details used for your profile and matching experience."
      title="Profile"
      tone={activeTone}
    >
      {showSuccessToast && (
        <div className="success-toast">
          <span className="material-symbols-outlined">check_circle</span>
          Profile changes saved successfully!
        </div>
      )}
      {showErrorToast && (
        <div className="error-toast">
          <span className="material-symbols-outlined">error_outline</span>
          We could not save your changes. Please try again.
        </div>
      )}
      <div className="profile-page-forms">
        <ProfileSection icon="manage_accounts" title="Profile Details">
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

          <p className="profile-role-summary">
            Profile type: <strong>{profile.role === 'candidate' ? 'Candidate' : 'Recruiter'}</strong>
          </p>
        </ProfileSection>

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

export default Profile
