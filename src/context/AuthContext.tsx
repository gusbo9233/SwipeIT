import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../service/authService'
import type { RegisterFormData } from '../types/Profile'
import type { User } from '../types/User'
import { AuthContext as AuthContextProvider } from './AuthProvider'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser())
  const navigate = useNavigate()

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
    navigate('/')
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
