export type UserRole = 'recruiter' | 'candidate'

export type User = {
  email: string
  id: string
  name: string
  role: UserRole
}

export type RawUser = User & {
  candidateId?: string
  password?: string
  recruiterId?: string
}
