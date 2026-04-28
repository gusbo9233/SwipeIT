export type RegistrationRole = 'candidate' | 'recruiter'

export type RegisterFormData = {
  email: string
  name: string
  password: string
  role: RegistrationRole
}
