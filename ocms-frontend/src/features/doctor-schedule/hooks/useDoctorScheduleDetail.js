import { useCallback, useEffect, useState } from "react";

import { doctorScheduleApi } from "../api/DoctorScheduleApi";
import { getErrorMessage } from "../../../utils/errorHandler";

export default function useDoctorScheduleDetail(doctorScheduleId) {

  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchDoctorSchedule = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const scheduleResponse = await doctorScheduleApi.getById(doctorScheduleId);

      if (!scheduleResponse.success) {
        throw new Error( scheduleResponse.message || "Không thể tải thông tin lịch làm việc.",);
      }

      setDoctorSchedule(scheduleResponse.data);
    } catch (error) {
      setError(getErrorMessage(error,"Không thể tải thông tin lịch làm việc."));
    } finally {
      setLoading(false);
    }
  }, [doctorScheduleId]);

  useEffect(() => {
    const timer = setTimeout(() => {fetchDoctorSchedule();}, 0);

    return () => clearTimeout(timer);}, [fetchDoctorSchedule]);

  const updateDoctorSchedule = useCallback(
    async (data) => {
      try {
        setUpdating(true);
        setUpdateError("");
        setSuccessMessage("");

        const response = await doctorScheduleApi.update(doctorScheduleId,data);

        if (!response.success) {
          throw new Error(response.message || "Không thể cập nhật lịch làm việc.");}

        setDoctorSchedule((previous) => ({
          ...previous,
          ...response.data,
        }));

        setSuccessMessage("Cập nhật lịch làm việc thành công.");

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {

        const message = getErrorMessage( error,"Không thể cập nhật lịch làm việc.",);
        setUpdateError(message);

        return {success: false,message};

      } finally {
        setUpdating(false);
      }
    },[doctorScheduleId]);

  const clearUpdateError = useCallback(() => {
    setUpdateError("");
  }, []);

  const clearSuccessMessage = useCallback(() => {
    setSuccessMessage("");
  }, []);

  const retry = useCallback(() => {
    fetchDoctorSchedule();
  }, [fetchDoctorSchedule]);

  return { doctorSchedule,loading,updating,error,updateError,successMessage,
          retry,updateDoctorSchedule,clearUpdateError, clearSuccessMessage};
}