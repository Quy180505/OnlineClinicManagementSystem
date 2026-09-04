import apiClient from "../../../services/apiClient";

export const reportApi = {
  
  getMonthlyRevenue: async (year) => {
    const response = await apiClient.get("/reports/revenue/monthly", { params: { year }});
    return response.data;
  },

  getQuarterlyRevenue: async (year) => {
    const response = await apiClient.get("/reports/revenue/quarterly", {params: { year }});
    return response.data;
  },

  getRevenueBySpecialty: async (year, quarter = null) => {
    const response = await apiClient.get("/reports/revenue/specialties", {
      params: {
        year,
        ...(quarter ? { quarter } : {}),
      },
    });
    return response.data;
  },

  getPatientsByAge: async (year) => {
    const response = await apiClient.get("/reports/patients/age", { params: { year }});
    return response.data;
  },

  getPatientsByGender: async (year) => {
    const response = await apiClient.get("/reports/patients/gender", {params: { year } });
    return response.data;
  },

  getPatientsBySpecialty: async (year) => {
    const response = await apiClient.get("/reports/patients/specialties", {params: { year }});
    return response.data;
  },
};