import { useState } from 'react'
import {
  buildProfileFromRegistration,
  defaultRecruiterProfile,
  saveStoredProfile,
} from '../../data/profileStorage'
import ProfileLayout from '../profile/ProfileLayout'
import RecruiterProfileForm from '../profile/RecruiterProfileForm'
import { useAuth } from '../../context/AuthProvider'
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
  const { register } = useAuth()
  const [saveError, setSaveError] = useState('')
  const [profile, setProfile] = useState<RecruiterProfileData>({
    ...defaultRecruiterProfile,
    companyName: registration.name,
    email: registration.email,
  })

  async function handleSubmit() {
    try {
      
      await register(registration)
      
      saveStoredProfile(buildProfileFromRegistration(registration, undefined, profile))    
      window.localStorage.setItem('temp_reg_data', JSON.stringify(registration));          
      onComplete()
    } catch (error) {
      console.error('Failed to save recruiter account', error)
      setSaveError(getRegistrationError(error))
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
        submitLabel="Complete Hiring Setup"
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

export default RecruiterPreferencesSetup
