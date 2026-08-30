import { useCallback, useState } from "react";
import { laboratoryApi } from "../api/laboratoryApi";

export default function useLabResult() {
  const [labResult, setLabResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadLabResult = useCallback(async (testOrderDetailId) => {

    setLoading(true);
    setError(null);

    try {
      const response = await laboratoryApi.getLabResult(testOrderDetailId);


      setLabResult(response?.data || null);

      return response?.data;
    } catch (err) {
      if (err?.response?.status === 404) {
        setLabResult(null);
        return null;
      }

      console.error("Không thể tải kết quả xét nghiệm:", err);

      setError(
        err?.response?.data?.message || "Không thể tải kết quả xét nghiệm.",
      );

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLabResult = useCallback(
    async (testOrderDetailId, resultContent) => {
      setSaving(true);
      setError(null);

      try {
        const response = await laboratoryApi.updateLabResult(
          testOrderDetailId,
          {
            resultContent,
          },
        );

        const result = response?.data || null;

        setLabResult(result);

        return result;
      } catch (err) {
        console.error("Không thể lưu kết quả xét nghiệm:", err);

        setError(
          err?.response?.data?.message || "Không thể lưu kết quả xét nghiệm.",
        );

        return null;
      } finally {
        setSaving(false);
      }
    },
    [],
  );

  const clearError = () => {
    setError(null);
  };

  return {
    labResult,loading,saving,error,
    loadLabResult,updateLabResult,clearError,
  };
}
