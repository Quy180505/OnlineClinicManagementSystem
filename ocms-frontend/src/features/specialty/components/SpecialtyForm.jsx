import useSpecialtyForm from "../hooks/useSpecialtyForm";

export default function SpecialtyForm({ specialty, onSubmit, loading }) {
  const { form, handleChange, getSubmitData } = useSpecialtyForm(specialty);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(getSubmitData());
  };

  const isEdit = Boolean(specialty);

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3">
        <h5 className="mb-1">
          {isEdit ? "Thông tin chuyên khoa" : "Thêm chuyên khoa"}
        </h5>

        <small className="text-muted">
          {isEdit
            ? "Cập nhật thông tin của chuyên khoa."
            : "Nhập thông tin để tạo chuyên khoa mới."}
        </small>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="name" className="form-label">
                Tên chuyên khoa
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                maxLength={100}
                disabled={loading}
                required
                placeholder="Nhập tên chuyên khoa"
              />
            </div>

            <div className="col-12">
              <label htmlFor="description" className="form-label">
                Mô tả
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
                rows="4"
                maxLength={1000}
                disabled={loading}
                placeholder="Nhập mô tả chuyên khoa"
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
              "Thêm chuyên khoa"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
