import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../features/auth/hooks/useAuthContext";

const RoleRoute = ({ allowedRoles }) => {
    const { user, isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default RoleRoute;