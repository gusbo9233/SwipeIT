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

const defaultCompanyImage =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
const defaultLogo = 'https://cdn-icons-png.flaticon.com/512/281/281764.png'

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
      const userProfile = buildProfileFromRegistration(registration, undefined, profile)
      saveStoredProfile(userProfile)
      window.localStorage.setItem(
        'activeProfile',
        JSON.stringify({
          bio:
            profile.rolePitch ||
            `Lead recruiter at ${userProfile.recruiter.companyName}. We are looking for amazing developers to join our mission.`,
          company: userProfile.recruiter.companyName,
          companyImage: defaultCompanyImage,
          email: userProfile.recruiter.email,
          location: userProfile.recruiter.hiringLocation,
          logo: defaultLogo,
          name: userProfile.name,
          role: 'Recruiter',
          specialties: ['Recruiting', 'Hiring', 'Employer Branding'],
        }),
      )
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
        helperText="Your profile will be generated based on these details."
        onChange={setProfile}
        onSubmit={handleSubmit}
        profile={profile}
        submitLabel="Complete Hiring Setup"
      />
    </ProfileLayout>
  )
}

export default RecruiterPreferencesSetup
