import { useCallback, useState } from "react";
import useTestOrder from "./useTestOrder";
import useLabResult from "./useLabResult";

export default function useDoctorLaboratory() {
  const {
    testOrders,loading: testOrderLoading,creating,error: testOrderError,createError,
    loadTestOrders,createTestOrder,clearError: clearTestOrderError,clearCreateError,
  } = useTestOrder();

  const { labResult,loading: labResultLoading,error: labResultError,loadLabResult, clearError: clearLabResultError} = useLabResult();

  const [selectedDetailId, setSelectedDetailId] = useState(null);

  const loadLaboratory = useCallback(
    async (medicalRecordId) => {
      if (!medicalRecordId) {
        return;
      }

      await loadTestOrders(medicalRecordId);
    },
    [loadTestOrders],
  );

  const selectTestDetail = useCallback(
    async (testOrderDetailId) => {
      if (!testOrderDetailId) {
        setSelectedDetailId(null);
        return null;
      }

      setSelectedDetailId(testOrderDetailId);

      const result = await loadLabResult(testOrderDetailId);

      return result;
    },
    [loadLabResult],
  );
  const handleCreateTestOrder = useCallback(
    async (medicalRecordId, serviceIds) => {
      const success = await createTestOrder(medicalRecordId, serviceIds);

      return success;
    },
    [createTestOrder],
  );

  const clearSelectedDetail = useCallback(() => {
    setSelectedDetailId(null);
  }, []);

  const clearErrors = useCallback(() => {
    clearTestOrderError();
    clearCreateError();
    clearLabResultError();
  }, [clearTestOrderError, clearCreateError, clearLabResultError]);

  return {
    testOrders,testOrderLoading,creating,labResult,labResultLoading,selectedDetailId,
    selectTestDetail,clearSelectedDetail,testOrderError, createError,labResultError,
    loadLaboratory,createTestOrder: handleCreateTestOrder,loadLabResult,clearTestOrderError,
    clearCreateError,clearLabResultError,clearErrors,
  };
}
