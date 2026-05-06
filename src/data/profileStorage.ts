import type {
  CandidateProfileData,
  RecruiterProfileData,
  RegisterFormData,
  UserProfile,
} from '../types/Profile'
import accountCredentials from './AccountCredentials.json'
import candidatesData from './Candidates.json'
import recruitersData from './Recruiters.json'
import type { RawUser, User } from '../types/User'
import type { Candidate } from '../types/Candidate'
import type { Recruiter } from '../types/Recruiter'

const storageKey = 'swipeit:user-profile'
const activeRecruiterProfileKey = 'activeProfile'
const accounts = accountCredentials as RawUser[]
const candidates = candidatesData as Candidate[]
const recruiters = recruitersData as Recruiter[]

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

export function buildProfileFromAccount(account: RawUser): UserProfile {
  const candidate = candidates.find((candidateProfile) => candidateProfile.id === account.candidateId)
  const recruiter = recruiters.find((recruiterProfile) => recruiterProfile.id === account.recruiterId)

  return buildProfileFromRegistration(
    {
      email: account.email,
      name: account.name,
      password: '',
      role: account.role,
    },
    candidate ? mapCandidateToProfile(candidate) : undefined,
    recruiter ? mapRecruiterToProfile(recruiter) : undefined,
  )
}

export function getProfileForUser(user: User): UserProfile {
  const account = accounts.find(
    (candidateAccount) =>
      candidateAccount.id === user.id ||
      candidateAccount.email.toLowerCase() === user.email.toLowerCase(),
  )

  if (account) {
    return buildProfileFromAccount(account)
  }

  return buildProfileFromRegistration({
    email: user.email,
    name: user.name,
    password: '',
    role: user.role,
  })
}

export function getStoredProfile(user?: User | null): UserProfile | null {
  const storedProfile = window.localStorage.getItem(storageKey)

  if (!storedProfile) {
    return null
  }

  try {
    const parsedProfile: unknown = JSON.parse(storedProfile)

    if (isUserProfile(parsedProfile)) {
      if (
        user &&
        (parsedProfile.email.toLowerCase() !== user.email.toLowerCase() ||
          parsedProfile.role !== user.role)
      ) {
        return null
      }

      return parsedProfile
    }

    return null
  } catch {
    return null
  }
}

export function saveStoredProfile(profile: UserProfile) {
  window.localStorage.setItem(storageKey, JSON.stringify(profile))
  syncActiveRecruiterProfile(profile)
}

function mapCandidateToProfile(candidate: Candidate): CandidateProfileData {
  return {
    fullName: candidate.name,
    github: candidate.githubUrl ?? '',
    linkedIn: candidate.linkedInUrl ?? '',
    phoneNumber: candidate.phoneNumber,
    skills: candidate.skills,
    workPreferences: ['full-time'],
  }
}

function mapRecruiterToProfile(recruiter: Recruiter): RecruiterProfileData {
  return {
    companyName: recruiter.name,
    companySize: getCompanySizeOption(recruiter.companySize),
    email: recruiter.email,
    hiringLocation: recruiter.address,
    linkedIn: recruiter.linkedInUrl,
    rolePitch: `Hiring technology talent for ${recruiter.name}.`,
    website: recruiter.website,
  }
}

function syncActiveRecruiterProfile(profile: UserProfile) {
  if (profile.role !== 'recruiter') {
    return
  }

  const [firstName = profile.name, ...lastNameParts] = profile.name.trim().split(' ')

  window.localStorage.setItem(
    activeRecruiterProfileKey,
    JSON.stringify({
      bio:
        profile.recruiter.rolePitch ||
        `Lead recruiter at ${profile.recruiter.companyName}. We are looking for amazing developers to join our mission.`,
      company: profile.recruiter.companyName,
      companyImage:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      email: profile.recruiter.email || profile.email,
      firstName,
      lastName: lastNameParts.join(' '),
      location: profile.recruiter.hiringLocation,
      logo: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
      name: profile.name,
      role: 'Recruiter',
      specialties: ['Recruiting', 'Hiring', 'Employer Branding'],
    }),
  )
}

function getCompanySizeOption(companySize: number) {
  if (companySize <= 10) {
    return '1-10'
  }

  if (companySize <= 50) {
    return '11-50'
  }

  if (companySize <= 200) {
    return '51-200'
  }

  return '201+'
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
