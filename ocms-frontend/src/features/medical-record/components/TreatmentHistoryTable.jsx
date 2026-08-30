const formatDateTime = (dateTime) => {
  if (!dateTime) {
    return "-";
  }

  return new Date(dateTime).toLocaleString("vi-VN");
};

export default function TreatmentHistoryTable({treatmentHistory,loading,onViewDetail,
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

  if (!treatmentHistory.length) {
    return (
      <div className="text-center py-5 text-muted">
        Chưa có lịch sử khám bệnh.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Ngày khám</th>
            <th>Chuyên khoa</th>
            <th>Bác sĩ</th>
            <th>Trạng thái</th>
            <th className="text-end">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {treatmentHistory.map((record) => (
            <tr key={record.medicalRecordId}>
              <td>{formatDateTime(record.examinationDate)}</td>

              <td>{record.specialtyName || "-"}</td>

              <td>{record.doctorName || "-"}</td>

              <td>{record.appointmentStatus || "-"}</td>

              <td className="text-end">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onViewDetail(record.medicalRecordId)}
                >
                  <i className="bi bi-eye me-1" />
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
