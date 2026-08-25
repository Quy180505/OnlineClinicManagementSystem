import { useCallback, useEffect, useState } from "react";
import { staffApi } from "../api/StaffApi";
import { getErrorMessage } from "../../../utils/errorHandler";

const DEFAULT_PARAMS = {
  page: 0,
  size: 10,
};

export default function useStaffPatients() {
  const [patients, setPatients] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [searchParams, setSearchParams] = useState(DEFAULT_PARAMS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPatients = useCallback(async (params) => {
    try {
      setLoading(true);
      setError("");

      const response = await staffApi.searchPatients(params);

      if (!response.success) {
        throw new Error(
          response.message || "Không thể tải danh sách bệnh nhân.",
        );
      }

      setPatients(response.data?.content || []);
      setPagination(response.data || null);
    } catch (error) {
      setError(getErrorMessage(error, "Không thể tải danh sách bệnh nhân."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadPatients = async () => {
      try {
        const response = await staffApi.searchPatients(searchParams);

        if (!response.success) {
          throw new Error(
            response.message || "Không thể tải danh sách bệnh nhân.",
          );
        }

        if (!cancelled) {
          setPatients(response.data?.content || []);
          setPagination(response.data || null);
          setError("");
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            getErrorMessage(error, "Không thể tải danh sách bệnh nhân."),
          );
          setLoading(false);
        }
      }
    };

    loadPatients();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const searchPatients = useCallback((params) => {
    setSearchParams({
      ...params,
      page: 0,
      size: 10,
    });
  }, []);

  const retry = useCallback(() => {
    fetchPatients(searchParams);
  }, [fetchPatients, searchParams]);

  return {
    patients,
    pagination,
    loading,
    error,
    searchPatients,
    retry,
  };
}
