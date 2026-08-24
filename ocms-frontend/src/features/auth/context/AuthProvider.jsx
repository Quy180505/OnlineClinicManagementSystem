import { useState,useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { authStorage } from "../utils/AuthStorage";
import { authApi } from "../api/AuthApi";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => authStorage.getUser());

    const [isAuthenticated, setIsAuthenticated] = useState(
        () => authStorage.isAuthenticated()
    );

    const login = async (credentials) => {
        const response = await authApi.login(credentials);

        if (!response.success) {
            throw new Error(response.message);
        }

        authStorage.saveAuth(response.data);

        setUser({
            userId: response.data.userId,
            username: response.data.username,
            fullName: response.data.fullName,
            role: response.data.role,
        });

        setIsAuthenticated(true);

        return response.data;
    };

    const register = async (registerData) => {
        const response = await authApi.register(registerData);

        if (!response.success) {
            throw new Error(response.message);
        }

        authStorage.saveAuth(response.data);

        setUser({
            userId: response.data.userId,
            username: response.data.username,
            fullName: response.data.fullName,
            role: response.data.role,
        });

        setIsAuthenticated(true);

        return response.data;
    };

    const loginWithOAuth2 = useCallback((authData) => {
        authStorage.saveAuth(authData);

        setUser({
            userId: authData.userId,
            username: authData.username,
            fullName: authData.fullName,
            role: authData.role,
        });

        setIsAuthenticated(true);
    }, []);

    const logout = () => {
        authStorage.clearAuth();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                register,
                loginWithOAuth2,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};