import { useCallback, useEffect, useState } from "react";
import { specialtyApi } from "../api/SpecialtyApi";
import { getErrorMessage } from "../../../utils/errorHandler";

export default function useSpecialtyDetail(specialtyId) {
  const [specialty, setSpecialty] = useState(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");

  const fetchSpecialty = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await specialtyApi.getById(specialtyId);

      if (!response.success) {
        throw new Error(
          response.message || "Không thể tải thông tin chuyên khoa.",
        );
      }

      setSpecialty(response.data);
    } catch (error) {
      setError(getErrorMessage(error, "Không thể tải thông tin chuyên khoa."));
    } finally {
      setLoading(false);
    }
  }, [specialtyId]);

  useEffect(() => {
    let cancelled = false;

    const loadSpecialty = async () => {
      try {
        const response = await specialtyApi.getById(specialtyId);

        if (!response.success) {
          throw new Error(
            response.message || "Không thể tải thông tin chuyên khoa.",
          );
        }

        if (!cancelled) {
          setSpecialty(response.data);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            getErrorMessage(error, "Không thể tải thông tin chuyên khoa."),
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadSpecialty();

    return () => {
      cancelled = true;
    };
  }, [specialtyId]);

  const updateSpecialty = useCallback(
    async (data) => {
      try {
        setUpdating(true);
        setUpdateError("");

        const response = await specialtyApi.update(specialtyId, data);

        if (!response.success) {
          throw new Error(
            response.message || "Không thể cập nhật chuyên khoa.",
          );
        }

        setSpecialty((previous) => ({
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
          "Không thể cập nhật chuyên khoa.",
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
    [specialtyId],
  );

  const clearUpdateError = useCallback(() => {
    setUpdateError("");
  }, []);

  const retry = useCallback(() => {
    fetchSpecialty();
  }, [fetchSpecialty]);

  return {
    specialty,

    loading,
    updating,

    error,
    updateError,

    retry,
    updateSpecialty,
    clearUpdateError,
  };
}
