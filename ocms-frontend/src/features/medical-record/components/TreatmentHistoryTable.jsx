const formatDateTime = (dateTime) => {
  if (!dateTime) {
    return "-";
  }

  return new Date(dateTime).toLocaleString("vi-VN");
};

export default function TreatmentHistoryTable({ treatmentHistory, loading }) {
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
        Chưa có lịch sử điều trị.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Ngày khám</th>
            <th>Bác sĩ</th>
            <th>Triệu chứng</th>
            <th>Kết quả thăm khám</th>
            <th>Chẩn đoán</th>
            <th>Bệnh</th>
          </tr>
        </thead>

        <tbody>
          {treatmentHistory.map((record) => (
            <tr key={record.medicalRecordId}>
              <td>{formatDateTime(record.examinationDate)}</td>

              <td>{record.doctorName || "-"}</td>

              <td>{record.symptoms || "-"}</td>

              <td>{record.examinationResult || "-"}</td>

              <td>{record.diagnosis || "-"}</td>

              <td>
                {record.diseases?.length ? record.diseases.join(", ") : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
