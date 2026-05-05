import type { FormEvent } from 'react'
import Button from '../Button'
import type { RegisterFormData, RegistrationRole } from './types'

type RegisterWithRoleToggleProps = {
  formData: RegisterFormData
  isSubmitting?: boolean
  onChange: (formData: RegisterFormData) => void
  onNext: () => void | Promise<void>
}

const roles: Array<{
  description: string
  label: string
  value: RegistrationRole
}> = [
  {
    description: 'Find roles and let recruiters discover your profile.',
    label: 'Candidate',
    value: 'candidate',
  },
  {
    description: 'Find candidates and tune your hiring preferences.',
    label: 'Recruiter',
    value: 'recruiter',
  },
]

function RegisterWithRoleToggle({
  formData,
  isSubmitting = false,
  onChange,
  onNext,
}: RegisterWithRoleToggleProps) {
  function updateField(field: keyof RegisterFormData, value: string) {
    onChange({ ...formData, [field]: value })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return
    await onNext()
  }

  return (
    <form className="register-card" onSubmit={handleSubmit}>
      <div className="register-card-header">
        <p className="eyebrow">Create account</p>
        <h1>Register</h1>
        <p>Choose how you want to use Swipe IT.</p>
      </div>

      <fieldset className="role-toggle">
        <legend>Account type</legend>
        {roles.map((role) => (
          <label
            className={`role-option ${
              formData.role === role.value ? 'is-selected' : ''
            }`}
            key={role.value}
          >
            <input
              checked={formData.role === role.value}
              name="role"
              onChange={() => updateField('role', role.value)}
              type="radio"
              value={role.value}
            />
            <span>
              <strong>{role.label}</strong>
              <small>{role.description}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="field-grid">
        <label className="form-field">
          Name
          <input
            autoComplete="name"
            onChange={(event) => updateField('name', event.target.value)}
            required
            type="text"
            value={formData.name}
          />
        </label>
        <label className="form-field">
          Email
          <input
            autoComplete="email"
            onChange={(event) => updateField('email', event.target.value)}
            required
            type="email"
            value={formData.email}
          />
        </label>
        <label className="form-field">
          Password
          <input
            autoComplete="new-password"
            minLength={8}
            onChange={(event) => updateField('password', event.target.value)}
            required
            type="password"
            value={formData.password}
          />
        </label>
      </div>

      <Button className="register-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Creating account...' : 'Continue'}
      </Button>
    </form>
  )
}

export default RegisterWithRoleToggle
