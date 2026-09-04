export default function InvoiceSearchForm({ paymentStatus,onPaymentStatusChange}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="mb-0">
        Danh sách hóa đơn
      </h5>

      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <label
            htmlFor="invoicePaymentStatus"
            className="form-label mb-0"
          >
            Trạng thái
          </label>

          <select
            id="invoicePaymentStatus"
            className="form-select form-select-sm"
            value={paymentStatus}
            onChange={(e) => onPaymentStatusChange(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="UNPAID">Chưa thanh toán</option>
            <option value="PAID">Đã thanh toán</option>
          </select>
        </div>

       
      </div>
    </div>
  );
}