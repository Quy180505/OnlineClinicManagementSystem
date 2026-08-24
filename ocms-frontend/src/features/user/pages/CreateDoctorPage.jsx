import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { userApi } from "../api/userApi";
import { specialtyApi } from "../../specialty/api/specialtyApi";

const initialForm = {
  username: "",
  password: "",
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  specialtyId: "",
  degree: "",
  experienceYears: "",
};

export default function CreateDoctorPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [specialties, setSpecialties] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingSpecialties, setLoadingSpecialties] = useState(false);

  const [error, setError] = useState("");
  const [specialtyError, setSpecialtyError] = useState("");

  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        setLoadingSpecialties(true);
        setSpecialtyError("");

        const response = await specialtyApi.getAll();

        if (!response.success) {
          throw new Error(
            response.message || "Không thể tải danh sách chuyên khoa.",
          );
        }

        setSpecialties(response.data || []);
      } catch (error) {
        setSpecialtyError(
          error?.response?.data?.message ||
            error?.message ||
            "Không thể tải danh sách chuyên khoa.",
        );
      } finally {
        setLoadingSpecialties(false);
      }
    };

    loadSpecialties();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      setLoading(true);

      const request = {
        username: form.username,
        password: form.password,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        dateOfBirth: form.dateOfBirth,
        gender: form.gender,
        specialtyId: Number(form.specialtyId),
        degree: form.degree || null,
        experienceYears:
          form.experienceYears === "" ? null : Number(form.experienceYears),
      };

      await userApi.createDoctor(request);

      alert("Tạo tài khoản bác sĩ thành công.");

      navigate("/admin/users");
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Không thể tạo tài khoản bác sĩ.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Tạo tài khoản bác sĩ</h2>

          <p className="text-muted mb-0">
            Tạo tài khoản đăng nhập và hồ sơ bác sĩ.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/admin/users")}
        >
          Quay lại
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

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

              <div className="form-text">Mật khẩu phải có ít nhất 8 ký tự.</div>
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
                type="text"
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

          <h5 className="mb-3">Thông tin chuyên môn</h5>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Chuyên khoa *</label>

              <select
                name="specialtyId"
                value={form.specialtyId}
                onChange={handleChange}
                className={`form-select ${specialtyError ? "is-invalid" : ""}`}
                disabled={loadingSpecialties}
                required
              >
                <option value="">
                  {loadingSpecialties
                    ? "Đang tải chuyên khoa..."
                    : "Chọn chuyên khoa"}
                </option>

                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>

              {specialtyError ? (
                <div className="invalid-feedback">{specialtyError}</div>
              ) : (
                <div className="form-text">Chọn chuyên khoa cho bác sĩ.</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Học vị</label>

              <input
                type="text"
                name="degree"
                value={form.degree}
                onChange={handleChange}
                className="form-control"
                maxLength={150}
                placeholder="VD: Bác sĩ CKII"
              />
            </div>

            {/* Kinh nghiệm */}

            <div className="col-md-6">
              <label className="form-label">Số năm kinh nghiệm</label>

              <input
                type="number"
                name="experienceYears"
                value={form.experienceYears}
                onChange={handleChange}
                className="form-control"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="card-footer bg-white d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/admin/users")}
            disabled={loading}
          >
            Hủy
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || loadingSpecialties || specialties.length === 0}
          >
            {loading ? "Đang tạo..." : "Tạo tài khoản bác sĩ"}
          </button>
        </div>
      </form>
    </div>
  );
}
