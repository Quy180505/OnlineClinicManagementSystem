import { useState } from "react";
import { patientApi } from "../api/PatientApi";
import { getErrorMessage } from "../../../utils/errorHandler";

const BLOOD_TYPES = [
  { value: "A_POSITIVE", label: "A+" },
  { value: "A_NEGATIVE", label: "A-" },
  { value: "B_POSITIVE", label: "B+" },
  { value: "B_NEGATIVE", label: "B-" },
  { value: "AB_POSITIVE", label: "AB+" },
  { value: "AB_NEGATIVE", label: "AB-" },
  { value: "O_POSITIVE", label: "O+" },
  { value: "O_NEGATIVE", label: "O-" },
];

const createInitialForm = (profile) => ({
  phone: profile.phone || "",
  citizenId: profile.citizenId || "",
  address: profile.address || "",
  bloodType: profile.bloodType || "",
  allergyInfo: profile.allergyInfo || "",
  medicalHistory: profile.medicalHistory || "",
  emergencyContact: profile.emergencyContact || "",
});

export default function PatientProfileForm({ profile, onUpdated }) {
  const [form, setForm] = useState(() => createInitialForm(profile));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const request = {
        phone: form.phone.trim(),
        citizenId: form.citizenId.trim(),
        address: form.address.trim(),
        bloodType: form.bloodType || null,
        allergyInfo: form.allergyInfo.trim(),
        medicalHistory: form.medicalHistory.trim(),
        emergencyContact: form.emergencyContact.trim(),
      };

      const response = await patientApi.updateProfile(request);

      if (!response.success) {
        throw new Error(
          response.message || "Không thể cập nhật hồ sơ cá nhân.",
        );
      }

      if (response.data) {
        setForm(createInitialForm(response.data));
        onUpdated(response.data);
      }

      setSuccess("Cập nhật hồ sơ cá nhân thành công.");
    } catch (error) {
      setError(getErrorMessage(error, "Không thể cập nhật hồ sơ cá nhân."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3">
        <h5 className="mb-1">Thông tin hồ sơ</h5>

        <small className="text-muted">
          Cập nhật thông tin cá nhân, y tế và liên hệ.
        </small>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}

          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="fullName" className="form-label">
                Họ và tên
              </label>

              <input
                id="fullName"
                type="text"
                className="form-control"
                value={profile.fullName || ""}
                disabled
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
                placeholder="Nhập số điện thoại"
                disabled={loading}
              />
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
                placeholder="Nhập số CCCD"
                disabled={loading}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="bloodType" className="form-label">
                Nhóm máu
              </label>

              <select
                id="bloodType"
                name="bloodType"
                value={form.bloodType}
                onChange={handleChange}
                className="form-select"
                disabled={loading}
              >
                <option value="">Chọn nhóm máu</option>

                {BLOOD_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
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
                rows="2"
                maxLength={255}
                placeholder="Nhập địa chỉ hiện tại"
                disabled={loading}
              />
            </div>

            <div className="col-12">
              <label htmlFor="medicalHistory" className="form-label">
                Tiền sử bệnh
              </label>

              <textarea
                id="medicalHistory"
                name="medicalHistory"
                value={form.medicalHistory}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Nhập các bệnh hoặc tiền sử bệnh nếu có..."
                disabled={loading}
              />
            </div>

            <div className="col-12">
              <label htmlFor="allergyInfo" className="form-label">
                Dị ứng thuốc
              </label>

              <textarea
                id="allergyInfo"
                name="allergyInfo"
                value={form.allergyInfo}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Nhập thông tin dị ứng thuốc nếu có..."
                disabled={loading}
              />
            </div>

            <div className="col-12">
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
                placeholder="Tên và số điện thoại"
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
