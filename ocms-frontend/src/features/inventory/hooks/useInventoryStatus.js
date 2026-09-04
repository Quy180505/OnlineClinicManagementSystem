import { useCallback, useState } from "react";
import inventoryStatusApi from "../api/inventoryStatusApi";

export default function useInventoryStatus() {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadStatuses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await inventoryStatusApi.getAll();

      setStatuses(response.data?.data || []);

      return response;
    } catch (err) {
      setError(err.response?.data?.message ||"Không thể tải trạng thái kho.");

      setStatuses([]);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    statuses,loading,error,loadStatuses,clearError,
  };
}