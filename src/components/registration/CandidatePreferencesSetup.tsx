import { useState } from 'react'
import {
  defaultCandidateProfile,
  saveStoredProfile,
  buildProfileFromRegistration,
} from '../../data/profileStorage'
import CandidateProfileForm from '../profile/CandidateProfileForm'
import ProfileLayout from '../profile/ProfileLayout'
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
  const [saveError, setSaveError] = useState('')
  const [profile, setProfile] = useState<CandidateProfileData>({
    ...defaultCandidateProfile,
    fullName: registration.name,
  })

  function handleSubmit() {
    try {
      saveStoredProfile(buildProfileFromRegistration(registration, profile))
      onComplete()
    } catch (error) {
      console.error('Failed to save candidate profile', error)
      setSaveError('We could not save your profile. Please try again.')
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

export default CandidatePreferencesSetup
