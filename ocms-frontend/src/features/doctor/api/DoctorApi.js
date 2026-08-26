import apiClient from "../../../services/apiClient";

export const doctorApi = {
  
  getPage: async (params) => {
    const response = await apiClient.get("/doctors", { params,});
    return response.data;
  },

  getById: async (doctorId) => {
    const response = await apiClient.get(`/doctors/${doctorId}`);
    return response.data;
  },
};