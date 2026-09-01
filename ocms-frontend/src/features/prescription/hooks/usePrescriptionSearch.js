import { useCallback, useRef, useState } from "react";
import { prescriptionApi } from "../api/prescriptionApi";
import { PAGINATION } from "../../../constants/paginationConstants";

export default function usePrescriptionSearch() {

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [size, setSize] = useState(PAGINATION.PRESCRIPTION_PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const searchParamsRef = useRef({
    fromDate: "",
    toDate: "",
  });

  const [searchParams, setSearchParams] = useState({
    fromDate: "",
    toDate: "",
  });

  const loadPrescriptions = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const currentParams = searchParamsRef.current;

      const filters = {
        fromDate: params.fromDate !== undefined ? params.fromDate : currentParams.fromDate,
        toDate: params.toDate !== undefined ? params.toDate : currentParams.toDate,
      };

      const requestParams = {
        page: params.page ?? PAGINATION.DEFAULT_PAGE,
        size: params.size ?? PAGINATION.PRESCRIPTION_PAGE_SIZE,
      };

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          requestParams[key] = value;
        }
      });

      const response = await prescriptionApi.searchMy(requestParams);
      const data = response.data?.data ?? response.data;

      setPrescriptions(data?.content || []);
      setPage(data?.page ?? PAGINATION.DEFAULT_PAGE);
      setSize(data?.size ?? PAGINATION.PRESCRIPTION_PAGE_SIZE);
      setTotalPages(data?.totalPages ?? 0);
      setTotalElements(data?.totalElements ?? 0);

      searchParamsRef.current = filters;
      setSearchParams(filters);

      return response;
    } catch (err) {
      setError(
        err.response?.data?.message || "Không thể tải danh sách đơn thuốc.",
      );

      setPrescriptions([]);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    prescriptions,loading, error,page,
    size, totalPages,totalElements,
    searchParams,loadPrescriptions, clearError,
  };
}
