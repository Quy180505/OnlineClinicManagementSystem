import { useCallback, useState } from "react";
import { medicalRecordApi } from "../api/medicalRecordApi";

const EMPTY_FORM = {
  symptoms: "",
  examinationResult: "",
  diagnosis: "",
};

export default function useMedicalRecord() {

  const [medicalRecord, setMedicalRecord] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");
  const loadMedicalRecord = useCallback(async (appointmentId) => {
    if (!appointmentId) {
      return;
    }

    setLoading(true);
    setError("");
    setSaveSuccess("");

    try {
      const data = await medicalRecordApi.getByAppointmentId(appointmentId);

      setMedicalRecord(data);

      setFormData({
        symptoms: data?.symptoms || "",
        examinationResult: data?.examinationResult || "",
        diagnosis: data?.diagnosis || "",
      });
    } catch (err) {
      setError( err?.response?.data?.message ||"Không thể tải thông tin bệnh án");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateField = useCallback((field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }, []);

  const updateMedicalRecord = useCallback(
    async (appointmentId) => {
      if (!appointmentId) {
        return false;
      }

      setSaving(true);
      setSaveError("");

      try {
        const data = await medicalRecordApi.update(appointmentId,formData);

        setMedicalRecord(data);

        setFormData({
          symptoms: data?.symptoms || "",
          examinationResult: data?.examinationResult || "",
          diagnosis: data?.diagnosis || "",
        });

        setSaveSuccess("Cập nhật bệnh án thành công.");
        return true;
      } catch (err) {
        setSaveError(err?.response?.data?.message || "Không thể cập nhật bệnh án.");

        return false;
      } finally {
        setSaving(false);
      }
    },
    [formData]
  );

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const clearSaveError = useCallback(() => {
    setSaveError("");
  }, []);

  return {
    medicalRecord,formData,loading,saving,error,saveError,saveSuccess,
    loadMedicalRecord,updateField,updateMedicalRecord,clearError,clearSaveError,
  };
}