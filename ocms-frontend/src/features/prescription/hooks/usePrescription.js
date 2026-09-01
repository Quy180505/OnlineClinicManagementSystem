import { useCallback, useState } from "react";
import {prescriptionApi} from "../api/prescriptionApi";

export default function usePrescription() {

  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] =useState(false);
  const [error, setError] = useState(null);

  const loadPrescriptionByMedicalRecord =
    useCallback(async (medicalRecordId) => {
      try {
        setLoading(true);
        setError(null);

        const response = await prescriptionApi.getByMedicalRecordId(medicalRecordId,);

        const data = response?.data ?? null;

        setPrescription(data);

        return data;
      } catch (err) {
        if (err.response?.status === 404) {
          setPrescription(null);
          return null;
        }

        setError(err.response?.data?.message ||"Không thể tải đơn thuốc.");

        throw err;
      } finally {
        setLoading(false);
      }
    }, []);

  const createPrescription = useCallback(
    async (medicalRecordId, data) => {
      try {
        setActionLoading(true);
        setError(null);

        const response =await prescriptionApi.create(medicalRecordId,data,);

        const result = response?.data ?? null;

        setPrescription(result);

        return result;
      } catch (err) {
        setError( err.response?.data?.message || "Không thể kê đơn thuốc.");

        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    [],
  );

  const clearPrescription = useCallback(() => {
    setPrescription(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    prescription,loading,actionLoading,error,
    loadPrescriptionByMedicalRecord, createPrescription, clearPrescription,clearError,
  };
}