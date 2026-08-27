import { useCallback, useEffect,useRef,  useState } from "react";

import { appointmentApi } from "../api/AppointmentApi";
import { getErrorMessage } from "../../../utils/errorHandler";
import { PAGINATION } from "../../../constants/paginationConstants";

const DEFAULT_SEARCH_PARAMS = {
  fromDate: null,
  toDate: null,
  page: PAGINATION.DEFAULT_PAGE,
  size: PAGINATION.DEFAULT_PAGE_SIZE,
  sortBy: "appointmentDate",
  direction: "asc",
};

export default function useAppointmentManagement() {
  const [appointments, setAppointments] = useState([]);

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
  const searchDebounceRef = useRef(null);

  const loadAppointments = useCallback(async (params) => {
    try {
      setLoading(true);
      setError("");

      const response = await appointmentApi.search(params);

      if (!response.success) {
        throw new Error(response.message || "Không thể lấy danh sách lịch khám.",);
      }

      const data = response.data;

      setAppointments(data?.content || []);

      setPageInfo({
        page: data?.page ?? PAGINATION.DEFAULT_PAGE,
        size: data?.size ?? PAGINATION.DEFAULT_PAGE_SIZE,
        totalPages: data?.totalPages ?? 0,
        totalElements: data?.totalElements ?? 0,
      });
    } catch (error) {
      setError(getErrorMessage(error, "Không thể tải danh sách lịch khám."));
    } finally {
      setLoading(false);
    }
  }, []);

  const searchAppointments = useCallback(
  ({ fromDate, toDate }) => {
    const currentYear = new Date().getFullYear();

    const isValidDate = (date) => {
      if (!date) {
        return true;
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false;
      }

      const [year, month, day] = date.split("-").map(Number);

      if (year < 1000 || year > currentYear) {
        return false;
      }

      const parsedDate = new Date(year, month - 1, day);

      return (
        parsedDate.getFullYear() === year &&
        parsedDate.getMonth() === month - 1 &&
        parsedDate.getDate() === day
      );
    };
    if (!isValidDate(fromDate) || !isValidDate(toDate)) {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
        searchDebounceRef.current = null;
      }

      return;
    }

    const nextSearchParams = {
      ...searchParams,
      fromDate: fromDate || null,
      toDate: toDate || null,
      page: PAGINATION.DEFAULT_PAGE,
      size: PAGINATION.DEFAULT_PAGE_SIZE,
    };

    setSearchParams(nextSearchParams);

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      loadAppointments(nextSearchParams);
      searchDebounceRef.current = null;
    }, 500);
  },[searchParams, loadAppointments]
);
  const handlePageChange = useCallback(
    (page) => {
      const nextSearchParams = {
        ...searchParams,
        page,
      };

      setSearchParams(nextSearchParams);

      loadAppointments(nextSearchParams);
    },[searchParams, loadAppointments]);

  const confirmAppointment = useCallback(
    async (appointmentId) => {
      try {
        setProcessing(true);
        setActionError("");

        const response = await appointmentApi.confirm(appointmentId);

        if (!response.success) {
          throw new Error(response.message || "Không thể xác nhận lịch khám.");
        }

        await loadAppointments(searchParams);

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        const message = getErrorMessage(error, "Không thể xác nhận lịch khám.");

        setActionError(message);

        return {
          success: false,
          message,
        };
      } finally {
        setProcessing(false);
      }
    },[searchParams, loadAppointments],);

  const rejectAppointment = useCallback(
    async (appointmentId, data) => {
      try {
        setProcessing(true);
        setActionError("");

        const response = await appointmentApi.reject(appointmentId, data);

        if (!response.success) {
          throw new Error(response.message || "Không thể từ chối lịch khám.");
        }

        await loadAppointments(searchParams);

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        const message = getErrorMessage(error, "Không thể từ chối lịch khám.");

        setActionError(message);

        return {
          success: false,
          message,
        };
      } finally {
        setProcessing(false);
      }
    },[searchParams, loadAppointments],);

  const cancelAppointment = useCallback(
    async (appointmentId) => {
      try {
        setProcessing(true);
        setActionError("");

        const response = await appointmentApi.cancel(appointmentId);

        if (!response.success) {
          throw new Error(response.message || "Không thể hủy lịch khám.");
        }

        await loadAppointments(searchParams);

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        const message = getErrorMessage(error, "Không thể hủy lịch khám.");

        setActionError(message);

        return {
          success: false,
          message,
        };
      } finally {
        setProcessing(false);
      }
    },[searchParams, loadAppointments]);

  const clearActionError = useCallback(() => {
    setActionError("");
  }, []);

  const retry = useCallback(() => {
    loadAppointments(searchParams);
  }, [loadAppointments, searchParams]);

  useEffect(() => {
        const timer = setTimeout(() => {loadAppointments(DEFAULT_SEARCH_PARAMS);}, 0);
        return () => clearTimeout(timer);

      }, [loadAppointments]);


  useEffect(() => {
      return () => {
        if (searchDebounceRef.current) {
          clearTimeout(searchDebounceRef.current);
        }
      };
    }, []);

  return {
    appointments,pageInfo,searchParams,loading,processing,error,actionError,
    loadAppointments,searchAppointments,handlePageChange,confirmAppointment,
    rejectAppointment,cancelAppointment,clearActionError, retry
  };
}
