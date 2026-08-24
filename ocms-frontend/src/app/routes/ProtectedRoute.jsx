import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../features/auth/hooks/useAuthContext";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;