import { useNavigate, useParams } from "react-router-dom";

import AppointmentDetail from "../components/AppointmentDetail";
import useAppointmentDetail from "../hooks/useAppointmentDetail";

export default function AppointmentDetailPage() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();

  const {
    appointment,loading,processing,error,actionError,confirmAppointment,
    rejectAppointment,cancelAppointment,clearActionError,retry
  } = useAppointmentDetail(appointmentId);

  const handleConfirm = async () => {

    const confirmed = window.confirm("Bạn có chắc chắn muốn xác nhận lịch khám này?",);
    if (!confirmed) {
      return;
    }

    await confirmAppointment();
  };

  const handleReject = async (reason) => {
    await rejectAppointment({ reason });
  };

  const handleCancel = async () => {
    const confirmed = window.confirm( "Bạn có chắc chắn muốn hủy lịch khám này?",);

    if (!confirmed) {
      return;
    }

    await cancelAppointment();
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary me-3"
          onClick={() => navigate(-1)}
        >
          ← Quay lại
        </button>

        <div>
          <h4 className="mb-1">Chi tiết lịch khám</h4>

          <small className="text-muted">
            Xem thông tin chi tiết của lịch khám.
          </small>
        </div>
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

      <AppointmentDetail
        appointment={appointment}
        loading={loading}
        processing={processing}
        onConfirm={handleConfirm}
        onReject={handleReject}
        onCancel={handleCancel}
      />
    </div>
  );
}
