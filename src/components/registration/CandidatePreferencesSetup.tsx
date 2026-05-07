import { useState } from 'react'
import {
  buildCandidateProfile,
  defaultCandidateProfile,
  saveStoredProfile,
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
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<CandidateProfileData>({
    ...defaultCandidateProfile,
    fullName: registration.name,
  })

  async function handleSubmit() {
    setSaveError('')
    setSaving(true)

    try {
      await saveStoredProfile(buildCandidateProfile(registration, profile))
      onComplete()
    } catch (error) {
      console.error('Failed to save candidate profile', error)
      setSaveError(error instanceof Error ? error.message : 'We could not save your profile. Please try again.')
    } finally {
      setSaving(false)
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
        submitLabel={saving ? 'Saving...' : 'Complete Profile'}
      />
    </ProfileLayout>
  )
}

export default CandidatePreferencesSetup
