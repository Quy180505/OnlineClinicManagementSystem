import { useState } from "react";
import { patientApi } from "../api/PatientApi";

const createInitialForm = (profile) => ({
  username: profile.username || "",
  gender: profile.gender || "",
  newPassword: "",
  confirmPassword: "",
});

export default function PatientAccountForm({ profile }) {
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

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const request = {
        username: form.username.trim(),
        gender: form.gender || null,
        newPassword: form.newPassword || null,
        confirmPassword: form.confirmPassword || null,
      };

      const response = await patientApi.updateAccount(request);

      if (!response.success) {
        throw new Error(response.message || "Không thể cập nhật tài khoản.");
      }

      setSuccess("Cập nhật tài khoản thành công.");

      setForm((prev) => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Không thể cập nhật tài khoản.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3">
        <h5 className="mb-1">Tài khoản</h5>
        <small className="text-muted">Cập nhật thông tin đăng nhập.</small>
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

          <div className="mb-3">
            <label className="form-label">Username</label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control"
              minLength={4}
              maxLength={50}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Giới tính</label>

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Chọn giới tính</option>

              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
              <option value="OTHER">Khác</option>
            </select>
          </div>

          <hr className="my-4" />

          <h6 className="mb-3">Đổi mật khẩu</h6>

          <div className="mb-3">
            <label className="form-label">Mật khẩu mới</label>

            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="form-control"
              minLength={8}
              maxLength={100}
              placeholder="Để trống nếu không đổi"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Xác nhận mật khẩu</label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="form-control"
              minLength={8}
              maxLength={100}
            />
          </div>
        </div>

        <div className="card-footer bg-white d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                Đang lưu...
              </>
            ) : (
              "Lưu tài khoản"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
