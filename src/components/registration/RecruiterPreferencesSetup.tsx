import { useState } from 'react'
import {
  buildProfileFromRegistration,
  defaultRecruiterProfile,
  saveStoredProfile,
} from '../../data/profileStorage'
import ProfileLayout from '../profile/ProfileLayout'
import RecruiterProfileForm from '../profile/RecruiterProfileForm'
import type { RecruiterProfileData, RegisterFormData } from '../../types/Profile'

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
  const [saveError, setSaveError] = useState('')
  const [profile, setProfile] = useState<RecruiterProfileData>({
    ...defaultRecruiterProfile,
    companyName: registration.name,
    email: registration.email,
  })

  function handleSubmit() {
    try {
      saveStoredProfile(buildProfileFromRegistration(registration, undefined, profile))
      onComplete()
    } catch (error) {
      console.error('Failed to save recruiter profile', error)
      setSaveError('We could not save your profile. Please try again.')
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
      {saveError ? <p className="form-message form-message-error">{saveError}</p> : null}
      <RecruiterProfileForm
        helperText="Candidate recommendations will use these settings first."
        onChange={setProfile}
        onSubmit={handleSubmit}
        profile={profile}
        submitLabel="Complete Hiring Setup"
      />
    </ProfileLayout>
  )
}

export default RecruiterPreferencesSetup
