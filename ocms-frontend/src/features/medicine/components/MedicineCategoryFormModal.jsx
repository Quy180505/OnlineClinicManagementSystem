import { useState } from "react";

const EMPTY_FORM = {
  categoryName: "",
  description: "",
};

export default function MedicineCategoryFormModal({category,loading,onClose, onSubmit,}) {
  const isEdit = Boolean(category);

  const [form, setForm] = useState(() => {
    if (category) {
      return {
        categoryName: category.categoryName || "",
        description: category.description || "",
      };
    }

    return EMPTY_FORM;
  });

  const [validationError, setValidationError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.categoryName.trim()) {
      setValidationError("Tên danh mục không được để trống.");
      return;
    }

    setValidationError("");

    await onSubmit({
      categoryName: form.categoryName.trim(),
      description: form.description.trim() || null,
    });
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                disabled={loading}
              />
            </div>

            <div className="modal-body">
              {validationError && (
                <div className="alert alert-danger">{validationError}</div>
              )}

              <div className="mb-3">
                <label className="form-label">
                  Tên danh mục <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  name="categoryName"
                  className="form-control"
                  value={form.categoryName}
                  onChange={handleChange}
                  maxLength={100}
                />
              </div>

              <div>
                <label className="form-label">Mô tả</label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Hủy
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg me-1" />
                    {isEdit ? "Lưu thay đổi" : "Thêm danh mục"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
