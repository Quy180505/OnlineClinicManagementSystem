import apiClient from "../../../services/apiClient";
import { PAGINATION } from "../../../constants/paginationConstants";
export const laboratoryApi = {

  getMyResults: async () => {

    const response = await apiClient.get("/laboratory/patient/results");
    return response.data;
  },

  getMyResultDetail: async (labResultId) => {

    const response = await apiClient.get(`/laboratory/patient/results/${labResultId}`);
    return response.data;
  },

  createTestOrder: async (medicalRecordId, data) => {

    const response = await apiClient.post(`/laboratory/medical-records/${medicalRecordId}/test-orders`, data);
    return response.data;
  },

  
  getTestOrder: async (testOrderId) => {
    const response = await apiClient.get(`/laboratory/test-orders/${testOrderId}`);

    return response.data;
  },  

   getTestOrders: async ({status = "PENDING", page = PAGINATION.DEFAULT_PAGE, size = PAGINATION.LABORATORY_PAGE_SIZE} = {}) => {
    const response = await apiClient.get("/laboratory/test-orders",
      {
        params: {status,page,size},
      }
    );

    return response.data;
  },


  startTestOrder: async (testOrderId) => {
    const response = await apiClient.patch(`/laboratory/test-orders/${testOrderId}/start`);

    return response.data;
  },

  updateLabResult: async (testOrderDetailId, data) => {
    const response = await apiClient.patch(`/laboratory/test-order-details/${testOrderDetailId}/result`,data);

    return response.data;
  },

  
  getLabResult: async (testOrderDetailId) => {
    const response = await apiClient.get(`/laboratory/test-order-details/${testOrderDetailId}/result`);
    return response.data;
  },

  getAvailableTestServices: async (medicalRecordId,{ keyword = "", page = 0, size = 5 } = {}) => {
    const response = await apiClient.get( `/laboratory/medical-records/${medicalRecordId}/available-test-services`,
      {
        params: {keyword,page,size},
      }
    );

    return response.data;
  },

 getTestOrdersByMedicalRecord: async (medicalRecordId) => {
    const response = await apiClient.get(`/laboratory/medical-records/${medicalRecordId}/test-orders`);

    return response.data;
  },
};