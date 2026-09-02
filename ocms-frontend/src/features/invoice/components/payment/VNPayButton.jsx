import usePayment from "../../../payment/hooks/usePayment";
import { PAYMENT_METHODS } from "../../../../constants/paymentConstants";
export default function VNPayButton({invoiceId,disabled = false}) {

  const {loading, error, createPayment} = usePayment();

  const handlePayment = async () => {
    if (!invoiceId || loading || disabled) {
      return;
    }

    try {
      const response = await createPayment(invoiceId, {paymentMethodId: PAYMENT_METHODS.VNPAY});

      const paymentUrl = response?.data?.paymentUrl;
      if (!paymentUrl) {
        throw new Error("Không nhận được đường dẫn thanh toán VNPay");
      }
      window.location.href = paymentUrl;
    } catch {
      console.error("Không thể tạo thanh toán VNPay.");
    }
  };

  return (
    <div className="text-end">
      {error && (
        <div className="text-danger small mb-2">
          {error}
        </div>
      )}

      <button
        type="button"
        className="btn btn-primary"
        onClick={handlePayment}
        disabled={disabled || loading || !invoiceId}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            />
            Đang tạo thanh toán...
          </>
        ) : (
          "Thanh toán VNPay"
        )}
      </button>
    </div>
  );
}