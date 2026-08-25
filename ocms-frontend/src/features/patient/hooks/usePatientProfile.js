import { useCallback, useEffect, useState } from "react";
import { patientApi } from "../api/PatientApi";

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || error?.message || fallbackMessage;

export default function usePatientProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await patientApi.getMyProfile();

      if (!response.success) {
        throw new Error(response.message || "Không thể tải hồ sơ bệnh nhân.");
      }

      setProfile(response.data);
    } catch (error) {
      setError(getErrorMessage(error, "Không thể tải hồ sơ bệnh nhân."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      try {
        const response = await patientApi.getMyProfile();

        if (!response.success) {
          throw new Error(response.message || "Không thể tải hồ sơ bệnh nhân.");
        }

        if (!cancelled) {
          setProfile(response.data);
          setError("");
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          setError(getErrorMessage(error, "Không thể tải hồ sơ bệnh nhân."));
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateProfile = useCallback((updatedProfile) => {
    setProfile(updatedProfile);
  }, []);

  const retry = useCallback(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    retry,
    updateProfile,
  };
}
