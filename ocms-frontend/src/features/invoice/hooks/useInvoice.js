import { useCallback, useRef, useState } from "react";
import { invoiceApi } from "../api/invoiceApi";
import { PAGINATION } from "../../../constants/paginationConstants";

export default function useInvoice() {

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [size, setSize] = useState(PAGINATION.INVOICE_PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const searchParamsRef = useRef({});
  const [searchParams, setSearchParams] = useState({});

  const loadInvoices = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

        const currentParams = searchParamsRef.current;

        const filters = { ...currentParams, ...(params.paymentStatus !== undefined && {paymentStatus: params.paymentStatus,})};

        const requestParams = {
          page: params.page ?? PAGINATION.DEFAULT_PAGE,
          size: params.size ?? PAGINATION.INVOICE_PAGE_SIZE,
        };

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          requestParams[key] = value;
        }
      });

      const response = await invoiceApi.searchMy(requestParams);
      const data = response?.data;

      setInvoices(data?.content ?? []);
      setPage(data?.page ?? PAGINATION.DEFAULT_PAGE);
      setSize(data?.size ?? PAGINATION.INVOICE_PAGE_SIZE);
      setTotalPages(data?.totalPages ?? 0);
      setTotalElements(data?.totalElements ?? 0);

      searchParamsRef.current = filters;
      setSearchParams(filters);

      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Không thể tải danh sách hóa đơn.",);
      setInvoices([]);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    invoices,loading, error,page,size, totalPages,
    totalElements,searchParams,loadInvoices,clearError
  };
}