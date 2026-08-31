import apiClient from "../../../services/apiClient";

const inventoryTransactionApi = {
  
  getByInventoryId: async (inventoryId, params = {}) => {

    const response = await apiClient.get(`/inventory/${inventoryId}/transactions`,{params});

    return response.data;
  },
};

export default inventoryTransactionApi;