import { formatDateTime } from "../../../../utils/dateUtils";

export default function InvoiceTable({invoices,loading, onViewDetail}) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (!invoices.length) {
    return (
      <div className="alert alert-info text-center">
        Chưa có hóa đơn.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Thời điểm khám</th>
            <th>Bác sĩ thăm khám</th>
            <th>Dịch vụ</th>
            <th className="text-end">Tổng tiền</th>
            <th>Trạng thái</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>
                {formatDateTime(invoice.createdAt)}
              </td>

              <td>{invoice.doctorName}</td>

              <td>{invoice.serviceName}</td>

              <td className="text-end fw-semibold">
                {Number(invoice.totalAmount).toLocaleString("vi-VN")} ₫ 
              </td>

              <td>
                {invoice.paymentStatus === "PAID" ? (
                  <span className="badge text-bg-success">
                    Đã thanh toán
                  </span>
                ) : (
                  <span className="badge text-bg-warning">
                    Chưa thanh toán
                  </span>
                )}
              </td>

              <td className="text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onViewDetail(invoice.id)}
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}