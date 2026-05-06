export type UserRole = 'recruiter' | 'candidate'

export type User = {
  email: string
  id: string
  name: string
  role: UserRole
}

export type RawAccount = User & {
  candidateId?: string
  password: string
  recruiterId?: string
}
