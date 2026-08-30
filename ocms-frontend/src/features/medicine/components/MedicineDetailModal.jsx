const formatPrice = (price) => {
  if (price === null || price === undefined) {
    return "-";
  }
  return Number(price).toLocaleString("vi-VN") + " đ";
};

export default function MedicineDetailModal({medicine,loading,onClose,}) {
  if (!medicine && !loading) {
    return null;
  }

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Chi tiết thuốc
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
              <div className="row g-3">
                <div className="col-md-6">
                  <small className="text-muted d-block">
                    Tên thuốc
                  </small>

                  <span className="fw-semibold">
                    {medicine.medicineName || "-"}
                  </span>
                </div>

                <div className="col-md-6">
                  <small className="text-muted d-block">
                    Danh mục
                  </small>

                  <span className="fw-semibold">
                    {medicine.medicineCategoryName ||
                      "-"}
                  </span>
                </div>

                <div className="col-md-6">
                  <small className="text-muted d-block">
                    Đơn vị
                  </small>

                  <span className="fw-semibold">
                    {medicine.unit || "-"}
                  </span>
                </div>

                <div className="col-md-6">
                  <small className="text-muted d-block">
                    Giá bán
                  </small>

                  <span className="fw-semibold">
                    {formatPrice(medicine.price)}
                  </span>
                </div>

                <div className="col-12">
                  <small className="text-muted d-block">
                    Mô tả
                  </small>

                  <p className="mb-0">
                    {medicine.description || "-"}
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