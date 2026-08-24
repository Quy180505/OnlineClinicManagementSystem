import apiClient from "../../../services/apiClient";

export const userApi = {
  createDoctor: async (data) => {
    const response = await apiClient.post("/admin/users/doctor", data);

    return response.data;
  },

  createStaff: async (data) => {
    const response = await apiClient.post("/admin/users/staff", data);

    return response.data;
  },

  search: async (data) => {
    const response = await apiClient.post("/admin/users/search", data);

    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/admin/users/${id}`);

    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient.patch(`/admin/users/${id}`, data);

    return response.data;
  },

  updateRole: async (id, data) => {
    const response = await apiClient.patch(`/admin/users/${id}/role`, data);

    return response.data;
  },

  updateStatus: async (id, data) => {
    const response = await apiClient.patch(`/admin/users/${id}/status`, data);

    return response.data;
  },
};
