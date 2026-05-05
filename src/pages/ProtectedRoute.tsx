import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../service/authService';

interface ProtectedRouteProps {
  userRole: string;
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const user = authService.getCurrentUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="*" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;