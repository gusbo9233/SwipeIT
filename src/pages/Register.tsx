import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CandidatePreferencesSetup from '../components/registration/CandidatePreferencesSetup'
import RecruiterPreferencesSetup from '../components/registration/RecruiterPreferencesSetup'
import RegisterWithRoleToggle from '../components/registration/RegisterWithRoleToggle'
import type { RegisterFormData } from '../types/Profile'
import './Register.css'

const initialFormData: RegisterFormData = {
  email: '',
  name: '',
  password: '',
  role: 'candidate',
}

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)
  const [step, setStep] = useState<'register' | 'preferences'>('register')

  function handleComplete() {
    navigate(formData.role === 'recruiter' ? '/recruiterprofile' : '/profile')
  }

  function handleNext() {
    window.localStorage.setItem('temp_reg_data', JSON.stringify(formData))
    setStep('preferences')
  }

  if (step === 'preferences' && formData.role === 'candidate') {
    return (
      <CandidatePreferencesSetup
        onBack={() => setStep('register')}
        onComplete={handleComplete}
        registration={formData}
      />
    )
  }

  return (
    <div className="register-page page">
      <div className="register-shell">
        <aside className="register-aside">
          <p className="eyebrow">Step {step === 'register' ? '1' : '2'} of 2</p>
          <h2>
            {step === 'register'
              ? 'Start with your role.'
              : 'Tune your first matches.'}
          </h2>
          <p>
            {step === 'register'
              ? 'Candidates and recruiters follow different onboarding paths.'
              : 'Preferences become the first filters for the swipe experience.'}
          </p>
        </aside>

        {step === 'register' ? (
          <RegisterWithRoleToggle
            formData={formData}
            onChange={setFormData}
            onNext={handleNext}
          />
        ) : (
          <RecruiterPreferencesSetup
            onBack={() => setStep('register')}
            onComplete={handleComplete}
            registration={formData}
          />
        )}
      </div>
    </div>
  )
}

export default Register
