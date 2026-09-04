import apiClient from "../../../services/apiClient";

export const invoiceApi = {
  searchMy: async (params = {}) => {
    const response = await apiClient.get("/invoices/my", {params});

    return response.data;
  },

  getMyById: async (invoiceId) => {
    const response = await apiClient.get(`/invoices/my/${invoiceId}`);
    return response.data;
  },
};