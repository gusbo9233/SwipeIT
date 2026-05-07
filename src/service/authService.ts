import { buildProfileFromAccount, getStoredProfile, saveStoredProfile } from '../data/profileStorage'
import {
  createAccountCredential,
  findAccountCredentialByEmail,
  updateAccountCredential,
} from '../data/accountCredentialsStorage'
import { hashPassword } from '../helper/authHelper'
import type { RegisterFormData } from '../types/Profile'
import type { User } from '../types/User'

const userKey = 'swipeit_user'

export const authService = {
  getCurrentUser(): User | null {
    try {
      const storedUser = window.localStorage.getItem(userKey)
      return storedUser ? (JSON.parse(storedUser) as User) : null
    } catch (error) {
      console.error('Failed to parse user from storage', error)
      return null
    }
  },

  updateCurrentUser(user: User) {
    try {
      window.localStorage.setItem(userKey, JSON.stringify(user))
      updateAccountCredential(user)
    } catch (error) {
      console.error('Failed to update user in storage', error)
    }
  },

  async login(email: string, password: string): Promise<User | null> {
    const account = findAccountCredentialByEmail(email)

    if (!account || !account.password) {
      return null
    }

    const inputHash = await hashPassword(password)

    if (inputHash !== account.password) {
      return null
    }

    const user: User = {
      email: account.email,
      id: account.id,
      name: account.name,
      role: account.role,
    }

    try {
      window.localStorage.setItem(userKey, JSON.stringify(user))
      if (!getStoredProfile(user)) {
        saveStoredProfile(buildProfileFromAccount(account))
      }
    } catch (error) {
      console.error('Failed to save user to storage', error)
    }

    return user
  },

  async register(formData: RegisterFormData): Promise<User> {
    const account = await createAccountCredential(formData)
    const user: User = {
      email: account.email,
      id: account.id,
      name: account.name,
      role: account.role,
    }

    window.localStorage.setItem(userKey, JSON.stringify(user))

    return user
  },

  logout() {
    window.localStorage.removeItem(userKey)
  },
}
