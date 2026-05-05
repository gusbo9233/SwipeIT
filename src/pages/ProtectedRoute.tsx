import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import type { UserRole } from '../types/User'

type ProtectedRouteProps = {
  allowedRoles: UserRole[]
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
