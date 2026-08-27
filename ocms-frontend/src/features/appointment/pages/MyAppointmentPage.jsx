import { useNavigate } from "react-router-dom";
import MyAppointmentSearch from "../components/MyAppointmentSearch";
import AppointmentTable from "../components/AppointmentTable";
import useMyAppointments from "../hooks/useMyAppointments";
import { ROUTES } from "../../../constants/routeConstants";

export default function MyAppointmentPage() {
  const navigate = useNavigate();

  const {
    appointments,appointmentStatuses,pageInfo,searchParams,loading,statusLoading,error,
    searchAppointments,handlePageChange,retry,
  } = useMyAppointments();

  const handleViewDetail = (appointmentId) => {
    navigate(ROUTES.PATIENT.APPOINTMENTS.DETAIL(appointmentId));
  };

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h4 className="mb-1">Lịch khám của tôi</h4>

        <small className="text-muted">
          Theo dõi các lịch khám và trạng thái lịch hẹn của bạn.
        </small>
      </div>

      {error && (
        <div
          className="alert alert-danger d-flex justify-content-between align-items-center"
          role="alert"
        >
          <span>{error}</span>

          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={retry}
          >
            Thử lại
          </button>
        </div>
      )}

      <MyAppointmentSearch
        appointmentStatuses={appointmentStatuses}
        serviceId={searchParams.serviceId ?? ""}
        appointmentStatusId={searchParams.appointmentStatusId ?? ""}
        fromDate={searchParams.fromDate ?? ""}
        toDate={searchParams.toDate ?? ""}
        onSearch={searchAppointments}
        statusLoading={statusLoading}
      />

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <AppointmentTable
            appointments={appointments}
            pageInfo={pageInfo}
            loading={loading}
            onViewDetail={handleViewDetail}
            onPageChange={handlePageChange}
            patientView
          />
        </div>
      </div>
    </div>
  );
}
