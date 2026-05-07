import { useState } from 'react'
import {
  defaultCandidateProfile,
  saveStoredProfile,
  buildProfileFromRegistration,
} from '../../data/profileStorage'
import CandidateProfileForm from '../profile/CandidateProfileForm'
import ProfileLayout from '../profile/ProfileLayout'
import { useAuth } from '../../context/AuthProvider'
import type { CandidateProfileData, RegisterFormData } from '../../types/Profile'

type CandidatePreferencesSetupProps = {
  onBack: () => void
  onComplete: () => void
  registration: RegisterFormData
}

function CandidatePreferencesSetup({
  onBack,
  onComplete,
  registration,
}: CandidatePreferencesSetupProps) {
  const { register } = useAuth()
  const [saveError, setSaveError] = useState('')
  const [profile, setProfile] = useState<CandidateProfileData>({
    ...defaultCandidateProfile,
    fullName: registration.name,
  })

  async function handleSubmit() {
    try {
      await register(registration)
      saveStoredProfile(buildProfileFromRegistration(registration, profile))
      onComplete()
    } catch (error) {
      console.error('Failed to save candidate account', error)
      setSaveError(getRegistrationError(error))
    }
  }

  return (
    <ProfileLayout
      avatarLabel="AR"
      backLabel="Back to registration"
      description="Help us match you with the right engineering opportunities."
      onBack={onBack}
      title="Complete your profile"
    >
      {saveError ? <p className="form-message form-message-error">{saveError}</p> : null}
      <CandidateProfileForm
        helperText="By continuing, you agree to our Terms of Service"
        onChange={setProfile}
        onSubmit={handleSubmit}
        profile={profile}
        submitLabel="Complete Profile"
      />
    </ProfileLayout>
  )
}

function getRegistrationError(error: unknown) {
  if (error instanceof Error && error.message === 'account-exists') {
    return 'An account with this email already exists. Please log in instead.'
  }

  return 'We could not save your account. Please try again.'
}

export default CandidatePreferencesSetup
