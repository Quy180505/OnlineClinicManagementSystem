const formatPrice = (price) => {
  if (price === null || price === undefined) {
    return "-";
  }
  return Number(price).toLocaleString("vi-VN") + " đ";
};

export default function MedicineTable({medicines,loading,onViewDetail,onEdit,onDelete,}) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Đang tải...
          </span>
        </div>
      </div>
    );
  }

  if (!medicines.length) {
    return (
      <div className="text-center py-5 text-muted">
        Chưa có thuốc nào.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Tên thuốc</th>
            <th>Danh mục</th>
            <th>Đơn vị</th>
            <th>Giá bán</th>
            <th className="text-end">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine.id}>
              <td className="fw-semibold">
                {medicine.medicineName}
              </td>

              <td>
                {medicine.medicineCategoryName || "-"}
              </td>

              <td>{medicine.unit || "-"}</td>

              <td>
                {formatPrice(medicine.price)}
              </td>

              <td className="text-end">
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() =>
                      onViewDetail(medicine.id)
                    }
                    title="Xem chi tiết"
                  >
                    <i className="bi bi-eye" />
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => onEdit(medicine)}
                    title="Chỉnh sửa"
                  >
                    <i className="bi bi-pencil" />
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() =>
                      onDelete(medicine)
                    }
                    title="Ngừng sử dụng"
                  >
                    <i className="bi bi-trash" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}