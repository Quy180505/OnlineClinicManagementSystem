import { useCallback, useEffect, useState } from "react";

import { medicalServiceApi } from "../api/MedicalServiceApi";
import { specialtyApi } from "../../specialty/api/SpecialtyApi";
import { getErrorMessage } from "../../../utils/errorHandler";
import { PAGINATION } from "../../../constants/paginationConstants";

export default function useMedicalServiceDetail(medicalServiceId) {
  const [medicalService, setMedicalService] = useState(null);

  const [specialties, setSpecialties] = useState([]);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");

  const fetchMedicalService = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [medicalServiceResponse, specialtyResponse] = await Promise.all([
        medicalServiceApi.getById(medicalServiceId),

        specialtyApi.getPage({
          page: PAGINATION.DEFAULT_PAGE,
          size: PAGINATION.MAX_PAGE_SIZE,
          sortBy: "name",
          direction: "asc",
        }),
      ]);

      if (!medicalServiceResponse.success) {
        throw new Error(
          medicalServiceResponse.message ||
            "Không thể tải thông tin dịch vụ y tế.",
        );
      }

      if (!specialtyResponse.success) {
        throw new Error(
          specialtyResponse.message || "Không thể tải danh sách chuyên khoa.",
        );
      }

      setMedicalService(medicalServiceResponse.data);

      setSpecialties(specialtyResponse.data?.content || []);
    } catch (error) {
      setError(getErrorMessage(error, "Không thể tải thông tin dịch vụ y tế."));
    } finally {
      setLoading(false);
    }
  }, [medicalServiceId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMedicalService();
    }, 0);

    return () => clearTimeout(timer);
  }, [fetchMedicalService]);

  const updateMedicalService = useCallback(
    async (data) => {
      try {
        setUpdating(true);
        setUpdateError("");

        const response = await medicalServiceApi.update(medicalServiceId, data);

        if (!response.success) {
          throw new Error(
            response.message || "Không thể cập nhật dịch vụ y tế.",
          );
        }

        setMedicalService((previous) => ({
          ...previous,
          ...response.data,
        }));

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        const message = getErrorMessage(
          error,
          "Không thể cập nhật dịch vụ y tế.",
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
    [medicalServiceId],
  );

  const clearUpdateError = useCallback(() => {
    setUpdateError("");
  }, []);

  const retry = useCallback(() => {
    fetchMedicalService();
  }, [fetchMedicalService]);

  return {
    medicalService,
    specialties,

    loading,
    updating,

    error,
    updateError,

    retry,
    updateMedicalService,
    clearUpdateError,
  };
}
