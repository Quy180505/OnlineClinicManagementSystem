import { useCallback, useEffect, useState } from "react";
import { staffApi } from "../api/StaffApi";
import { getErrorMessage } from "../../../utils/errorHandler";
import { PAGINATION } from "../../../constants/paginationConstants";

const DEFAULT_SEARCH_PARAMS = {
  keyword: null,
  page: PAGINATION.DEFAULT_PAGE,
  size: PAGINATION.DEFAULT_PAGE_SIZE,
};

export default function usePatientManagement() {
  const [patients, setPatients] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    page: PAGINATION.DEFAULT_PAGE,
    totalPages: 0,
    totalElements: 0,
  });

  const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMS);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPatients = useCallback(async (params) => {
    try {
      setLoading(true);
      setError("");

      const response = await staffApi.searchPatients(params);

      if (!response.success) {
        throw new Error(
          response.message || "Không thể lấy danh sách bệnh nhân.",
        );
      }

      const data = response.data;

      setPatients(data?.content || []);

      setPageInfo({
        page: data?.page ?? PAGINATION.DEFAULT_PAGE,
        totalPages: data?.totalPages ?? 0,
        totalElements: data?.totalElements ?? 0,
      });
    } catch (error) {
      setError(getErrorMessage(error, "Không thể tải danh sách bệnh nhân."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadPatients(DEFAULT_SEARCH_PARAMS);
    }, 0);

    return () => clearTimeout(timer);
  }, [loadPatients]);

  const handleSearch = useCallback(
    (params) => {
      const nextSearchParams = {
        ...params,
        page: PAGINATION.DEFAULT_PAGE,
        size: PAGINATION.DEFAULT_PAGE_SIZE,
      };

      setSearchParams(nextSearchParams);
      loadPatients(nextSearchParams);
    },
    [loadPatients],
  );

  const handlePageChange = useCallback(
    (page) => {
      const nextSearchParams = {
        ...searchParams,
        page,
      };

      setSearchParams(nextSearchParams);
      loadPatients(nextSearchParams);
    },
    [searchParams, loadPatients],
  );

  const retry = useCallback(() => {
    loadPatients(searchParams);
  }, [searchParams, loadPatients]);

  return {
    patients,
    pageInfo,
    searchParams,
    loading,
    error,
    handleSearch,
    handlePageChange,
    retry,
  };
}
