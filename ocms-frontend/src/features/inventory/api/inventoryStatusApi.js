import apiClient from "../../../services/apiClient";

const inventoryStatusApi = {
  getAll: () => apiClient.get("/inventory/statuses"),
};

export default inventoryStatusApi;