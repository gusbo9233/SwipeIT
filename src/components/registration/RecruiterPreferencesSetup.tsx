import { useState } from 'react'
import {
  buildRecruiterProfile,
  defaultRecruiterProfile,
  saveStoredProfile,
} from '../../data/profileStorage'
import ProfileLayout from '../profile/ProfileLayout'
import RecruiterProfileForm from '../profile/RecruiterProfileForm'
import type {
  RecruiterProfileData,
  RecruiterUserProfile,
  RegisterFormData,
} from '../../types/Profile'

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
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<RecruiterProfileData>({
    ...defaultRecruiterProfile,
    companyName: registration.name,
    email: registration.email,
  })

  async function handleSubmit() {
    setSaveError('')
    setSaving(true)

    try {
      const userProfile = buildRecruiterProfile(registration, profile) as RecruiterUserProfile
      await saveStoredProfile(userProfile)
      onComplete()
    } catch (error) {
      console.error('Failed to save recruiter profile', error)
      setSaveError(error instanceof Error ? error.message : 'We could not save your profile. Please try again.')
    } finally {
      setSaving(false)
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
        helperText="Your profile will be generated based on these details."
        onChange={setProfile}
        onSubmit={handleSubmit}
        profile={profile}
        submitLabel={saving ? 'Saving...' : 'Complete Hiring Setup'}
      />
    </ProfileLayout>
  )
}

export default RecruiterPreferencesSetup
