import { useNavigate } from "react-router-dom";

import AppointmentSearch from "../components/AppointmentSearch";
import AppointmentTable from "../components/AppointmentTable";
import useAppointmentManagement from "../hooks/useAppointmentManagement";

import { ROUTES } from "../../../constants/routeConstants";

export default function AppointmentManagementPage() {
  const navigate = useNavigate();

  const {
    appointments,pageInfo,searchParams,loading,processing,error,actionError,
    searchAppointments,handlePageChange,confirmAppointment,rejectAppointment,cancelAppointment,clearActionError,retry
  } = useAppointmentManagement();

  const handleViewDetail = (appointmentId) => {
    navigate(ROUTES.STAFF.APPOINTMENTS.DETAIL(appointmentId));
  };

  const handleConfirm = async (appointmentId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xác nhận lịch khám này?",);

    if (!confirmed) {
      return;
    }

    await confirmAppointment(appointmentId);
  };

  const handleReject = async (appointmentId) => {
    const reason = window.prompt("Nhập lý do từ chối lịch khám:");

    if (reason === null) {
      return;
    }

    if (!reason.trim()) {
      return;
    }

    await rejectAppointment(appointmentId, {
      reason: reason.trim(),
    });
  };

  const handleCancel = async (appointmentId) => {

    const confirmed = window.confirm("Bạn có chắc chắn muốn hủy lịch khám này?",);
    if (!confirmed) {
      return;
    }

    await cancelAppointment(appointmentId);
  };

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h4 className="mb-1">Quản lý lịch khám</h4>

        <small className="text-muted">
          Quản lý và xử lý các lịch khám đang chờ xác nhận.
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

      {actionError && (
        <div
          className="alert alert-danger d-flex justify-content-between align-items-center"
          role="alert"
        >
          <span>{actionError}</span>

          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={clearActionError}
          />
        </div>
      )}

      <AppointmentSearch
        fromDate={searchParams.fromDate ?? ""}
        toDate={searchParams.toDate ?? ""}
        onSearch={searchAppointments}
      />

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <AppointmentTable
            appointments={appointments}
            pageInfo={pageInfo}
            loading={loading}
            processing={processing}
            staffView={true}
            onView={handleViewDetail}
            onConfirm={handleConfirm}
            onReject={handleReject}
            onCancel={handleCancel}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}