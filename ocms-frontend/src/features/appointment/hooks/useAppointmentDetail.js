import { useCallback, useEffect, useState } from "react";

import { appointmentApi } from "../api/AppointmentApi";
import { getErrorMessage } from "../../../utils/errorHandler";

export default function useAppointmentDetail(appointmentId) {
  const [appointment, setAppointment] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointment = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await appointmentApi.getById(appointmentId);

      if (!response.success) {
        throw new Error( response.message || "Không thể tải thông tin lịch khám.");
      }

      setAppointment(response.data);
    } catch (error) {
      setError(getErrorMessage(error, "Không thể tải thông tin lịch khám."));
    } finally {
      setLoading(false);
    }
  }, [appointmentId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAppointment();
    }, 0);

    return () => clearTimeout(timer);
  }, [fetchAppointment]);

  const retry = useCallback(() => {
    fetchAppointment();
  }, [fetchAppointment]);

  return {
    appointment,loading,error, retry
  };
}
