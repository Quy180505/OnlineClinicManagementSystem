import apiClient from "../../../services/apiClient";

export const appointmentApi = {
  create: async (data) => {
    const response = await apiClient.post("/appointments", data);
    return response.data;
  },

  getMyAppointments: async (params = {}) => {
    const response = await apiClient.get("/appointments/my", {
      params,
    });
    return response.data;
  },

  getById: async (appointmentId) => {
    const response = await apiClient.get(`/appointments/${appointmentId}`);
    return response.data;
  },

  search: async (params = {}) => {
    const response = await apiClient.get("/appointments", {params});
    return response.data;
  },

  confirm: async (appointmentId) => {
    const response = await apiClient.patch(`/appointments/${appointmentId}/confirm`);
    return response.data;
  },

  reject: async (appointmentId, data) => {
    const response = await apiClient.patch(
      `/appointments/${appointmentId}/reject`,data);
    return response.data;
  },

  cancel: async (appointmentId) => {
    const response = await apiClient.patch(`/appointments/${appointmentId}/cancel`);
    return response.data;
  },

  
};
