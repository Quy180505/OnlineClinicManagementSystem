import { useNavigate, useParams } from "react-router-dom";
import DoctorScheduleForm from "../components/DoctorScheduleForm";
import useDoctorScheduleDetail from "../hooks/useDoctorScheduleDetail";

export default function DoctorScheduleDetailPage() {
  const navigate = useNavigate();
  const { doctorScheduleId } = useParams();

  const {doctorSchedule,loading,updating,doctorLoading,error,updateError,successMessage,retry,updateDoctorSchedule,clearUpdateError,clearSuccessMessage} = useDoctorScheduleDetail(doctorScheduleId);

  const handleSubmit = async (data) => {
    await updateDoctorSchedule(data);
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

  if (error) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger">
          <div className="d-flex justify-content-between align-items-center">
            <span>{error}</span>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={retry}
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!doctorSchedule) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-warning">
          Không tìm thấy thông tin lịch làm việc.
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          ← Quay lại
        </button>
      </div>
    );
  }

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
          <h4 className="mb-1">Chi tiết lịch làm việc</h4>

          <small className="text-muted">
            Cập nhật thông tin lịch làm việc của bác sĩ.
          </small>
        </div>
      </div>

      {updateError && (
        <div
          className="alert alert-danger d-flex justify-content-between align-items-center"
          role="alert"
        >
          <span>{updateError}</span>

          <button
            type="button"
            className="btn-close"
            aria-label="Đóng"
            onClick={clearUpdateError}
          />
        </div>
      )}

      {successMessage && (
        <div
          className="alert alert-success d-flex justify-content-between align-items-center"
          role="alert"
        >
          <span>{successMessage}</span>

          <button
            type="button"
            className="btn-close"
            aria-label="Đóng"
            onClick={clearSuccessMessage}
          />
        </div>
      )}
      <DoctorScheduleForm
        doctorSchedule={doctorSchedule}
        onSubmit={handleSubmit}
        loading={updating}
        doctorLoading={doctorLoading}
      />
    </div>
  );
}
