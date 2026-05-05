import { useState } from 'react'
import {
  buildRecruiterProfile,
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
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit() {
    setSaveError(null)
    setSaving(true)
    try {
      await saveStoredProfile(buildRecruiterProfile(registration, profile))
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
      avatarLabel="HR"
      backLabel="Back to registration"
      description="Tell us about your company so candidate matches start relevant."
      onBack={onBack}
      title="Set up hiring"
      tone="recruiter"
    >
      {saveError ? <p className="profile-save-error">{saveError}</p> : null}
      <RecruiterProfileForm
        helperText="Candidate recommendations will use these settings first."
        onChange={setProfile}
        onSubmit={handleSubmit}
        profile={profile}
        submitLabel={saving ? 'Saving…' : 'Complete Hiring Setup'}
      />
    </ProfileLayout>
  )
}

export default RecruiterPreferencesSetup
