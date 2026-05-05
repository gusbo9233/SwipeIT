import { useState } from 'react'
import {
  buildProfileFromRegistration,
  defaultRecruiterProfile,
  saveStoredProfile,
} from '../../data/profileStorage'
import ProfileLayout from '../profile/ProfileLayout'
import RecruiterProfileForm from '../profile/RecruiterProfileForm'
import type { RecruiterProfileData, RegisterFormData } from './types'

type RecruiterPreferencesSetupProps = {
  onBack: () => void
  onComplete: () => void
  registration: RegisterFormData
}

function RecruiterPreferencesSetup({
  onBack,
  onComplete,
  registration,
}: RecruiterPreferencesSetupProps) {
  const [profile, setProfile] = useState<RecruiterProfileData>({
    ...defaultRecruiterProfile,
    companyName: registration.name,
    email: registration.email,
  })
  const [saveError, setSaveError] = useState('')

  function handleSubmit() {
    const saved = saveStoredProfile(buildProfileFromRegistration(registration, undefined, profile))
    if (saved) {
      onComplete()
    } else {
      setSaveError('Failed to save your profile. Storage may be full or unavailable.')
    }
  }

  return (
    <ProfileLayout
      avatarLabel="HR"
      backLabel="Back to registration"
      description="Tell us about your company so candidate matches start relevant."
      onBack={onBack}
      title="Set up hiring"
      tone="recruiter"
    >
      {saveError ? <p className="account-form-message">{saveError}</p> : null}
      <RecruiterProfileForm
        helperText="Candidate recommendations will use these settings first."
        onChange={(next) => { setProfile(next); setSaveError('') }}
        onSubmit={handleSubmit}
        profile={profile}
        submitLabel="Complete Hiring Setup"
      />
    </ProfileLayout>
  )
}

export default RecruiterPreferencesSetup
