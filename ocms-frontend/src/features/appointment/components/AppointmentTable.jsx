const STATUS_CONFIG = {
  PENDING: {
    label: "Chờ xử lý",
    className: "bg-warning text-dark",
  },
  CONFIRMED: {
    label: "Đã xác nhận",
    className: "bg-success",
  },
  IN_PROGRESS: {
    label: "Đang khám",
    className: "bg-primary",
  },
  COMPLETED: {
    label: "Đã hoàn thành",
    className: "bg-secondary",
  },
  CANCELLED: {
    label: "Đã hủy",
    className: "bg-dark",
  },
  REJECTED: {
    label: "Đã từ chối",
    className: "bg-danger",
  }
};

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  return new Date(`${date}T00:00:00`).toLocaleDateString("vi-VN");
};

const formatTime = (time) => {
  if (!time) {
    return "-";
  }

  return time.slice(0, 5);
};

const getStatusConfig = (status) => {
  return (
    STATUS_CONFIG[status] || {
      label: status || "Không xác định",
      className: "bg-light text-dark",
    }
  );
};

export default function AppointmentTable({appointments, pageInfo,loading,onView, onConfirm,onReject,
                                          onCancel,onPageChange,staffView = false}) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className="text-center py-5 text-muted">
        Không tìm thấy lịch khám.
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Bác sĩ</th>
              <th>Dịch vụ</th>
              <th>Ngày khám</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>

              {staffView && (
                <th className="text-end">Thao tác</th>
              )}
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => {
              const status = getStatusConfig(
                appointment.appointmentStatus,
              );

              return (
                <tr key={appointment.id}>
                  <td>{appointment.doctorName || "-"}</td>

                  <td>{appointment.serviceName || "-"}</td>

                  <td>
                    {formatDate(appointment.appointmentDate)}
                  </td>

                  <td>
                    {formatTime(appointment.startTime)} -{" "}
                    {formatTime(appointment.endTime)}
                  </td>

                  <td>
                    <span className={`badge ${status.className}`}>
                      {status.label}
                    </span>
                  </td>

                  {staffView && (
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        {onView && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => onView(appointment.id)}
                          >
                            Chi tiết
                          </button>
                        )}

                        {appointment.appointmentStatus === "PENDING" &&
                          onConfirm && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-success"
                              onClick={() =>onConfirm(appointment.id)}
                            >
                              Xác nhận
                            </button>
                          )}

                        {appointment.appointmentStatus === "PENDING" &&
                          onReject && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>onReject(appointment.id)}
                            >
                              Từ chối
                            </button>
                          )}

                        {["PENDING", "CONFIRMED"].includes(
                          appointment.appointmentStatus,
                        ) &&
                          onCancel && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() =>onCancel(appointment.id)}
                            >
                              Hủy
                            </button>
                          )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pageInfo.totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            Tổng cộng {pageInfo.totalElements} lịch khám
          </small>

          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li
                className={`page-item ${
                  pageInfo.page === 0 ? "disabled" : ""
                }`}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() =>
                    onPageChange(pageInfo.page - 1)
                  }
                  disabled={pageInfo.page === 0}
                >
                  Trước
                </button>
              </li>

              {Array.from( { length: pageInfo.totalPages },(_, index) => (
                  <li
                    key={index}
                    className={`page-item ${pageInfo.page === index ? "active" : "" }`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => onPageChange(index)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ),
              )}

              <li
                className={`page-item ${
                  pageInfo.page >= pageInfo.totalPages - 1 ? "disabled": ""}`}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() =>
                    onPageChange(pageInfo.page + 1)
                  }
                  disabled={
                    pageInfo.page >= pageInfo.totalPages - 1
                  }
                >
                  Sau
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}