import accountsData from '../data/Account.json'
import { buildProfileFromAccount, saveStoredProfile } from '../data/profileStorage'
import { hashPassword } from '../helper/authHelper'
import type { RawAccount, User } from '../types/Account'

const userKey = 'swipeit_user'
const accounts = accountsData as RawAccount[]

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
    } catch (error) {
      console.error('Failed to update user in storage', error)
    }
  },

  async login(email: string, password: string): Promise<User | null> {
    const account = accounts.find(
      (candidateAccount) => candidateAccount.email.toLowerCase() === email.toLowerCase(),
    )

    if (!account) {
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
      saveStoredProfile(buildProfileFromAccount(account))
    } catch (error) {
      console.error('Failed to save user to storage', error)
    }

    return user
  },

  logout() {
    window.localStorage.removeItem(userKey)
    window.location.href = '/login'
  },
}
