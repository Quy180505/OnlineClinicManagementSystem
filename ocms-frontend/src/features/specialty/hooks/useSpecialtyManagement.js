import { useCallback, useEffect, useState, useRef } from "react";
import { specialtyApi } from "../api/SpecialtyApi";
import { getErrorMessage } from "../../../utils/errorHandler";
import { PAGINATION } from "../../../constants/paginationConstants";

const DEFAULT_SEARCH_PARAMS = {
  keyword: null,
  page: PAGINATION.DEFAULT_PAGE,
  size: PAGINATION.DEFAULT_PAGE_SIZE,
  sortBy: "name",
  direction: "asc",
};

export default function useSpecialtyManagement() {
  const DEBOUNCE_DELAY = 350;
  const debounceRef = useRef(null);
  const [specialties, setSpecialties] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    page: PAGINATION.DEFAULT_PAGE,
    size: PAGINATION.DEFAULT_PAGE_SIZE,
    totalPages: 0,
    totalElements: 0,
  });

  const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMS);

  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const loadSpecialties = useCallback(async (params) => {
    try {
      setLoading(true);
      setError("");

      const response = await specialtyApi.getPage(params);

      if (!response.success) {
        throw new Error(
          response.message || "Không thể lấy danh sách chuyên khoa.",
        );
      }

      const data = response.data;

      setSpecialties(data?.content || []);

      setPageInfo({
        page: data?.page ?? PAGINATION.DEFAULT_PAGE,
        size: data?.size ?? PAGINATION.DEFAULT_PAGE_SIZE,
        totalPages: data?.totalPages ?? 0,
        totalElements: data?.totalElements ?? 0,
      });
    } catch (error) {
      setError(getErrorMessage(error, "Không thể tải danh sách chuyên khoa."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadSpecialties(DEFAULT_SEARCH_PARAMS);
    }, 0);

    return () => clearTimeout(timer);
  }, [loadSpecialties]);

  const searchSpecialties = useCallback(
    (keyword) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        const nextSearchParams = {
          ...searchParams,
          keyword: keyword?.trim() || null,
          page: PAGINATION.DEFAULT_PAGE,
          size: PAGINATION.DEFAULT_PAGE_SIZE,
        };

        setSearchParams(nextSearchParams);
        loadSpecialties(nextSearchParams);
      }, DEBOUNCE_DELAY);
    },
    [searchParams, loadSpecialties],
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handlePageChange = useCallback(
    (page) => {
      const nextSearchParams = {
        ...searchParams,
        page,
      };

      setSearchParams(nextSearchParams);
      loadSpecialties(nextSearchParams);
    },
    [searchParams, loadSpecialties],
  );

  const createSpecialty = useCallback(async (data) => {
    try {
      setProcessing(true);
      setActionError("");

      const response = await specialtyApi.create(data);

      if (!response.success) {
        throw new Error(response.message || "Không thể tạo chuyên khoa.");
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = getErrorMessage(error, "Không thể tạo chuyên khoa.");

      setActionError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setProcessing(false);
    }
  }, []);

  const deleteSpecialty = useCallback(
    async (specialtyId) => {
      try {
        setProcessing(true);
        setActionError("");

        const response = await specialtyApi.delete(specialtyId);

        if (!response.success) {
          throw new Error(response.message || "Không thể xóa chuyên khoa.");
        }

        await loadSpecialties(searchParams);

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        const message = getErrorMessage(error, "Không thể xóa chuyên khoa.");

        setActionError(message);

        return {
          success: false,
          message,
        };
      } finally {
        setProcessing(false);
      }
    },
    [searchParams, loadSpecialties],
  );

  const clearActionError = useCallback(() => {
    setActionError("");
  }, []);

  const retry = useCallback(() => {
    loadSpecialties(searchParams);
  }, [loadSpecialties, searchParams]);

  return {
    specialties,
    pageInfo,
    searchParams,
    loading,
    processing,
    error,
    actionError,
    searchSpecialties,
    handlePageChange,
    createSpecialty,
    deleteSpecialty,
    clearActionError,
    retry,
  };
}
