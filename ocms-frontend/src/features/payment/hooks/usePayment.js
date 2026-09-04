import { useCallback, useState } from "react";
import { paymentApi } from "../api/paymentApi";

export default function usePayment() {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPayment = useCallback(async (invoiceId, data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await paymentApi.createPayment( invoiceId,data);

      const paymentData = response?.data ?? null;

      setPayment(paymentData);

      return response;
    } catch (err) {
      setError(err?.response?.data?.message ||"Không thể tạo thanh toán.",);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMyPayment = useCallback(async (invoiceId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await paymentApi.getMyPayment(invoiceId);
      const paymentData = response?.data ?? null;

      setPayment(paymentData);

      return response;
    } catch (err) {
      setError(err?.response?.data?.message || "Không thể tải thông tin thanh toán.");

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    payment,loading,error,createPayment,getMyPayment,clearError,
  };
}