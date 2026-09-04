import { useCallback, useState } from "react";
import inventoryTransactionApi from "../api/inventoryTransactionApi";
import { PAGINATION } from "../../../constants/paginationConstants";

export default function useInventoryTransaction() {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [size, setSize] = useState(PAGINATION.DEFAULT_PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const loadTransactions = useCallback(
    async (inventoryId, params = {}) => {
      if (!inventoryId) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const requestParams = {
          page: params.page ?? PAGINATION.DEFAULT_PAGE,
          size: params.size ?? PAGINATION.DEFAULT_PAGE_SIZE,
        };

        const response = await inventoryTransactionApi.getByInventoryId(inventoryId,requestParams);

        const data = response.data;

        setTransactions(data?.content || []);
        setPage(data?.page ?? PAGINATION.DEFAULT_PAGE);
        setSize(data?.size ?? PAGINATION.DEFAULT_PAGE_SIZE);
        setTotalPages(data?.totalPages ?? 0);
        setTotalElements(data?.totalElements ?? 0);

        return response;
      } catch (err) {
        setError(
          err.response?.data?.message ||"Không thể tải lịch sử giao dịch kho.");

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearTransactions = useCallback(() => {
    setTransactions([]);
    setPage(PAGINATION.DEFAULT_PAGE);
    setTotalPages(0);
    setTotalElements(0);
  }, []);

  return {
    transactions,loading, error,page,size,totalPages,totalElements,
    loadTransactions,setPage,setSize,clearError, clearTransactions
  };
}