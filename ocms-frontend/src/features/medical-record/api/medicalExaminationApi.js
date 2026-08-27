
import apiClient from "../../../services/apiClient";

export const medicalExaminationApi = {
  getTodayAppointments: async () => {
    const response = await apiClient.get("/medical-examinations/today");
    return response.data;
  },
  
  start: async (appointmentId) => {
    const response = await apiClient.patch(`/medical-examinations/${appointmentId}/start`);
    return response.data;
  },

  getTreatmentHistory: async (appointmentId) => {
    
    const response = await apiClient.get(`/medical-examinations/${appointmentId}/treatment-history`,);
    return response.data;
  },
};

