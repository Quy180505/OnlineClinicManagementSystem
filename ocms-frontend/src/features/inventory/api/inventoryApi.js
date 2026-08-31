import apiClient from "../../../services/apiClient";

const inventoryApi = {
  search: async (params = {}) => {

    const response = await apiClient.get("/inventory", {params});
    return response.data;
  },

  getById: async (inventoryId) => {

    const response = await apiClient.get(`/inventory/${inventoryId}`);
    return response.data;
  },

  importMedicine: async (data) => {

    const response = await apiClient.post("/inventory/import", data);
    return response.data;
  },
};

export default inventoryApi;
