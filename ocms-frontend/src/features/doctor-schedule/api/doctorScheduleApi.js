import apiClient from "../../../services/apiClient";

export const doctorScheduleApi = {
  getPage: async (params) => {
    const response = await apiClient.get("/doctor-schedules", {params,});
    return response.data;
  },

  getById: async (doctorScheduleId) => {
    const response = await apiClient.get(`/doctor-schedules/${doctorScheduleId}`,);

    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post("/doctor-schedules", data);
    return response.data;
  },

  update: async (doctorScheduleId, data) => {
    const response = await apiClient.put(`/doctor-schedules/${doctorScheduleId}`,data,);
    return response.data;
  },

  delete: async (doctorScheduleId) => {
    const response = await apiClient.delete(`/doctor-schedules/${doctorScheduleId}`,);

    return response.data;
  },
};
