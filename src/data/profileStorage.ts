import { supabase } from '../lib/supabase'
import type { Candidate } from '../types/Candidate'
import type {
  CandidateProfileData,
  RecruiterProfileData,
  RegisterFormData,
  UserProfile,
} from '../types/Profile'

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

export function buildCandidateProfile(
  formData: RegisterFormData,
  candidateProfile?: Partial<CandidateProfileData>,
): UserProfile {
  return {
    candidate: {
      ...defaultCandidateProfile,
      ...candidateProfile,
      fullName: candidateProfile?.fullName || formData.name,
    },
    email: formData.email,
    name: formData.name,
    role: 'candidate',
  }
}

export function buildRecruiterProfile(
  formData: RegisterFormData,
  recruiterProfile?: Partial<RecruiterProfileData>,
): UserProfile {
  return {
    email: formData.email,
    name: formData.name,
    recruiter: {
      ...defaultRecruiterProfile,
      ...recruiterProfile,
      companyName: recruiterProfile?.companyName || formData.name,
      email: recruiterProfile?.email || formData.email,
    },
    role: 'recruiter',
  }
}

export async function getStoredProfile(): Promise<UserProfile | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw new Error(userError.message)
  }

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('name, email, role, candidate, recruiter')
    .eq('id', user.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }

    throw new Error(error.message)
  }

  if (!data) {
    return null
  }

  const base = {
    email: data.email ?? user.email ?? '',
    name: data.name ?? user.user_metadata.name ?? '',
  }

  if (data.role === 'recruiter') {
    return {
      ...base,
      recruiter: { ...defaultRecruiterProfile, ...(data.recruiter as Partial<RecruiterProfileData>) },
      role: 'recruiter',
    }
  }

  return {
    ...base,
    candidate: { ...defaultCandidateProfile, ...(data.candidate as Partial<CandidateProfileData>) },
    role: 'candidate',
  }
}

export async function saveStoredProfile(profile: UserProfile): Promise<void> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw new Error(userError.message)
  }

  if (!user) {
    throw new Error('Not signed in.')
  }

  const { error } = await supabase.from('profiles').upsert({
    candidate: profile.role === 'candidate' ? profile.candidate : {},
    email: profile.email,
    id: user.id,
    name: profile.name,
    recruiter: profile.role === 'recruiter' ? profile.recruiter : {},
    role: profile.role,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    throw new Error(error.message)
  }
}

type CandidateRow = {
  id: string
  name: string | null
  email: string | null
  candidate: Partial<CandidateProfileData> | null
}

export async function loadSwipeCandidates(): Promise<Candidate[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, candidate')
    .eq('role', 'candidate')

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []).map((row: CandidateRow) => {
    const c = row.candidate ?? {}
    return {
      id: row.id,
      name: c.fullName || row.name || 'Unknown',
      imageUrl: `https://i.pravatar.cc/600?u=${row.id}`,
      skills: c.skills ?? [],
      email: row.email ?? '',
      address: '',
      phoneNumber: c.phoneNumber ?? '',
      linkedInUrl: c.linkedIn || undefined,
      githubUrl: c.github || undefined,
      education: [],
      competences: [],
      references: [],
    }
  })
}
