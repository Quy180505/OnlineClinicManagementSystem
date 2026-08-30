import { useCallback, useState } from "react";
import { medicalRecordApi } from "../api/medicalRecordApi";
import { getErrorMessage } from "../../../utils/errorHandler";

export default function usePatientMedicalRecord() {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [medicalRecordDetail, setMedicalRecordDetail] = useState(null);

  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  const [error, setError] = useState("");
  const [detailError, setDetailError] = useState("");

  const loadMyHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await medicalRecordApi.getMyHistory();

      if (!response.success) {
        throw new Error(response.message || "Không thể lấy lịch sử khám bệnh.");
      }

      setMedicalHistory(response.data || []);
    } catch (error) {
      setError(getErrorMessage(error, "Không thể tải lịch sử khám bệnh."));
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMyHistoryDetail = useCallback(async (medicalRecordId) => {
    try {
      setDetailLoading(true);
      setDetailError("");

      const response =
        await medicalRecordApi.getMyHistoryDetail(medicalRecordId);

      if (!response.success) {
        throw new Error(
          response.message || "Không thể lấy chi tiết hồ sơ khám.",
        );
      }

      setMedicalRecordDetail(response.data);
    } catch (error) {
      setDetailError(
        getErrorMessage(error, "Không thể tải chi tiết hồ sơ khám."),
      );
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const clearDetailError = useCallback(() => {
    setDetailError("");
  }, []);

  return {
    medicalHistory,medicalRecordDetail,loading,detailLoading,error,detailError,
    loadMyHistory,loadMyHistoryDetail,clearError,clearDetailError,
  };
}
