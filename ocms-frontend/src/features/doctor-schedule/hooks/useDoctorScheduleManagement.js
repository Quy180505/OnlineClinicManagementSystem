import { useCallback, useEffect, useRef, useState } from "react";

import { doctorScheduleApi } from "../api/DoctorScheduleApi";
import { doctorApi } from "../../doctor/api/DoctorApi";
import { getErrorMessage } from "../../../utils/errorHandler";
import { PAGINATION } from "../../../constants/paginationConstants";

const DEBOUNCE_DELAY = 400;

const DEFAULT_SEARCH_PARAMS = {
  doctorId: null,
  workDate: null,
  page: PAGINATION.DEFAULT_PAGE,
  size: PAGINATION.DEFAULT_PAGE_SIZE,
  sortBy: "workDate",
  direction: "asc",
};

export default function useDoctorScheduleManagement() {
  const doctorDebounceRef = useRef(null);

  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    page: PAGINATION.DEFAULT_PAGE,
    size: PAGINATION.DEFAULT_PAGE_SIZE,
    totalPages: 0,
    totalElements: 0,
  });

  const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMS);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [doctorLoading, setDoctorLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const loadDoctorSchedules = useCallback(async (params) => {
    try {
      setLoading(true);
      setError("");

      const response = await doctorScheduleApi.getPage(params);

      if (!response.success) {
        throw new Error(
          response.message || "Không thể lấy danh sách lịch làm việc.",
        );
      }

      const data = response.data;

      setDoctorSchedules(data?.content || []);

      setPageInfo({
        page: data?.page ?? PAGINATION.DEFAULT_PAGE,
        size: data?.size ?? PAGINATION.DEFAULT_PAGE_SIZE,
        totalPages: data?.totalPages ?? 0,
        totalElements: data?.totalElements ?? 0,
      });
    } catch (error) {
      setError(
        getErrorMessage(error, "Không thể tải danh sách lịch làm việc."),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const searchDoctors = useCallback((keyword) => {
    if (doctorDebounceRef.current) {
      clearTimeout(doctorDebounceRef.current);
    }

    const trimmedKeyword = keyword?.trim() || "";

    if (trimmedKeyword.length < PAGINATION.DOCTOR_SEARCH_MIN_LENGTH) {
      setDoctors([]);
      setDoctorLoading(false);
      return;
    }

    doctorDebounceRef.current = setTimeout(async () => {
      try {
        setDoctorLoading(true);
        setError("");

        const response = await doctorApi.getPage({
          keyword: trimmedKeyword,
          page: PAGINATION.DEFAULT_PAGE,
          size: PAGINATION.DOCTOR_SEARCH_SIZE,
          sortBy: "fullName",
          direction: "asc",
        });

        if (!response.success) {
          throw new Error(
            response.message || "Không thể tải danh sách bác sĩ.",
          );
        }

        setDoctors(response.data?.content || []);
      } catch (error) {
        setError(getErrorMessage(error, "Không thể tải danh sách bác sĩ."));

        setDoctors([]);
      } finally {
        setDoctorLoading(false);
      }
    }, DEBOUNCE_DELAY);
  }, []);

  const searchDoctorSchedules = useCallback(
    ({ doctorId, workDate }) => {
      const nextSearchParams = {
        ...searchParams,
        doctorId: doctorId ? Number(doctorId) : null,
        workDate: workDate || null,
        page: PAGINATION.DEFAULT_PAGE,
        size: PAGINATION.DEFAULT_PAGE_SIZE,
      };

      setSearchParams(nextSearchParams);
      loadDoctorSchedules(nextSearchParams);
    },
    [searchParams, loadDoctorSchedules],
  );

  const handlePageChange = useCallback(
    (page) => {
      const nextSearchParams = { ...searchParams, page};

      setSearchParams(nextSearchParams);
      loadDoctorSchedules(nextSearchParams);
    },[searchParams, loadDoctorSchedules]);

  const createDoctorSchedule = useCallback(
    async (data) => {
      try {
        setProcessing(true);
        setActionError("");

        const response = await doctorScheduleApi.create(data);

        if (!response.success) {
          throw new Error(response.message || "Không thể tạo lịch làm việc.");
        }

        await loadDoctorSchedules(searchParams);

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {

        const message = getErrorMessage(error, "Không thể tạo lịch làm việc.");
        setActionError(message);
        return { success: false,message};
      } finally {
        setProcessing(false);
      }
    }, [searchParams, loadDoctorSchedules]);

  const deleteDoctorSchedule = useCallback(
    async (doctorScheduleId) => {
      try {
        setProcessing(true);
        setActionError("");

        const response = await doctorScheduleApi.delete(doctorScheduleId);

        if (!response.success) {
          throw new Error(response.message || "Không thể xóa lịch làm việc.");
        }

        await loadDoctorSchedules(searchParams);

        return { success: true,data: response.data};
      } catch (error) {
        const message = getErrorMessage(error, "Không thể xóa lịch làm việc.");

        setActionError(message);

        return {success: false,message};
      } finally {
        setProcessing(false);
      }
    },[searchParams, loadDoctorSchedules],);

  const clearActionError = useCallback(() => { setActionError("");}, []);

  const retry = useCallback(() => {loadDoctorSchedules(searchParams);}, [loadDoctorSchedules, searchParams]);

  useEffect(() => {
    return () => {
      if (doctorDebounceRef.current) {
        clearTimeout(doctorDebounceRef.current);
      }
    };
  }, []);

  return {
    doctorSchedules,doctors,pageInfo,searchParams,loading, processing,doctorLoading,error,actionError,
    loadDoctorSchedules,searchDoctors, searchDoctorSchedules,handlePageChange,createDoctorSchedule,deleteDoctorSchedule,
    clearActionError,retry,
  };
}
