import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceTable from "../components/invoice/InvoiceTable";
import InvoiceSearchForm from "../components/invoice/InvoiceSearchForm";
import useInvoice from "../hooks/useInvoice";
import { PAGINATION} from "../../../constants/paginationConstants";
import { ROUTES } from "../../../constants/routeConstants";

export default function PatientInvoicePage() {

  const navigate = useNavigate();
  const {invoices,loading,error,page,size,totalPages,loadInvoices, clearError} = useInvoice();
  const [paymentStatus, setPaymentStatus] = useState("");


  useEffect(() => {
    loadInvoices({page: PAGINATION.DEFAULT_PAGE,size,paymentStatus: paymentStatus});
  }, [loadInvoices, size, paymentStatus]);

  const handlePageChange = (newPage) => {
    loadInvoices({page: newPage,size,paymentStatus});
  };

  const handleSizeChange = (newSize) => {
    loadInvoices({page: PAGINATION.DEFAULT_PAGE,size: newSize});
  };

  const handleViewDetail = (invoiceId) => {
    navigate(ROUTES.PATIENT.INVOICES.DETAIL(invoiceId));
  };

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h3 className="mb-1">
          Hóa đơn
        </h3>

        <p className="text-muted mb-0">
          Danh sách hóa đơn của bạn
        </p>
      </div>

      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}

          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={clearError}
          />
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <InvoiceSearchForm
            size={size}
            onSizeChange={handleSizeChange}
            paymentStatus={paymentStatus}
            onPaymentStatusChange={setPaymentStatus}
          />

          <InvoiceTable
            invoices={invoices}
            loading={loading}
            onViewDetail={handleViewDetail}
          />

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination mb-0">
                  <li
                    className={`page-item ${
                      page === 0 ? "disabled" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 0}
                    >
                      Trước
                    </button>
                  </li>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          page === index ? "active" : ""
                        }`}
                      >
                        <button
                          type="button"
                          className="page-link"
                          onClick={() => handlePageChange(index)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ),
                  )}

                  <li
                    className={`page-item ${
                      page === totalPages - 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages - 1}
                    >
                      Sau
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}