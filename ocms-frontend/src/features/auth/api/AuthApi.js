import apiClient from "../../../services/apiClient";

export const authApi = {
    login: async (credentials) => {
        const response = await apiClient.post( "/auth/login",credentials);
        return response.data;
    },

    register: async (registerData) => {
        const response = await apiClient.post("/auth/register",registerData);
        return response.data;
    },
};