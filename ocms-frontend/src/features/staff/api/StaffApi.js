import apiClient from "../../../services/apiClient";

export const staffApi = {
  searchPatients: async (params = {}) => {
    const response = await apiClient.get("/staff/patients", { params });

    return response.data;
  },

  getPatient: async (patientId) => {
    const response = await apiClient.get(`/staff/patients/${patientId}`);

    return response.data;
  },

  updatePatient: async (patientId, data) => {
    const response = await apiClient.put(`/staff/patients/${patientId}`, data);

    return response.data;
  },
};
