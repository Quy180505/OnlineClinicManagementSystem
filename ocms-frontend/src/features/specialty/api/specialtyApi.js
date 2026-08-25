import apiClient from "../../../services/apiClient";

export const specialtyApi = {
  getAll: async () => {
    const response = await apiClient.get("/specialties/all");

    return response.data;
  },

  getPage: async (params) => {
    const response = await apiClient.get("/specialties", {
      params,
    });

    return response.data;
  },

  getById: async (specialtyId) => {
    const response = await apiClient.get(`/specialties/${specialtyId}`);

    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post("/specialties", data);

    return response.data;
  },

  update: async (specialtyId, data) => {
    const response = await apiClient.put(`/specialties/${specialtyId}`, data);

    return response.data;
  },

  partialUpdate: async (specialtyId, data) => {
    const response = await apiClient.patch(`/specialties/${specialtyId}`, data);

    return response.data;
  },

  delete: async (specialtyId) => {
    const response = await apiClient.delete(`/specialties/${specialtyId}`);

    return response.data;
  },
};
