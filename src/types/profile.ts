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
  hiringFocus: string[]
  hiringLocation: string
  hiringSignals: string[]
  linkedIn: string
  rolePitch: string
  website: string
}

type UserProfileBase = {
  email: string
  name: string
}

export type CandidateUserProfile = UserProfileBase & {
  role: 'candidate'
  candidate: CandidateProfileData
}

export type RecruiterUserProfile = UserProfileBase & {
  role: 'recruiter'
  recruiter: RecruiterProfileData
}

export type UserProfile = CandidateUserProfile | RecruiterUserProfile
