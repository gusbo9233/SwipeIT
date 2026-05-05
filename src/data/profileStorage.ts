import { supabase } from '../lib/supabase'
import type {
  CandidateProfileData,
  RecruiterProfileData,
  RegisterFormData,
  UserProfile,
} from '../types/profile'

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

export function buildCandidateProfile(
  formData: RegisterFormData,
  candidateProfile?: Partial<CandidateProfileData>,
): UserProfile {
  return {
    email: formData.email,
    name: formData.name,
    role: 'candidate',
    candidate: {
      ...defaultCandidateProfile,
      ...candidateProfile,
      fullName: candidateProfile?.fullName || formData.name,
    },
  }
}

export function buildRecruiterProfile(
  formData: RegisterFormData,
  recruiterProfile?: Partial<RecruiterProfileData>,
): UserProfile {
  return {
    email: formData.email,
    name: formData.name,
    role: 'recruiter',
    recruiter: {
      ...defaultRecruiterProfile,
      ...recruiterProfile,
      companyName: recruiterProfile?.companyName || formData.name,
      email: recruiterProfile?.email || formData.email,
    },
  }
}

export async function getStoredProfile(): Promise<UserProfile | null> {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) throw new Error(userError.message)
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('name, email, role, candidate, recruiter')
    .eq('id', user.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(error.message)
  }

  if (!data) return null

  const base = { name: data.name ?? '', email: data.email ?? '' }

  if (data.role === 'recruiter') {
    return {
      ...base,
      role: 'recruiter',
      recruiter: { ...defaultRecruiterProfile, ...(data.recruiter as RecruiterProfileData) },
    }
  }

  return {
    ...base,
    role: 'candidate',
    candidate: { ...defaultCandidateProfile, ...(data.candidate as CandidateProfileData) },
  }
}

export async function saveStoredProfile(profile: UserProfile): Promise<void> {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) throw new Error(userError.message)
  if (!user) throw new Error('Not signed in.')

  const payload = {
    id: user.id,
    name: profile.name,
    email: profile.email,
    role: profile.role,
    candidate: profile.role === 'candidate' ? profile.candidate : {},
    recruiter: profile.role === 'recruiter' ? profile.recruiter : {},
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('profiles').upsert(payload)
  if (error) throw new Error(error.message)
}
