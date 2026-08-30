
import { useCallback, useState } from "react";
import { laboratoryApi } from "../api/laboratoryApi";

export default function useTestOrder() {
  const [testOrders, setTestOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [starting, setStarting] = useState(false);

  const [error, setError] = useState(null);
  const [createError, setCreateError] = useState(null);
  const [startError, setStartError] = useState(null);


  const loadTestOrders = useCallback(async (medicalRecordId) => {
    if (!medicalRecordId) {
      setTestOrders([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response =
        await laboratoryApi.getTestOrdersByMedicalRecord(medicalRecordId);

      const data = response?.data ?? [];

      setTestOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Không thể tải phiếu xét nghiệm:", err);

      setTestOrders([]);
      setError(
        err?.response?.data?.message ||
          "Không thể tải thông tin xét nghiệm.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const createTestOrder = useCallback(
    async (medicalRecordId, serviceIds) => {
      setCreating(true);
      setCreateError(null);

      try {
        const response = await laboratoryApi.createTestOrder(
          medicalRecordId,
          {
            serviceIds,
          },
        );

        const data = response?.data ?? null;

        if (data) {
          setTestOrders((prev) => {
            const current = Array.isArray(prev) ? prev : [];

            return [...current, data];
          });
        }

        return true;
      } catch (err) {
        console.error("Không thể tạo phiếu xét nghiệm:", err);

        setCreateError(
          err?.response?.data?.message ||
            "Không thể tạo phiếu xét nghiệm.",
        );

        return false;
      } finally {
        setCreating(false);
      }
    },
    [],
  );


  const startTestOrder = useCallback(async (testOrderId) => {
    if (!testOrderId) {
      return null;
    }

    setStarting(true);
    setStartError(null);

    try {
      const response =
        await laboratoryApi.startTestOrder(testOrderId);

      const data = response?.data ?? null;

      if (data) {
        setTestOrders((prev) => {
          const current = Array.isArray(prev) ? prev : [];

          return current.map((testOrder) =>
            testOrder.id === testOrderId
              ? data
              : testOrder,
          );
        });
      }

      return data;
    } catch (err) {
      console.error(
        "Không thể tiếp nhận phiếu xét nghiệm:",
        err,
      );

      setStartError(
        err?.response?.data?.message ||
          "Không thể tiếp nhận phiếu xét nghiệm.",
      );

      return null;
    } finally {
      setStarting(false);
    }
  }, []);


  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearCreateError = useCallback(() => {
    setCreateError(null);
  }, []);

  const clearStartError = useCallback(() => {
    setStartError(null);
  }, []);

  return {
    testOrders,loading,creating,starting,error,createError,startError,
    loadTestOrders,createTestOrder,startTestOrder,clearError,clearCreateError,clearStartError,setTestOrders,
  };
}

