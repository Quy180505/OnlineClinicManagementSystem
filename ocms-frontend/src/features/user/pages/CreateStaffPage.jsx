import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi";
import { ROUTES } from "../../../constants/routeConstants";
const INITIAL_FORM = {
  username: "",
  password: "",
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  position: "",
};

export default function CreateStaffPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      const request = {
        username: form.username.trim(),
        password: form.password,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        dateOfBirth: form.dateOfBirth,
        gender: form.gender,
        position: form.position.trim(),
      };

      const response = await userApi.createStaff(request);

      if (!response.success) {
        throw new Error(response.message || "Không thể tạo tài khoản Staff.");
      }

      window.alert("Tạo tài khoản Staff thành công.");

      navigate(ROUTES.ADMIN.USERS.LIST);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Không thể tạo tài khoản Staff.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Tạo tài khoản Staff</h2>

          <p className="text-muted mb-0">
            Tạo tài khoản đăng nhập và hồ sơ nhân viên.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate(ROUTES.ADMIN.USERS.LIST)}
        >
          Quay lại
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Thông tin tài khoản</h5>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Username *</label>

              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="form-control"
                maxLength={50}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Password *</label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control"
                minLength={8}
                maxLength={100}
                required
              />
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="mb-3">Thông tin cá nhân</h5>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Họ và tên *</label>

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="form-control"
                maxLength={100}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email *</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Số điện thoại *</label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Ngày sinh *</label>

              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Giới tính *</label>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Chọn giới tính</option>

                <option value="MALE">Nam</option>

                <option value="FEMALE">Nữ</option>

                <option value="OTHER">Khác</option>
              </select>
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="mb-3">Thông tin nhân viên</h5>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Chức vụ *</label>

              <input
                type="text"
                name="position"
                value={form.position}
                onChange={handleChange}
                className="form-control"
                maxLength={100}
                placeholder="VD: Nhân viên tiếp nhận"
                required
              />
            </div>
          </div>
        </div>

        <div className="card-footer bg-white d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(ROUTES.ADMIN.USERS.LIST)}
            disabled={loading}
          >
            Hủy
          </button>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Đang tạo..." : "Tạo tài khoản Staff"}
          </button>
        </div>
      </form>
    </div>
  );
}
