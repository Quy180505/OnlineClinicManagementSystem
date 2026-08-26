import { useState } from "react";
import useDoctorScheduleForm from "../hooks/useDoctorScheduleForm";

export default function DoctorScheduleForm({doctorSchedule,doctors,onSubmit,onSearchDoctor,loading,doctorLoading}) {

  const { form, handleChange, getSubmitData } = useDoctorScheduleForm(doctorSchedule);

  const [doctorKeyword, setDoctorKeyword] = useState("");
  const [showDoctors, setShowDoctors] = useState(false);

  const handleSubmit = (event) => {

    event.preventDefault();
    onSubmit(getSubmitData());
  };

  const handleDoctorSearch = (event) => {
    
    const value = event.target.value;
    setDoctorKeyword(value);
    setShowDoctors(Boolean(value.trim()));
    onSearchDoctor(value);
  };

  const handleSelectDoctor = (doctor) => {
    
    handleChange({target: { name: "doctorId", value: doctor.id, },});
    setDoctorKeyword(doctor.fullName || doctor.doctorName || doctor.name || "");
    setShowDoctors(false);
  };

  const isEdit = Boolean(doctorSchedule);

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3">
        <h5 className="mb-1">
          {isEdit ? "Thông tin lịch làm việc" : "Thêm lịch làm việc"}
        </h5>

        <small className="text-muted">
          {isEdit
            ? "Cập nhật thông tin lịch làm việc của bác sĩ."
            : "Nhập thông tin để tạo lịch làm việc mới cho bác sĩ."}
        </small>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="doctorSearch" className="form-label">
                Bác sĩ
              </label>

              <div className="position-relative">
                <input
                  id="doctorSearch"
                  type="text"
                  className="form-control"
                  value={doctorKeyword}
                  onChange={handleDoctorSearch}
                  disabled={loading || doctorLoading || isEdit}
                  required={!form.doctorId}
                  placeholder="Nhập tên bác sĩ hoặc email hoặc số điện thoại để tìm kiếm..."
                />

                {doctorLoading && (
                  <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    />
                  </div>
                )}

                {showDoctors && !doctorLoading && doctors.length > 0 && (
                  <div
                    className="position-absolute w-100 bg-white border rounded shadow-sm mt-1"
                    style={{
                      zIndex: 1000,
                      maxHeight: "250px",
                      overflowY: "auto",
                    }}
                  >
                    {doctors.map((doctor) => (
                      <button
                        key={doctor.id}
                        type="button"
                        className="dropdown-item py-2"
                        onClick={() => handleSelectDoctor(doctor)}
                      >
                        {doctor.fullName || doctor.doctorName || doctor.name}
                      </button>
                    ))}
                  </div>
                )}

                {showDoctors &&
                  !doctorLoading &&
                  doctors.length === 0 &&
                  doctorKeyword.trim() && (
                    <div
                      className="position-absolute w-100 bg-white border rounded shadow-sm mt-1 p-3 text-muted"
                      style={{ zIndex: 1000 }}
                    >
                      Không tìm thấy bác sĩ.
                    </div>
                  )}
              </div>

              {form.doctorId && (
                <input type="hidden" name="doctorId" value={form.doctorId} />
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="workDate" className="form-label">
                Ngày làm việc
              </label>

              <input
                id="workDate"
                type="date"
                name="workDate"
                value={form.workDate}
                onChange={handleChange}
                className="form-control"
                disabled={loading}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="maxPatients" className="form-label">
                Số bệnh nhân tối đa
              </label>

              <input
                id="maxPatients"
                type="number"
                name="maxPatients"
                value={form.maxPatients}
                onChange={handleChange}
                className="form-control"
                min="1"
                step="1"
                disabled={loading}
                required
                placeholder="Nhập số bệnh nhân tối đa"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="startTime" className="form-label">
                Giờ bắt đầu
              </label>

              <input
                id="startTime"
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                className="form-control"
                disabled={loading}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="endTime" className="form-label">
                Giờ kết thúc
              </label>

              <input
                id="endTime"
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                className="form-control"
                disabled={loading}
                required
              />
            </div>
          </div>
        </div>

        <div className="card-footer bg-white d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                Đang lưu...
              </>
            ) : isEdit ? (
              "Lưu thay đổi"
            ) : (
              "Thêm lịch làm việc"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
