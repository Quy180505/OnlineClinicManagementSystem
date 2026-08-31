export default function InventoryTable({inventories = [],loading,onViewDetail}) {
  const getStatusClass = (statusName) => {
    switch (statusName) {
      case "IN_STOCK":
        return "success";

      case "LOW_STOCK":
        return "warning";

      case "OUT_OF_STOCK":
        return "secondary";

      case "EXPIRED":
        return "danger";

      default:
        return "secondary";
    }
  };

  const getStatusLabel = (statusName) => {
    switch (statusName) {
      case "IN_STOCK":
        return "Còn hàng";

      case "LOW_STOCK":
        return "Sắp hết";

      case "OUT_OF_STOCK":
        return "Hết hàng";

      case "EXPIRED":
        return "Hết hạn";

      default:
        return statusName || "Không xác định";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div
          className="spinner-border"
          role="status"
          aria-hidden="true"
        />

        <div className="text-muted mt-2">
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  if (inventories.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <i className="bi bi-box-seam fs-2 d-block mb-2" />
        Không có dữ liệu tồn kho.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Thuốc</th>
            <th>Tồn kho</th>
            <th>Ngày nhập</th>
            <th>Hạn sử dụng</th>
            <th>Trạng thái</th>
            <th className="text-end">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {inventories.map((inventory) => (
            <tr key={inventory.id}>
              <td>
                <div className="fw-semibold">
                  {inventory.medicineName}
                </div>
              </td>

              <td>
                <span className="fw-semibold">
                  {inventory.quantityInStock}
                </span>
              </td>

              <td>{inventory.importDate}</td>

              <td>{inventory.expireDate}</td>

              <td>
                <span
                  className={`badge text-bg-${getStatusClass(
                    inventory.inventoryStatusName,
                  )}`}
                >
                  {getStatusLabel(
                    inventory.inventoryStatusName,
                  )}
                </span>
              </td>

              <td className="text-end">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onViewDetail?.(inventory.id)}
                >
                  <i className="bi bi-eye me-1" />
                  Chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}