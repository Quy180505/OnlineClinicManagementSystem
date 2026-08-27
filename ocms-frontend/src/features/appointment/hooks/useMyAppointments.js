import { useCallback, useEffect, useState } from "react";

import { appointmentApi } from "../api/AppointmentApi";
import { appointmentStatusApi } from "../api/AppointmentStatusApi";
import { medicalServiceApi } from "../../medical-service/api/MedicalServiceApi";
import { getErrorMessage } from "../../../utils/errorHandler";
import { PAGINATION } from "../../../constants/paginationConstants";

const DEFAULT_SEARCH_PARAMS = {
  serviceId: null,
  appointmentStatusId: null,
  fromDate: null,
  toDate: null,
  page: PAGINATION.DEFAULT_PAGE,
  size: PAGINATION.DEFAULT_PAGE_SIZE,
  sortBy: "appointmentDate",
  direction: "desc",
};

export default function useMyAppointments() {

  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [appointmentStatuses, setAppointmentStatuses] = useState([]);
  
  const [pageInfo, setPageInfo] = useState({
    page: PAGINATION.DEFAULT_PAGE,
    size: PAGINATION.DEFAULT_PAGE_SIZE,
    totalPages: 0,
    totalElements: 0,
  });

  const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMS);
  const [loading, setLoading] = useState(false);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [error, setError] = useState("");

  const loadMyAppointments = useCallback(async (params) => {
    try {
      setLoading(true);
      setError("");

      const response = await appointmentApi.getMyAppointments(params);

      if (!response.success) {
        throw new Error(response.message || "Không thể lấy lịch khám của bạn.");
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
      setError(getErrorMessage(error, "Không thể tải lịch khám của bạn."));
    } finally {
      setLoading(false);
    }
  }, []);

  const loadServices = useCallback(async () => {
    try {
      setServiceLoading(true);

      const response = await medicalServiceApi.getPage({
        page: 0,
        size: 1000,
        sortBy: "serviceName",
        direction: "asc",
      });

      if (!response.success) {
        throw new Error(response.message || "Không thể tải danh sách dịch vụ.");
      }

      setServices(response.data?.content || []);
    } catch (error) {
      setServices([]);

      setError(getErrorMessage(error, "Không thể tải danh sách dịch vụ."));
    } finally {
      setServiceLoading(false);
    }
  }, []);

  const loadAppointmentStatuses = useCallback(async () => {
    try {
      setStatusLoading(true);

      const response = await appointmentStatusApi.getAll();

      if (!response.success) {
        throw new Error(
          response.message || "Không thể tải danh sách trạng thái.",
        );
      }

      setAppointmentStatuses(response.data || []);
    } catch (error) {
      setAppointmentStatuses([]);

      setError(getErrorMessage(error, "Không thể tải danh sách trạng thái."));
    } finally {
      setStatusLoading(false);
    }
  }, []);

const searchAppointments = useCallback(
  ({ appointmentStatusId, fromDate, toDate }) => {
    const nextSearchParams = {
      ...searchParams,

      appointmentStatusId: appointmentStatusId
        ? Number(appointmentStatusId)
        : null,

      fromDate: fromDate || null,
      toDate: toDate || null,

      page: PAGINATION.DEFAULT_PAGE,
      size: PAGINATION.DEFAULT_PAGE_SIZE,
    };

    setSearchParams(nextSearchParams);
    loadMyAppointments(nextSearchParams);
  }, [searchParams, loadMyAppointments]);

  const handlePageChange = useCallback(
    (page) => {
      const nextSearchParams = {
        ...searchParams,
        page,
      };

      setSearchParams(nextSearchParams);

      loadMyAppointments(nextSearchParams);
    },[searchParams, loadMyAppointments]);

  const retry = useCallback(() => {
    loadMyAppointments(searchParams);
  }, [loadMyAppointments, searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadMyAppointments(DEFAULT_SEARCH_PARAMS);
      loadServices();
      loadAppointmentStatuses();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadMyAppointments, loadServices, loadAppointmentStatuses]);

  return {
    appointments,services,appointmentStatuses,pageInfo,searchParams,loading,serviceLoading,statusLoading,error,
    loadMyAppointments,loadServices,loadAppointmentStatuses,searchAppointments,handlePageChange,retry,
  };
}
