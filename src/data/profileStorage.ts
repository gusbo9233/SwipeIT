import type {
  CandidateProfileData,
  RecruiterProfileData,
  RegisterFormData,
  UserProfile,
} from '../components/registration/types'

const storageKey = 'swipeit:user-profile'

export const defaultCandidateProfile: CandidateProfileData = {
  fullName: '',
  github: '',
  linkedIn: '',
  phoneNumber: '',
  skills: ['React', 'Node.js', 'TypeScript'],
  workPreferences: ['full-time'],
}

export const defaultRecruiterProfile: RecruiterProfileData = {
  companyName: '',
  companySize: '',
  email: '',
  hiringFocus: ['Frontend', 'Backend', 'Full-stack'],
  hiringLocation: '',
  hiringSignals: ['permanent'],
  linkedIn: '',
  rolePitch: '',
  website: '',
}

export function buildProfileFromRegistration(
  formData: RegisterFormData,
  candidateProfile: CandidateProfileData = defaultCandidateProfile,
  recruiterProfile: RecruiterProfileData = defaultRecruiterProfile,
): UserProfile {
  return {
    candidate: {
      ...defaultCandidateProfile,
      ...candidateProfile,
      fullName: candidateProfile.fullName || formData.name,
    },
    email: formData.email,
    name: formData.name,
    recruiter: {
      ...defaultRecruiterProfile,
      ...recruiterProfile,
      companyName: recruiterProfile.companyName || formData.name,
      email: recruiterProfile.email || formData.email,
    },
    role: formData.role,
  }
}

export function getStoredProfile(): UserProfile | null {
  const storedProfile = window.localStorage.getItem(storageKey)

  if (!storedProfile) {
    return null
  }

  try {
    return JSON.parse(storedProfile) as UserProfile
  } catch {
    return null
  }
}

export function saveStoredProfile(profile: UserProfile) {
  window.localStorage.setItem(storageKey, JSON.stringify(profile))
}
