import usePatientInformationForm from "../hooks/usePatientInformationForm";

const GENDER_OPTIONS = [
  {
    value: "MALE",
    label: "Nam",
  },
  {
    value: "FEMALE",
    label: "Nữ",
  },
  {
    value: "OTHER",
    label: "Khác",
  },
];

export default function PatientInformationForm({ patient, onSubmit, loading }) {
  const { form, handleChange, getSubmitData } =
    usePatientInformationForm(patient);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(getSubmitData());
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3">
        <h5 className="mb-1">Thông tin bệnh nhân</h5>

        <small className="text-muted">
          Nhân viên có thể cập nhật thông tin cá nhân và liên hệ của bệnh nhân.
        </small>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="fullName" className="form-label">
                Họ và tên
              </label>

              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="form-control"
                maxLength={100}
                disabled={loading}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">
                Số điện thoại
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="form-control"
                maxLength={20}
                disabled={loading}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="dateOfBirth" className="form-label">
                Ngày sinh
              </label>

              <input
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="form-control"
                disabled={loading}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">
                Giới tính
              </label>

              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="form-select"
                disabled={loading}
              >
                <option value="">Chọn giới tính</option>

                {GENDER_OPTIONS.map((gender) => (
                  <option key={gender.value} value={gender.value}>
                    {gender.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="citizenId" className="form-label">
                CCCD
              </label>

              <input
                id="citizenId"
                type="text"
                name="citizenId"
                value={form.citizenId}
                onChange={handleChange}
                className="form-control"
                maxLength={20}
                disabled={loading}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="emergencyContact" className="form-label">
                Người liên hệ khẩn cấp
              </label>

              <input
                id="emergencyContact"
                type="text"
                name="emergencyContact"
                value={form.emergencyContact}
                onChange={handleChange}
                className="form-control"
                maxLength={100}
                disabled={loading}
              />
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">
                Địa chỉ
              </label>

              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="form-control"
                rows="3"
                maxLength={255}
                disabled={loading}
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
            ) : (
              "Lưu thay đổi"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
