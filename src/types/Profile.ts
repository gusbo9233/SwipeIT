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

type UserProfileBase = {
  email: string
  name: string
}

export type CandidateUserProfile = UserProfileBase & {
  candidate: CandidateProfileData
  role: 'candidate'
}

export type RecruiterUserProfile = UserProfileBase & {
  recruiter: RecruiterProfileData
  role: 'recruiter'
}

export type UserProfile = CandidateUserProfile | RecruiterUserProfile
