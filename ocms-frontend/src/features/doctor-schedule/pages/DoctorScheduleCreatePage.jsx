import { useNavigate } from "react-router-dom";
import DoctorScheduleForm from "../components/DoctorScheduleForm";
import useDoctorScheduleManagement from "../hooks/useDoctorScheduleManagement";

export default function DoctorScheduleCreatePage() {
  const navigate = useNavigate();

  const { doctors,processing,doctorLoading, actionError,searchDoctors,createDoctorSchedule,clearActionError,} = useDoctorScheduleManagement();

  const handleSubmit = async (data) => {
    const result = await createDoctorSchedule(data);

    if (result.success) {
      navigate(-1);
    }
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
          <h4 className="mb-1">Thêm lịch làm việc</h4>

          <small className="text-muted">
            Tạo lịch làm việc mới cho bác sĩ.
          </small>
        </div>
      </div>

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

      <DoctorScheduleForm
        doctorSchedule={null}
        doctors={doctors}
        onSubmit={handleSubmit}
        onSearchDoctor={searchDoctors}
        loading={processing}
        doctorLoading={doctorLoading}
      />
    </div>
  );
}