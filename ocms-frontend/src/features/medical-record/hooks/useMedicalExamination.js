
import { useCallback, useState } from "react";
import { medicalExaminationApi } from "../api/medicalExaminationApi";
import { getErrorMessage } from "../../../utils/errorHandler";

export default function useMedicalExamination() {

  const [todayAppointments, setTodayAppointments] = useState([]);
  const [treatmentHistory, setTreatmentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const loadTodayAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response =await medicalExaminationApi.getTodayAppointments();

      if (!response.success) {
        throw new Error(response.message || "Không thể lấy danh sách lịch khám hôm nay.");
      }

      setTodayAppointments(response.data || []);
    } catch (error) {
      setError(
        getErrorMessage(error,"Không thể tải danh sách lịch khám hôm nay."));
    } finally {
      setLoading(false);
    }
  }, []);

  
  const startMedicalExamination = useCallback(
    async (appointmentId) => {
      try {
        setStarting(true);
        setActionError("");

        const response = await medicalExaminationApi.start(appointmentId);

        if (!response.success) {
          throw new Error( response.message || "Không thể bắt đầu khám bệnh.",);
        }

    
        await loadTodayAppointments();

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        const message = getErrorMessage(error,"Không thể bắt đầu khám bệnh.",);

        setActionError(message);

        return {
          success: false,
          message,
        };
      } finally {
        setStarting(false);
      }
    },
    [loadTodayAppointments],
  );

  const loadTreatmentHistory = useCallback(
    async (appointmentId) => {
      try {
        setLoading(true);
        setError("");

        const response =await medicalExaminationApi.getTreatmentHistory(appointmentId);

        if (!response.success) {
          throw new Error( response.message ||"Không thể lấy lịch sử điều trị.",);
        }

        setTreatmentHistory(response.data || []);
      } catch (error) {
        setError(
          getErrorMessage( error,"Không thể tải lịch sử điều trị."),);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const clearActionError = useCallback(() => {
    setActionError("");
  }, []);

  return {
    todayAppointments,treatmentHistory,loading,starting,error, actionError,
    loadTodayAppointments,startMedicalExamination, loadTreatmentHistory, clearError,clearActionError,
  };
}

