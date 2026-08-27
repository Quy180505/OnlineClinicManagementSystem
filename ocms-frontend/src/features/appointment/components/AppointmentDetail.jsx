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
  },
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

const formatCurrency = (amount) => {
  if (amount == null) {
    return "-";
  }

  return `${Number(amount).toLocaleString("vi-VN")} VNĐ`;
};

export default function AppointmentDetail({ appointment, loading = false }) {
  if (loading) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="alert alert-warning">
        Không tìm thấy thông tin lịch khám.
      </div>
    );
  }

  const status = STATUS_CONFIG[appointment.appointmentStatus] || {
    label: appointment.appointmentStatus || "Không xác định",
    className: "bg-light text-dark",
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-0 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">Chi tiết lịch khám </h5>

          </div>

          <span className={`badge ${status.className}`}>{status.label}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="mb-4">
          <h6 className="border-bottom pb-2 mb-3">Thông tin bệnh nhân</h6>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="text-muted small">Họ và tên</div>

              <div className="fw-medium">
                {appointment.patient?.fullName || "-"}
              </div>
            </div>

            <div className="col-md-6">
              <div className="text-muted small">Số điện thoại</div>

              <div className="fw-medium">
                {appointment.patient?.phone || "-"}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h6 className="border-bottom pb-2 mb-3">Thông tin khám</h6>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="text-muted small">Bác sĩ</div>

              <div className="fw-medium">
                {appointment.doctor?.fullName || "-"}
              </div>
            </div>

            <div className="col-md-6">
              <div className="text-muted small">Dịch vụ</div>

              <div className="fw-medium">
                {appointment.service?.name || "-"}
              </div>
            </div>

            <div className="col-md-6">
              <div className="text-muted small">Ngày khám</div>

              <div className="fw-medium">
                {formatDate(appointment.schedule?.date)}
              </div>
            </div>

            <div className="col-md-6">
              <div className="text-muted small">Thời gian</div>

              <div className="fw-medium">
                {formatTime(appointment.schedule?.startTime)} -{" "}
                {formatTime(appointment.schedule?.endTime)}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h6 className="border-bottom pb-2 mb-3">Ghi chú</h6>

          <div className="bg-light rounded p-3">
            {appointment.note || "Không có ghi chú."}
          </div>
        </div>

        <div>
          <h4 className="border-bottom pb-2 mb-3">Hóa đơn ban đầu: {formatCurrency(appointment.invoice?.totalAmount)}</h4>
        </div>
      </div>
    </div>
  );
}
