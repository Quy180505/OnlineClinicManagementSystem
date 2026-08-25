import { useCallback, useEffect, useState } from "react";
import { staffApi } from "../api/StaffApi";
import { getErrorMessage } from "../../../utils/errorHandler";

export default function usePatientDetail(patientId) {
  const [patient, setPatient] = useState(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");

  const fetchPatient = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await staffApi.getPatient(patientId);

      if (!response.success) {
        throw new Error(
          response.message || "Không thể tải thông tin bệnh nhân.",
        );
      }

      setPatient(response.data);
    } catch (error) {
      setError(getErrorMessage(error, "Không thể tải thông tin bệnh nhân."));
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    let cancelled = false;

    const loadPatient = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await staffApi.getPatient(patientId);

        if (!response.success) {
          throw new Error(
            response.message || "Không thể tải thông tin bệnh nhân.",
          );
        }

        if (!cancelled) {
          setPatient(response.data);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            getErrorMessage(error, "Không thể tải thông tin bệnh nhân."),
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPatient();

    return () => {
      cancelled = true;
    };
  }, [patientId]);

  const updatePatient = useCallback(
    async (data) => {
      try {
        setUpdating(true);
        setUpdateError("");

        const response = await staffApi.updatePatient(patientId, data);

        if (!response.success) {
          throw new Error(
            response.message || "Không thể cập nhật thông tin bệnh nhân.",
          );
        }

        setPatient(response.data);

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        const message = getErrorMessage(
          error,
          "Không thể cập nhật thông tin bệnh nhân.",
        );

        setUpdateError(message);

        return {
          success: false,
          message,
        };
      } finally {
        setUpdating(false);
      }
    },
    [patientId],
  );

  const clearUpdateError = useCallback(() => {
    setUpdateError("");
  }, []);

  const retry = useCallback(() => {
    fetchPatient();
  }, [fetchPatient]);

  return {
    patient,

    loading,
    updating,

    error,
    updateError,

    retry,
    updatePatient,
    clearUpdateError,
  };
}
