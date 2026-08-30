import { useCallback, useEffect, useState } from "react";
import { appointmentApi } from "../api/AppointmentApi";
import { specialtyApi } from "../../specialty/api/specialtyApi"
import { medicalServiceApi } from "../../medical-service/api/MedicalServiceApi";
import { doctorScheduleApi } from "../../doctor-schedule/api/DoctorScheduleApi";
import { getErrorMessage } from "../../../utils/errorHandler";

export default function useAppointmentBooking() {

  const [specialties, setSpecialties] = useState([]);
  const [services, setServices] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState("");
  const [specialtyLoading, setSpecialtyLoading] = useState(false);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadSpecialties = useCallback(async () => {
    try {
      setSpecialtyLoading(true);
      setError("");

      const response = await specialtyApi.getPage({
        page: 0,
        size: 1000,
        sortBy: "name",
        direction: "asc",
      });

      if (!response.success) {
        throw new Error( response.message || "Không thể tải danh sách chuyên khoa.",);
      }

      setSpecialties(response.data?.content || []);
    } catch (error) {
      setError(
        getErrorMessage(error, "Không thể tải danh sách chuyên khoa."),
      );
    } finally {
      setSpecialtyLoading(false);
    }
  }, []);

  const loadServices = useCallback(async (specialtyId) => {
  if (!specialtyId) {
    setServices([]);
    return;
  }

  try {
    setServiceLoading(true);
    setBookingError("");

    const response =
      await medicalServiceApi.getExaminationServicesBySpecialty(specialtyId);

    if (!response.success) {
      throw new Error(response.message || "Không thể tải danh sách dịch vụ khám.",);
    }

    setServices(response.data || []);
  } catch (error) {
    setServices([]);
    setBookingError(getErrorMessage(error,"Không thể tải danh sách dịch vụ khám.",),);
  } finally {
    setServiceLoading(false);
  }
}, []);

 const loadSchedules = useCallback(async (specialtyId) => {
  if (!specialtyId) {
    setSchedules([]);
    return;
  }

  try {
    setScheduleLoading(true);
    setBookingError("");

    const response = await doctorScheduleApi.getFuture({
      page: 0,
      size: 1000,
      specialtyId: Number(specialtyId),
      sortBy: "workDate",
      direction: "asc",
    });

    if (!response.success) {
      throw new Error(response.message || "Không thể tải lịch làm việc.",);
    }

    setSchedules(response.data?.content || []);
  } catch (error) {
    setSchedules([]);
    setBookingError(getErrorMessage(error, "Không thể tải lịch làm việc."),);
  } finally {
    setScheduleLoading(false);
  }
}, []);

  const handleSpecialtyChange = useCallback(
    async (specialtyId) => {

      setSelectedSpecialtyId(specialtyId);
      setServices([]);
      setSchedules([]);
      setBookingError("");
      setSuccessMessage("");
      await loadServices(specialtyId);
    },[loadServices]);

 const handleServiceChange = useCallback(
  async (serviceId) => {
    setSchedules([]);
    setBookingError("");
    setSuccessMessage("");

    if (!serviceId || !selectedSpecialtyId) {
      return;
    }

    await loadSchedules(selectedSpecialtyId);
  },[loadSchedules, selectedSpecialtyId]);

  const createAppointment = useCallback(async (data) => {
    try {
      setProcessing(true);
      setBookingError("");
      setSuccessMessage("");

      const response = await appointmentApi.create(data);

      if (!response.success) {
        throw new Error(response.message || "Không thể đặt lịch khám.",);
      }

      setSuccessMessage("Đặt lịch khám thành công.");

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {

      const message = getErrorMessage(error,"Không thể đặt lịch khám.",);
      setBookingError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setProcessing(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError("");
    setBookingError("");
  }, []);

  const clearSuccessMessage = useCallback(() => {
    setSuccessMessage("");
  }, []);

  const retry = useCallback(() => {
    loadSpecialties();
  }, [loadSpecialties]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadSpecialties();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadSpecialties]);

  return {
    specialties,services,schedules,selectedSpecialtyId,specialtyLoading,
    serviceLoading,scheduleLoading,processing,error, bookingError,successMessage,
    loadSpecialties,loadServices,loadSchedules,handleSpecialtyChange,
    handleServiceChange,createAppointment,clearError,clearSuccessMessage,retry,
  };
}