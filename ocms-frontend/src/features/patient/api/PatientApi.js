import apiClient from "../../../services/apiClient";

export const patientApi = {
  getMyProfile: async () => {
    const response = await apiClient.get("/patient/profile");

    return response.data;
  },

  updateProfile: async (data) => {
    const response = await apiClient.put("/patient/profile", data);

    return response.data;
  },

  updateAccount: async (data) => {
    const response = await apiClient.put("/patient/account", data);

    return response.data;
  },
};