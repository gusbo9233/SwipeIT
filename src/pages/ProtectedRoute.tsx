import { Navigate, Outlet } from 'react-router-dom';
import type { UserRole } from '../types/Account';
import { useAuth } from '../context/AuthProvider';

interface ProtectedRouteProps {
    allowedRoles: UserRole[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="*" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;