import { useCallback, useState } from "react";
import { invoiceApi } from "../api/invoiceApi";

export function useInvoiceDetail() {

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadInvoiceDetail = useCallback(async (invoiceId) => {

    if (!invoiceId) {
      setInvoice(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await invoiceApi.getMyById(invoiceId);

      setInvoice(response?.data ?? null);
    } catch (err) {
      
      setError( err?.response?.data?.message ||"Không thể tải chi tiết hóa đơn.");
      setInvoice(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    invoice,loading,error, loadInvoiceDetail
  };
}