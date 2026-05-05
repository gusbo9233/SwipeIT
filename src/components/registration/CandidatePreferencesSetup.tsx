import { useState } from 'react'
import {
  buildCandidateProfile,
  defaultCandidateProfile,
  saveStoredProfile,
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
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit() {
    setSaveError(null)
    setSaving(true)
    try {
      await saveStoredProfile(buildCandidateProfile(registration, profile))
      onComplete()
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : 'Could not save your profile.',
      )
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
      {saveError ? <p className="profile-save-error">{saveError}</p> : null}
      <CandidateProfileForm
        helperText="By continuing, you agree to our Terms of Service"
        onChange={setProfile}
        onSubmit={handleSubmit}
        profile={profile}
        submitLabel={saving ? 'Saving…' : 'Complete Profile'}
      />
    </ProfileLayout>
  )
}

export default CandidatePreferencesSetup
