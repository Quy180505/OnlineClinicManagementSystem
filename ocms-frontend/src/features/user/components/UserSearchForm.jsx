import { useState } from "react";

const DEFAULT_VALUES = {
  keyword: "",
  roleName: "",
  status: "",
};

export default function UserSearchForm({
  onSearch,
  initialValues = DEFAULT_VALUES,
}) {
  const [form, setForm] = useState({
    keyword: initialValues.keyword ?? "",
    roleName: initialValues.roleName ?? "",
    status: initialValues.status ?? "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch({
      keyword: form.keyword?.trim() || null,
      roleName: form.roleName || null,
      status: form.status || null,
      page: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Từ khóa</label>

            <input
              type="text"
              name="keyword"
              value={form.keyword}
              onChange={handleChange}
              className="form-control"
              placeholder="Username hoặc họ tên"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Vai trò</label>

            <select
              name="roleName"
              value={form.roleName}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Tất cả</option>

              <option value="ROLE_ADMIN">Admin</option>

              <option value="ROLE_DOCTOR">Bác sĩ</option>

              <option value="ROLE_STAFF">Staff</option>

              <option value="ROLE_PATIENT">Bệnh nhân</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Trạng thái</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Tất cả</option>

              <option value="ACTIVE">Hoạt động</option>

              <option value="LOCKED">Đã khóa</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Tìm kiếm
          </button>
        </div>
      </div>
    </form>
  );
}
