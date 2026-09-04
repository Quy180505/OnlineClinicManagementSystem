import apiClient from "../../../services/apiClient";

const medicineCategoryApi = {
  search: async (params = {}) => {
    const response = await apiClient.get("/medicine-categories", { params});

    return response.data;
  },

  getById: async (categoryId) => {
    const response = await apiClient.get(`/medicine-categories/${categoryId}`);

    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post("/medicine-categories", data);

    return response.data;
  },

  update: async (categoryId, data) => {
    const response = await apiClient.patch(`/medicine-categories/${categoryId}`,data );

    return response.data;
  },

  delete: async (categoryId) => {
    const response = await apiClient.delete(`/medicine-categories/${categoryId}`,);
    return response.data;
  },
};

export default medicineCategoryApi;
