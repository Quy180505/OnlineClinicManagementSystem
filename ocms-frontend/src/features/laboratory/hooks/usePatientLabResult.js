import { useCallback, useState } from "react";
import { laboratoryApi } from "../api/laboratoryApi";
import { getErrorMessage } from "../../../utils/errorHandler";

export default function usePatientLabResult() {
  const [labResults, setLabResults] = useState([]);
  const [labResultDetail, setLabResultDetail] = useState(null);

  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  const [error, setError] = useState("");
  const [detailError, setDetailError] = useState("");

  const loadLabResultsByMedicalRecord = useCallback(
    async (medicalRecordId) => {
      try {
        setLoading(true);
        setError("");

        const response = await laboratoryApi.getMyResults();

        if (!response.success) {
          throw new Error(
            response.message || "Không thể lấy kết quả xét nghiệm.",
          );
        }

        const results = response.data || [];

        const filteredResults = results.filter((result) =>Number(result.medicalRecordId) === Number(medicalRecordId));

        setLabResults(filteredResults);
      } catch (error) {
        setError(getErrorMessage(error,"Không thể tải kết quả xét nghiệm."));
      } finally {
        setLoading(false);
      }
    },[]
  );

  const loadLabResultDetail = useCallback(async (labResultId) => {
    try {
      setDetailLoading(true);
      setDetailError("");
      setLabResultDetail(null);

      const response =
        await laboratoryApi.getMyResultDetail(labResultId);

      if (!response.success) {
        throw new Error(response.message ||"Không thể lấy chi tiết kết quả xét nghiệm.",);
      }

      setLabResultDetail(response.data);
    } catch (error) {
      setDetailError(
        getErrorMessage(error,"Không thể tải chi tiết kết quả xét nghiệm."));
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

  const clearLabResultDetail = useCallback(() => {
    setLabResultDetail(null);
    setDetailError("");
  }, []);

  return {
    labResults,labResultDetail,loading,detailLoading,error,detailError,
    loadLabResultsByMedicalRecord,loadLabResultDetail,clearError,clearDetailError,clearLabResultDetail,
  };
}