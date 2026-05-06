import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { error, loading, session } = useAuth()

  if (loading) {
    return null
  }

  if (error) {
    return <p className="page">Could not verify your session. {error}</p>
  }

  if (!session) {
    return <Navigate replace to="/login" />
  }

  return <>{children}</>
}
