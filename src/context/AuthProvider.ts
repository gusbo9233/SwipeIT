import { createContext, useContext } from 'react'
import type { RegisterFormData } from '../types/Profile'
import type { User } from '../types/User'

export type AuthContextValue = {
  login: (email: string, password: string) => Promise<User | null>
  logout: () => void
  register: (formData: RegisterFormData) => Promise<User>
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
