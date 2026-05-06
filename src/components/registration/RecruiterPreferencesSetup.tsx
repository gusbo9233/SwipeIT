import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import IconInput from '../onboarding/IconInput'
import OnboardingLayout from '../onboarding/OnboardingLayout'
import OnboardingSection from '../onboarding/OnboardingSection'
import OnboardingSubmit from '../onboarding/OnboardingSubmit'

type RecruiterPreferencesSetupProps = {
  onBack: () => void
}

function RecruiterPreferencesSetup({ onBack }: RecruiterPreferencesSetupProps) {
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    const tempStorage = JSON.parse(localStorage.getItem('temp_reg_data') || '{}')
    
    const finalProfile = {
      name: tempStorage.name,
      email: tempStorage.email,
      role: 'Recruiter',
      company: formData.get('companyName'),
      location: formData.get('location'),
      companyImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      logo: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
      bio: `Lead recruiter at ${formData.get('companyName')}. We are looking for amazing developers to join our mission.`,
      specialties: ['Talent acquisition', 'HR-manager', 'Employer branding']
    }
    
    localStorage.setItem('activeProfile', JSON.stringify(finalProfile))
    navigate('/login')
  }
  return (
    <OnboardingLayout
      avatarLabel="HR"
      description="Tell us about your company so candidate matches start relevant."
      onBack={onBack}
      title="Set up hiring"
      tone="recruiter"
    >
      <form className="candidate-profile-form" onSubmit={handleSubmit}>
        <OnboardingSection icon="business" title="Company Information">
          <div className="candidate-field-grid">
            <label className="candidate-field">
              Company Name
              <input name="companyName" placeholder="Acme Studio" type="text" required />
            </label>
            <label className="candidate-field">
              Company Website
              <input name="website" placeholder="https://company.com" type="url" />
            </label>
            <label className="candidate-field">
              Company Size
              <select name="size" defaultValue="">
                <option disabled value="">Select size</option>
                <option>1-10</option>
                <option>11-50</option>
                <option>51-200</option>
                <option>201+</option>
              </select>
            </label>
            <label className="candidate-field">
              Hiring Location
              <input name="location" placeholder="Stockholm / Remote" type="text" required />
            </label>
          </div>
        </OnboardingSection>

        <OnboardingSection icon="badge" title="Recruiter Contact">
          <div className="candidate-link-list">
            <IconInput icon="mail" name="contactEmail" placeholder="recruiting@company.com" type="email" />
            <IconInput icon="link" name="linkedin" placeholder="linkedin.com/company/company-name" />
          </div>
        </OnboardingSection>

        <OnboardingSubmit
          helperText="Your profile will be generated based on these details."
          label="Complete Hiring Setup"
          tone="recruiter"
        />
      </form>
    </OnboardingLayout>
  )
}

export default RecruiterPreferencesSetup