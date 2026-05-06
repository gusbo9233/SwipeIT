import { createContext, useContext } from 'react'
import type { User } from '../types/Account'

export type AuthContextValue = {
  login: (email: string, password: string) => Promise<User | null>
  logout: () => void
  updateUser: (user: User) => void
  user: User | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
