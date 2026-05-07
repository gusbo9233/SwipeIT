import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import type { UserRole } from '../types/User'
import { loginRoute } from './Login'
import { notFoundRoute } from './NotFound'

type ProtectedRouteProps = {
  allowedRoles: UserRole[]
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to={loginRoute} replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={notFoundRoute} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
