import { useNavigate } from "react-router-dom";
import DoctorScheduleSearch from "../components/DoctorScheduleSearch";
import DoctorScheduleTable from "../components/DoctorScheduleTable";
import useDoctorScheduleManagement from "../hooks/useDoctorScheduleManagement";
import { ROUTES } from "../../../constants/routeConstants";

export default function DoctorScheduleManagementPage() {
  const navigate = useNavigate();

  const { doctorSchedules,doctors, pageInfo, searchParams, loading, processing, doctorLoading,error,actionError,
    searchDoctors,searchDoctorSchedules, handlePageChange,deleteDoctorSchedule,clearActionError,retry,} = useDoctorScheduleManagement();

 const handleCreate = () => {
    navigate(ROUTES.STAFF.DOCTOR_SCHEDULES.CREATE);
  };

  const handleDelete = async (doctorScheduleId) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa lịch làm việc này?",
    );

    if (!confirmed) {
      return;
    }

    await deleteDoctorSchedule(doctorScheduleId);
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">Quản lý lịch làm việc</h4>

          <small className="text-muted">
            Quản lý lịch làm việc của bác sĩ.
          </small>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCreate}
          disabled={processing}
        >
          + Thêm lịch làm việc
        </button>
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

      <DoctorScheduleSearch
        doctors={doctors}
        doctorId={searchParams.doctorId || ""}
        workDate={searchParams.workDate || ""}
        onSearch={searchDoctorSchedules}
        onSearchDoctor={searchDoctors}
        doctorLoading={doctorLoading}
      />

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <DoctorScheduleTable
            doctorSchedules={doctorSchedules}
            pageInfo={pageInfo}
            loading={loading}
            onDelete={handleDelete}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
