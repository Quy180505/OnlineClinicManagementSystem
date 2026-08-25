import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routeConstants";

const GENDER_LABELS = {
  MALE: "Nam",
  FEMALE: "Nữ",
  OTHER: "Khác",
};

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
};

export default function PatientTable({ patients, loading }) {
  const navigate = useNavigate();

  const handleViewDetail = (patientId) => {
    navigate(ROUTES.STAFF.PATIENTS.DETAIL(patientId));
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

  if (!patients.length) {
    return (
      <div className="text-center text-muted py-5">
        Không tìm thấy bệnh nhân.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
            <th>CCCD</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient, index) => (
            <tr key={patient.patientId}>
              <td>{index + 1}</td>

              <td>
                <span className="fw-semibold">{patient.fullName || "-"}</span>
              </td>

              <td>{patient.phone || "-"}</td>

              <td>{patient.email || "-"}</td>

              <td>{formatDate(patient.dateOfBirth)}</td>

              <td>{GENDER_LABELS[patient.gender] || patient.gender || "-"}</td>

              <td>{patient.citizenId || "-"}</td>

              <td className="text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleViewDetail(patient.patientId)}
                >
                  Xem
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
