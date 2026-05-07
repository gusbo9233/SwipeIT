export type RegistrationRole = 'candidate' | 'recruiter'

export type RegisterFormData = {
  email: string
  name: string
  password: string
  role: RegistrationRole
}

export type CandidateProfileData = {
  fullName: string
  github: string
  linkedIn: string
  phoneNumber: string
  skills: string[]
  workPreferences: string[]
}

export type RecruiterProfileData = {
  companyName: string
  companySize: string
  email: string
  hiringLocation: string
  linkedIn: string
  rolePitch: string
  website: string
}

export type UserProfile = {
  candidate: CandidateProfileData
  email: string
  name: string
  recruiter: RecruiterProfileData
  role: RegistrationRole
}
