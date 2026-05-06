import { useState, type ReactNode } from 'react'
import { authService } from '../service/authService'
import type { RegisterFormData } from '../types/Profile'
import type { User } from '../types/User'
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

  async function register(formData: RegisterFormData) {
    const registeredUser = await authService.register(formData)
    setUser(registeredUser)
    return registeredUser
  }

  function updateUser(user: User) {
    authService.updateCurrentUser(user)
    setUser(user)
  }

  return (
    <AuthContextProvider.Provider value={{ login, logout, register, updateUser, user }}>
      {children}
    </AuthContextProvider.Provider>
  )
}
