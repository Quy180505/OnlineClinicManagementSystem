import apiClient from "../../../services/apiClient";

export const prescriptionApi = {
  create: async (medicalRecordId, data) => {
    const response = await apiClient.post(`/prescriptions/medical-records/${medicalRecordId}`,data,);

    return response.data;
  },

  getById: async (prescriptionId) => {
    const response = await apiClient.get(`/prescriptions/${prescriptionId}`,);

    return response.data;
  },

  searchMy: async (params = {}) => {
    const response = await apiClient.get( "/prescriptions/my",{ params },);

    return response.data;
  },

  getMyById: async (prescriptionId) => {
    const response = await apiClient.get(`/prescriptions/my/${prescriptionId}`);

    return response.data;
  },

  getByMedicalRecordId: async (medicalRecordId) => {
    const response = await apiClient.get(`/prescriptions/medical-records/${medicalRecordId}`,);

    return response.data;
  },

  getMyByMedicalRecord: async (medicalRecordId) => {
    const response = await apiClient.get(`/prescriptions/my/medical-records/${medicalRecordId}`,);

    return response.data;
  },
};