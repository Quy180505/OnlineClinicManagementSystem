import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import InvoiceDetail from "../components/invoice/InvoiceDetail";
import VNPayButton from "../components/payment/VNPayButton";
import { useInvoiceDetail } from "../hooks/useInvoiceDetail";
import { ROUTES } from "../../../constants/routeConstants";

export default function PatientInvoiceDetailPage() {

  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { invoice, loading, error, loadInvoiceDetail } = useInvoiceDetail();
  const paymentStatus = searchParams.get("payment");
  const transactionCode = searchParams.get("transactionCode");


  useEffect(() => { loadInvoiceDetail(invoiceId)}, [invoiceId, loadInvoiceDetail]);

  const handleBack = () => { navigate(ROUTES.PATIENT.INVOICES.LIST)};

  const handleClearPaymentResult = () => {navigate(ROUTES.PATIENT.INVOICES.DETAIL(invoiceId), { replace: true })};

  if (loading) {
    return (
      <div className="container-fluid py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-4">
        <button
          type="button"
          className="btn btn-outline-secondary mb-3"
          onClick={handleBack}
        >
          ← Quay lại
        </button>

        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="container-fluid py-4">
        <button
          type="button"
          className="btn btn-outline-secondary mb-3"
          onClick={handleBack}
        >
          ← Quay lại
        </button>

        <div className="alert alert-info">Không tìm thấy hóa đơn.</div>
      </div>
    );
  }

  const isPaid = invoice.paymentStatus === "PAID";

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleBack}
        >
          ← Quay lại
        </button>
      </div>

      {paymentStatus === "success" && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Thanh toán thành công!</strong>

          <div>Hóa đơn của bạn đã được thanh toán.</div>

          {transactionCode && (
            <div className="small mt-1">
              Mã giao dịch:{" "}
              <span className="fw-semibold">{transactionCode}</span>
            </div>
          )}

          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClearPaymentResult}
          />
        </div>
      )}

      {paymentStatus === "failed" && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Thanh toán chưa thành công.</strong>

          <div>Giao dịch đã bị hủy hoặc không được hoàn tất.</div>

          {transactionCode && (
            <div className="small mt-1">
              Mã giao dịch:{" "}
              <span className="fw-semibold">{transactionCode}</span>
            </div>
          )}

          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClearPaymentResult}
          />
        </div>
      )}

      <InvoiceDetail invoice={invoice} />
      
      <div className="card mt-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div  className="d-flex align-items-center gap-2">
            <div className="text-muted">Trạng thái thanh toán : </div>

            {isPaid ? (<span className="badge text-bg-success fs-6">Đã thanh toán</span>)
             : 
            ( <span className="badge text-bg-warning fs-6">Chưa thanh toán</span>)}
          </div>

          {!isPaid && <VNPayButton invoiceId={invoice.id} />}
        </div>
      </div>
    </div>
  );
}
