import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TreatmentHistoryTable from "../components/TreatmentHistoryTable";
import usePatientMedicalRecord from "../hooks/usePatientMedicalRecord";
import { ROUTES } from "../../../constants/routeConstants";
export default function PatientTreatmentHistoryPage() {
  const navigate = useNavigate();

  const { medicalHistory,loading,error,loadMyHistory,clearError,} = usePatientMedicalRecord();

  useEffect(() => { loadMyHistory();} , [loadMyHistory]);

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h4 className="mb-1">Lịch sử khám bệnh</h4>

        <p className="text-muted mb-0">
          Xem các lần khám bệnh của bạn.
        </p>
      </div>

      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}

          <button
            type="button"
            className="btn-close"
            onClick={clearError}
          />
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 py-3">
          <h5 className="mb-0">Danh sách lần khám</h5>
        </div>

        <div className="card-body p-0">
          <TreatmentHistoryTable
            treatmentHistory={medicalHistory}
            loading={loading}
            onViewDetail={(medicalRecordId) =>  navigate( ROUTES.PATIENT.MEDICAL_RECORDS.DETAIL(medicalRecordId)) }
          />
        </div>
      </div>
    </div>
  );
}