import { createContext, useContext } from 'react'
import type { Session } from '@supabase/supabase-js'
import type { RegistrationRole } from '../types/Profile'

export type AuthUser = {
  email: string
  id: string
  name: string
  role: RegistrationRole
}

export type AuthContextValue = {
  error: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<AuthUser | null>
  logout: () => Promise<void>
  session: Session | null
  user: AuthUser | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
