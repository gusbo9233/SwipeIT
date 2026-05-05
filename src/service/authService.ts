import accountsData from '../data/Account.json'
import type { RawAccount, User } from '../types/Account'

const userKey = 'swipeit:user'
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

  login(email: string, password: string): User | null {
    const account = accounts.find(
      (candidateAccount) =>
        candidateAccount.email.toLowerCase() === email.toLowerCase() &&
        candidateAccount.password === password,
    )

    if (!account) {
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
      window.localStorage.setItem('swipeit:isLoggedIn', 'true')
    } catch (error) {
      console.error('Failed to save user to storage', error)
    }

    return user
  },

  logout() {
    window.localStorage.removeItem(userKey)
    window.localStorage.removeItem('swipeit:isLoggedIn')
    window.location.href = '/login'
  },
}
