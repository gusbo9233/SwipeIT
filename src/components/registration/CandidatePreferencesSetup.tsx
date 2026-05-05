import { useState } from 'react'
import {
  defaultCandidateProfile,
  saveStoredProfile,
  buildProfileFromRegistration,
} from '../../data/profileStorage'
import CandidateProfileForm from '../profile/CandidateProfileForm'
import ProfileLayout from '../profile/ProfileLayout'
import type { CandidateProfileData, RegisterFormData } from './types'

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
  const [profile, setProfile] = useState<CandidateProfileData>({
    ...defaultCandidateProfile,
    fullName: registration.name,
  })
  const [saveError, setSaveError] = useState('')

  function handleSubmit() {
    const saved = saveStoredProfile(buildProfileFromRegistration(registration, profile))
    if (saved) {
      onComplete()
    } else {
      setSaveError('Failed to save your profile. Storage may be full or unavailable.')
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
      {saveError ? <p className="account-form-message">{saveError}</p> : null}
      <CandidateProfileForm
        helperText="By continuing, you agree to our Terms of Service"
        onChange={(next) => { setProfile(next); setSaveError('') }}
        onSubmit={handleSubmit}
        profile={profile}
        submitLabel="Complete Profile"
      />
    </ProfileLayout>
  )
}

export default CandidatePreferencesSetup
