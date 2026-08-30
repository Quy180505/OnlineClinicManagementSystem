import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorTreatmentHistoryTable from "../components/DoctorTreatmentHistoryTable";
import useMedicalExamination from "../hooks/useMedicalExamination";
import { ROUTES } from "../../../constants/routeConstants";

export default function DoctorTreatmentHistoryPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const { treatmentHistory, loading, error, loadTreatmentHistory, clearError } =
    useMedicalExamination();

  useEffect(() => {
    if (appointmentId) {
      loadTreatmentHistory(appointmentId);
    }
  }, [appointmentId, loadTreatmentHistory]);

  const handleViewDetail = (appointmentId) => {
    navigate(ROUTES.DOCTOR.MEDICAL_RECORDS.DETAIL(appointmentId));
  };

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary me-3"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-1" />
          Quay lại
        </button>

        <div>
          <h4 className="mb-1">Lịch sử điều trị bệnh nhân</h4>

          <p className="text-muted mb-0">
            Thông tin các lần khám trước đây của bệnh nhân.
          </p>
        </div>
      </div>

      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}

          <button type="button" className="btn-close" onClick={clearError} />
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 py-3">
          <h5 className="mb-0">Lịch sử điều trị</h5>
        </div>

        <div className="card-body p-0">
          <DoctorTreatmentHistoryTable
            treatmentHistory={treatmentHistory}
            loading={loading}
            onViewDetail={handleViewDetail}
          />
        </div>
      </div>
    </div>
  );
}
