import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routeConstants";

const SERVICE_TYPE_LABELS = {
  EXAM: "Khám",
  TEST: "Xét nghiệm",
};

const formatPrice = (price) => {
  if (price === null || price === undefined) {
    return "-";
  }

  return Number(price).toLocaleString("vi-VN") + " VNĐ";
};

export default function MedicalServiceTable({
  medicalServices,
  pageInfo,
  loading,
  onDelete,
  onPageChange,
}) {
  const navigate = useNavigate();

  const handleViewDetail = (medicalServiceId) => {
    navigate(ROUTES.ADMIN.MEDICAL_SERVICES.DETAIL(medicalServiceId));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (!medicalServices.length) {
    return (
      <div className="text-center text-muted py-5">
        Không tìm thấy dịch vụ y tế.
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>STT</th>
              <th>Tên dịch vụ</th>
              <th>Chuyên khoa</th>
              <th>Loại</th>
              <th>Giá</th>
              <th className="text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {medicalServices.map((medicalService, index) => (
              <tr key={medicalService.id}>
                <td>{pageInfo.page * pageInfo.size + index + 1}</td>

                <td>
                  <span className="fw-semibold">
                    {medicalService.serviceName || "-"}
                  </span>
                </td>

                <td>{medicalService.specialtyName || "-"}</td>

                <td>
                  {SERVICE_TYPE_LABELS[medicalService.serviceType] ||
                    medicalService.serviceType ||
                    "-"}
                </td>

                <td>{formatPrice(medicalService.price)}</td>

                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleViewDetail(medicalService.id)}
                  >
                    Xem
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(medicalService.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pageInfo.totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            Trang {pageInfo.page + 1} / {pageInfo.totalPages}
            {" · "}
            Tổng {pageInfo.totalElements} dịch vụ
          </small>

          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={pageInfo.page === 0 || loading}
              onClick={() => onPageChange(pageInfo.page - 1)}
            >
              Trước
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={pageInfo.page >= pageInfo.totalPages - 1 || loading}
              onClick={() => onPageChange(pageInfo.page + 1)}
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </>
  );
}
