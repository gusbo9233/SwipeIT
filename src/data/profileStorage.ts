import type {
  CandidateProfileData,
  RecruiterProfileData,
  RegisterFormData,
  UserProfile,
} from '../types/Profile'

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
  hiringLocation: '',
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
    const parsedProfile: unknown = JSON.parse(storedProfile)

    if (isUserProfile(parsedProfile)) {
      return parsedProfile
    }

    return null
  } catch {
    return null
  }
}

export function saveStoredProfile(profile: UserProfile) {
  window.localStorage.setItem(storageKey, JSON.stringify(profile))
}

function isUserProfile(profile: unknown): profile is UserProfile {
  if (!isRecord(profile)) {
    return false
  }

  return (
    typeof profile.email === 'string' &&
    typeof profile.name === 'string' &&
    isRegistrationRole(profile.role) &&
    isCandidateProfile(profile.candidate) &&
    isRecruiterProfile(profile.recruiter)
  )
}

function isCandidateProfile(profile: unknown): profile is CandidateProfileData {
  if (!isRecord(profile)) {
    return false
  }

  return (
    typeof profile.fullName === 'string' &&
    typeof profile.github === 'string' &&
    typeof profile.linkedIn === 'string' &&
    typeof profile.phoneNumber === 'string' &&
    isStringArray(profile.skills) &&
    isStringArray(profile.workPreferences)
  )
}

function isRecruiterProfile(profile: unknown): profile is RecruiterProfileData {
  if (!isRecord(profile)) {
    return false
  }

  return (
    typeof profile.companyName === 'string' &&
    typeof profile.companySize === 'string' &&
    typeof profile.email === 'string' &&
    typeof profile.hiringLocation === 'string' &&
    typeof profile.linkedIn === 'string' &&
    typeof profile.rolePitch === 'string' &&
    typeof profile.website === 'string'
  )
}

function isRegistrationRole(role: unknown) {
  return role === 'candidate' || role === 'recruiter'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}
