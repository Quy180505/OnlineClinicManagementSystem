import apiClient from "../../../services/apiClient";

export const medicalRecordApi = {
  getByAppointmentId: async (appointmentId) => {
    const response = await apiClient.get(`/medical-records/appointment/${appointmentId}`);

    return response.data;
  },

  update: async (appointmentId, data) => {
    const response = await apiClient.patch(`/medical-records/appointment/${appointmentId}`, data);

    return response.data;
  },

   getMyHistory: async () => {

    const response = await apiClient.get("/medical-records/my-history");

    return response.data;
  },  

  getMyHistoryDetail: async (medicalRecordId) => {

    const response = await apiClient.get(`/medical-records/my-history/${medicalRecordId}`);

    return response.data;
  },
};
