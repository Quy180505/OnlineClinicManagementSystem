const STATUS_CONFIG = {
  CONFIRMED: {
    label: "Đã xác nhận",
    className: "bg-success",
  },
  IN_PROGRESS: {
    label: "Đang khám",
    className: "bg-primary",
  },
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

export default function TodayAppointmentTable({
  appointments,
  loading,
  starting,
  onStart,
  onViewHistory,
}) {
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
        Hôm nay không có lịch khám.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Bệnh nhân</th>
            <th>Số điện thoại</th>
            <th>Dịch vụ</th>
            <th>Thời gian</th>
            <th>Trạng thái</th>
            <th className="text-end">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((appointment) => {
            const status = getStatusConfig(appointment.appointmentStatus);

            return (
              <tr key={appointment.appointmentId}>
                <td>{appointment.patientName || "-"}</td>

                <td>{appointment.patientPhone || "-"}</td>

                <td>{appointment.serviceName || "-"}</td>

                <td>
                  {formatTime(appointment.startTime)} -{" "}
                  {formatTime(appointment.endTime)}
                </td>

                <td>
                  <span className={`badge ${status.className}`}>
                    {status.label}
                  </span>
                </td>

                <td>
                    <div className="d-flex justify-content-end gap-2">
                      {appointment.appointmentStatus === "CONFIRMED" && (
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => onStart(appointment.appointmentId)}
                          disabled={starting}
                        >
                          {starting ? "Đang xử lý..." : "Tiếp nhận"}
                        </button>
                      )}

                      {appointment.appointmentStatus === "IN_PROGRESS" && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => onViewHistory(appointment.appointmentId)}
                        >
                          Lịch sử điều trị
                        </button>
                      )}
                    </div>
                  </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
