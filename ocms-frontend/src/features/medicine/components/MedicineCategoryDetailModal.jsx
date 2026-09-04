export default function MedicineCategoryDetailModal({category,loading,onClose,}) {
  if (!category && !loading) {
    return null;
  }

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Chi tiết danh mục
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            />
          </div>

          <div className="modal-body">
            {loading ? (
              <div className="text-center py-4">
                <div
                  className="spinner-border text-primary"
                  role="status"
                >
                  <span className="visually-hidden">
                    Đang tải...
                  </span>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                <div>
                  <small className="text-muted d-block">
                    Tên danh mục
                  </small>

                  <span className="fw-semibold">
                    {category.categoryName || "-"}
                  </span>
                </div>

                <div>
                  <small className="text-muted d-block">
                    Mô tả
                  </small>

                  <p className="mb-0">
                    {category.description || "-"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}