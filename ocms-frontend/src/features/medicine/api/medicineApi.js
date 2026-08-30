import apiClient from "../../../services/apiClient";

const medicineApi = {
  search: async (params = {}) => {
    const response = await apiClient.get("/medicines", { params});

    return response.data;
  },

  getById: async (medicineId) => {
    const response = await apiClient.get(`/medicines/${medicineId}`);

    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post("/medicines", data);

    return response.data;
  },

  update: async (medicineId, data) => {
    const response = await apiClient.patch(`/medicines/${medicineId}`, data);

    return response.data;
  },

  delete: async (medicineId) => {
    const response = await apiClient.delete(`/medicines/${medicineId}`);

    return response.data;
  },

  restore: async (medicineId) => {
    const response = await apiClient.patch(`/medicines/${medicineId}/restore`);

    return response.data;
  },
};

export default medicineApi;
