import type { ReactNode } from 'react'
import { AuthProvider } from './AuthContext'
import { SearchProvider } from './SearchProvider'

type AppProviderProps = {
  children: ReactNode
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <SearchProvider>{children}</SearchProvider>
    </AuthProvider>
  )
}

export default AppProvider
