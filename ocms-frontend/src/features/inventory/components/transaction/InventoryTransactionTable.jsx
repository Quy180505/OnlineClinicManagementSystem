import { formatDateTime } from "../../../../utils/dateUtils";

export default function InventoryTransactionTable({ transactions,loading}) {
  if (loading) {
    return (
      <div className="text-center py-4">
        <div
          className="spinner-border spinner-border-sm"
          role="status"
        />

        <span className="ms-2 text-muted">
          Đang tải lịch sử...
        </span>
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="text-center py-4 text-muted">
        Chưa có giao dịch.
      </div>
    );
  }

  const getTransactionLabel = (type) => {
    switch (type) {
      case "IMPORT":
        return "Nhập";

      case "EXPORT":
        return "Xuất";

      default:
        return type || "-";
    }
  };

  const getTransactionClass = (type) => {
    return type === "IMPORT"? "success": "danger";
  };

  return (
    <div className="table-responsive">
      <table className="table table-sm table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Thời gian</th>
            <th>Loại</th>
            <th>Số lượng</th>
            <th>Trước</th>
            <th>Sau</th>
            <th>Đơn thuốc</th>
            <th>Ghi chú</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                {formatDateTime(transaction.createdAt)}
              </td>

              <td>
                <span
                  className={`badge text-bg-${getTransactionClass(transaction.transactionType)}`}
                >
                  {getTransactionLabel(transaction.transactionType)}
                </span>
              </td>

              <td className="fw-semibold">
                {transaction.quantity}
              </td>

              <td>
                {transaction.quantityBefore}
              </td>

              <td>
                {transaction.quantityAfter}
              </td>

              <td>
                {transaction.prescriptionDetailId? `#${transaction.prescriptionDetailId}` : "-"}
              </td>

              <td>
                {transaction.note || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}