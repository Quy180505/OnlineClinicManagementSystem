import { useState } from "react";

export default function DoctorScheduleSearch({doctors,doctorId, workDate,onSearch,onSearchDoctor,doctorLoading,}) {

  const [doctorKeyword, setDoctorKeyword] = useState("");
  const [showDoctors, setShowDoctors] = useState(false);

  const handleDoctorSearch = (event) => {

    const value = event.target.value;
    setDoctorKeyword(value);
    setShowDoctors(Boolean(value.trim()));
    onSearchDoctor(value);
  };

  const handleSelectDoctor = (doctor) => {

    setDoctorKeyword( doctor.fullName || doctor.doctorName || doctor.name || "", );
    setShowDoctors(false);
    onSearch({ doctorId: doctor.id, workDate,});
  };

  const handleDateChange = (event) => {
    onSearch({ doctorId, workDate: event.target.value,});
  };

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="doctorScheduleDoctor" className="form-label">
              Bác sĩ
            </label>

            <div className="position-relative">
              <input
                id="doctorScheduleDoctor"
                type="text"
                className="form-control"
                value={doctorKeyword}
                onChange={handleDoctorSearch}
                placeholder="Nhập tên bác sĩ, email hoặc số điện thoại..."
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
          </div>

          <div className="col-md-6">
            <label htmlFor="doctorScheduleWorkDate" className="form-label">
              Ngày làm việc
            </label>

            <input
              id="doctorScheduleWorkDate"
              type="date"
              className="form-control"
              value={workDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}