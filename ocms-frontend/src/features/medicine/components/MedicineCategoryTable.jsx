export default function MedicineCategoryTable({categories,loading,onViewDetail,onEdit,onDelete,}) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="text-center py-5 text-muted">Chưa có danh mục thuốc.</div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Tên danh mục</th>
            <th>Mô tả</th>
            <th className="text-end">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="fw-semibold">{category.categoryName}</td>

              <td>{category.description || "-"}</td>

              <td className="text-end">
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onViewDetail(category.id)}
                    title="Xem chi tiết"
                  >
                    <i className="bi bi-eye" />
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => onEdit(category)}
                    title="Chỉnh sửa"
                  >
                    <i className="bi bi-pencil" />
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(category)}
                    title="Xóa"
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
