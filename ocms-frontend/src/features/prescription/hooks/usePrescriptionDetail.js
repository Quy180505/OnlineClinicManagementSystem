import { useCallback, useState } from "react";
import { prescriptionApi } from "../api/prescriptionApi";

export default function usePrescriptionDetail() {
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPrescriptionDetail = useCallback(
    async (prescriptionId) => {
      try {
        setLoading(true);
        setError(null);

        const response =await prescriptionApi.getMyById(prescriptionId,);
        const data = response?.data ?? null;

        setPrescription(data);

        return data;
      } catch (err) {
        setPrescription(null);

        setError(err.response?.data?.message ||"Không thể tải chi tiết đơn thuốc.",);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const loadPrescriptionByMedicalRecord =
    useCallback(
      async (medicalRecordId) => {
        try {
          setLoading(true);
          setError(null);

          const response = await prescriptionApi.getMyByMedicalRecord(medicalRecordId);
          const data = response?.data ?? null;

          setPrescription(data);

          return data;
        } catch (err) {
          setPrescription(null);

          setError(err.response?.data?.message ||"Không thể tải đơn thuốc.",);

          throw err;
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  const clearPrescriptionDetail = useCallback(() => {
    setPrescription(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    prescription,loading,error,
    loadPrescriptionDetail,loadPrescriptionByMedicalRecord,clearPrescriptionDetail,clearError
  };
}

