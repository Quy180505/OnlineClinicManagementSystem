import apiClient from "../../../services/apiClient";

export const paymentApi = {
  createPayment: async (invoiceId, data) => {
    const response = await apiClient.post(`/payments/invoices/${invoiceId}`, data);

    return response.data;
  },

  getMyPayment: async (invoiceId) => {
    const response = await apiClient.get(`/payments/invoices/${invoiceId}`);

    return response.data;
  },
};