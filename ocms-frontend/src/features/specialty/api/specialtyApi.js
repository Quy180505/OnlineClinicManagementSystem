import apiClient from "../../../services/apiClient";

export const specialtyApi = {
    getAll: async () => {
        const response = await apiClient.get("/specialties/all");

        return response.data;
    },
};