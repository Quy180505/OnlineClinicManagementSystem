import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routeConstants";

export default function DoctorScheduleTable({ doctorSchedules,pageInfo,loading,onDelete,onPageChange,}) {
  const navigate = useNavigate();

  const handleViewDetail = (doctorScheduleId) => {
    navigate(ROUTES.STAFF.DOCTOR_SCHEDULES.DETAIL(doctorScheduleId));
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

  if (!doctorSchedules.length) {
    return (
      <div className="text-center text-muted py-5">
        Không tìm thấy lịch làm việc.
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
              <th>Bác sĩ</th>
              <th>Ngày làm việc</th>
              <th>Khung giờ</th>
              <th className="text-center">Số bệnh nhân</th>

              <th className="text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {doctorSchedules.map((schedule, index) => (
              <tr key={schedule.id}>
                <td>{pageInfo.page * pageInfo.size + index + 1}</td>

                <td>
                  <span className="fw-semibold">
                    {schedule.doctorName || "-"}
                  </span>
                </td>

                <td>{schedule.workDate || "-"}</td>

                <td>
                  {schedule.startTime?.slice(0, 5) || "-"}
                  {" - "}
                  {schedule.endTime?.slice(0, 5) || "-"}
                </td>

                <td className="text-center">{schedule.maxPatients ?? "-"}</td>

                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleViewDetail(schedule.id)}
                  >
                    Xem
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(schedule.id)}
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
            Tổng {pageInfo.totalElements} lịch
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
