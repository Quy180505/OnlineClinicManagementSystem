import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodayAppointmentTable from "../components/TodayAppointmentTable";
import useMedicalExamination from "../hooks/useMedicalExamination";
import { ROUTES } from "../../../constants/routeConstants";
export default function TodayAppointmentsPage() {
   const navigate = useNavigate();
  const {
    todayAppointments,loading,starting,error,actionError,
    loadTodayAppointments,startMedicalExamination,clearError,clearActionError,
  } = useMedicalExamination();

  useEffect(() => {loadTodayAppointments();}, [loadTodayAppointments]);

  const handleStart = async (appointmentId) => {
    await startMedicalExamination(appointmentId);
  };

  const handleViewHistory = (appointmentId) => {
     navigate(ROUTES.DOCTOR.MEDICAL_EXAMINATIONS.TREATMENT_HISTORY(appointmentId));
  };

  const handleViewMedicalRecord = (appointmentId) => {
    navigate( ROUTES.DOCTOR.MEDICAL_RECORDS.DETAIL(appointmentId));
  };
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">Lịch khám hôm nay</h4>

          <p className="text-muted mb-0">
            Danh sách bệnh nhân đã được xác nhận lịch hẹn.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={loadTodayAppointments}
          disabled={loading}
        >
          Làm mới
        </button>
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

      {actionError && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {actionError}

          <button
            type="button"
            className="btn-close"
            onClick={clearActionError}
          />
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <TodayAppointmentTable
            appointments={todayAppointments}
            loading={loading}
            starting={starting}
            onStart={handleStart}
            onViewHistory={handleViewHistory}
            onViewMedicalRecord={handleViewMedicalRecord}
          />
        </div>
      </div>
    </div>
  );
}
