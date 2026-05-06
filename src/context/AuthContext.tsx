import { useState, type ReactNode } from 'react'
import { authService } from '../service/authService'
import type { User } from '../types/Account'
import { AuthContext as AuthContextProvider } from './AuthProvider'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser())

  async function login(email: string, password: string) {
    const loggedInUser = await authService.login(email, password)

    if (loggedInUser) {
      setUser(loggedInUser)
    }

    return loggedInUser
  }

  function logout() {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContextProvider.Provider value={{ login, logout, user }}>
      {children}
    </AuthContextProvider.Provider>
  )
}
