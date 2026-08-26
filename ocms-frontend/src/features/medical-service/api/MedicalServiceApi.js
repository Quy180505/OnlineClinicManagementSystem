import apiClient from "../../../services/apiClient";

export const medicalServiceApi = {
  getPage: async (params) => {
    const response = await apiClient.get("/medical-services", {
      params,
    });

    return response.data;
  },

  getById: async (medicalServiceId) => {
    const response = await apiClient.get(
      `/medical-services/${medicalServiceId}`,
    );

    return response.data;
  },

  getBySpecialty: async (specialtyId) => {
    const response = await apiClient.get(
      `/medical-services/specialty/${specialtyId}`,
    );

    return response.data;
  },

  getExaminationServicesBySpecialty: async (specialtyId) => {
    const response = await apiClient.get(
      `/medical-services/specialty/${specialtyId}/examination`,
    );

    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post("/medical-services", data);

    return response.data;
  },

  update: async (medicalServiceId, data) => {
    const response = await apiClient.put(
      `/medical-services/${medicalServiceId}`,
      data,
    );

    return response.data;
  },

  partialUpdate: async (medicalServiceId, data) => {
    const response = await apiClient.patch(
      `/medical-services/${medicalServiceId}`,
      data,
    );

    return response.data;
  },

  delete: async (medicalServiceId) => {
    const response = await apiClient.delete(
      `/medical-services/${medicalServiceId}`,
    );

    return response.data;
  },
};
