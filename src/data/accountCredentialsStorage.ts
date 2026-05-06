import accountCredentials from './AccountCredentials.json'
import { hashPassword } from '../helper/authHelper'
import type { RegisterFormData } from '../types/Profile'
import type { RawUser, User } from '../types/User'

const accountCredentialsKey = 'swipeit:account-credentials'
const fixtureAccounts = accountCredentials as RawUser[]

export function getAccountCredentials(): RawUser[] {
  const storedAccounts = window.localStorage.getItem(accountCredentialsKey)

  if (!storedAccounts) {
    saveAccountCredentials(fixtureAccounts)
    return fixtureAccounts
  }

  try {
    const parsedAccounts: unknown = JSON.parse(storedAccounts)

    if (isRawUserArray(parsedAccounts)) {
      return parsedAccounts
    }

    saveAccountCredentials(fixtureAccounts)
    return fixtureAccounts
  } catch {
    saveAccountCredentials(fixtureAccounts)
    return fixtureAccounts
  }
}

export async function createAccountCredential(formData: RegisterFormData): Promise<RawUser> {
  const accounts = getAccountCredentials()
  const normalizedEmail = formData.email.trim().toLowerCase()

  if (
    accounts.some((account) => account.email.trim().toLowerCase() === normalizedEmail)
  ) {
    throw new Error('account-exists')
  }

  const account: RawUser = {
    email: formData.email.trim(),
    id: createAccountId(),
    name: formData.name.trim(),
    password: await hashPassword(formData.password),
    role: formData.role,
  }

  saveAccountCredentials([...accounts, account])

  return account
}

export function findAccountCredentialByEmail(email: string): RawUser | null {
  const normalizedEmail = email.trim().toLowerCase()

  return (
    getAccountCredentials().find(
      (account) => account.email.trim().toLowerCase() === normalizedEmail,
    ) ?? null
  )
}

export function updateAccountCredential(user: User) {
  const accounts = getAccountCredentials()
  const accountIndex = accounts.findIndex((account) => account.id === user.id)

  if (accountIndex === -1) {
    return
  }

  const nextAccounts = [...accounts]
  nextAccounts[accountIndex] = {
    ...nextAccounts[accountIndex],
    email: user.email,
    name: user.name,
    role: user.role,
  }

  saveAccountCredentials(nextAccounts)
}

function saveAccountCredentials(accounts: RawUser[]) {
  window.localStorage.setItem(accountCredentialsKey, JSON.stringify(accounts))
}

function createAccountId() {
  if ('randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `user-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function isRawUserArray(value: unknown): value is RawUser[] {
  return Array.isArray(value) && value.every(isRawUser)
}

function isRawUser(value: unknown): value is RawUser {
  if (!isRecord(value)) {
    return false
  }

  return (
    typeof value.email === 'string' &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    (value.password === undefined || typeof value.password === 'string') &&
    (value.role === 'candidate' || value.role === 'recruiter') &&
    (value.candidateId === undefined || typeof value.candidateId === 'string') &&
    (value.recruiterId === undefined || typeof value.recruiterId === 'string')
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
