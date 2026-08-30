import { useState } from "react";

const EMPTY_FORM = {
  medicineName: "",
  medicineCategoryId: "",
  unit: "",
  price: "",
  description: "",
};

export default function MedicineFormModal({
  medicine,searchCategories,searchCategoriesResult = [],
  searchLoading,clearCategorySearch,loading,onClose,onSubmit
}) {
  const isEdit = Boolean(medicine);

  const [form, setForm] = useState(() => {
    if (medicine) {
      return {
        medicineName: medicine.medicineName || "",
        medicineCategoryId:
        medicine.medicineCategoryId || "",
        unit: medicine.unit || "",
        price: medicine.price || "",
        description: medicine.description || ""
      };
    }

    return EMPTY_FORM;
  });

  const [categoryKeyword, setCategoryKeyword] = useState("");

  const [selectedCategoryName, setSelectedCategoryName] = useState(medicine?.medicineCategoryName || "");

  const [validationError, setValidationError] = useState("");

  const handleChange = (event) => { 

    const { name, value } = event.target;

    setForm((prev) => ({...prev,[name]: value}));
  };

  const handleCategorySearch = (event) => {
    const value = event.target.value;

    setCategoryKeyword(value);

    if (!value.trim()) {
      clearCategorySearch();
      setSelectedCategoryName("");
      setForm((prev) => ({...prev,medicineCategoryId: ""}));

      return;
    }

    searchCategories(value);
  };

  const handleSelectCategory = (category) => {
    setForm((prev) => ({ ...prev,medicineCategoryId: category.id }));
    setSelectedCategoryName(category.categoryName);
    setCategoryKeyword("");
    clearCategorySearch();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.medicineName.trim() ||!form.medicineCategoryId ||!form.unit.trim() ||!form.price) {

      setValidationError("Vui lòng nhập đầy đủ các thông tin bắt buộc.");
      return;
    }

    setValidationError("");

    await onSubmit({
      medicineName: form.medicineName.trim(),
      medicineCategoryId: Number(form.medicineCategoryId),
      unit: form.unit.trim(),
      price: Number(form.price),
      description:form.description.trim() || null
    });
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit
                  ? "Chỉnh sửa thuốc"
                  : "Thêm thuốc"}
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
                <div className="alert alert-danger">
                  {validationError}
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Tên thuốc{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="medicineName"
                    className="form-control"
                    value={form.medicineName}
                    onChange={handleChange}
                    maxLength={150}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Danh mục{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control"
                      value={
                        categoryKeyword ||
                        selectedCategoryName
                      }
                      onChange={
                        handleCategorySearch
                      }
                      placeholder="Nhập tên danh mục..."
                    />

                    {searchLoading && (
                      <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                        <span className="spinner-border spinner-border-sm text-secondary" />
                      </div>
                    )}

                    {!searchLoading &&
                      searchCategoriesResult.length >
                        0 && (
                        <div
                          className="position-absolute start-0 end-0 bg-white border rounded shadow-sm mt-1"
                          style={{
                            zIndex: 1056,
                            maxHeight: "220px",
                            overflowY: "auto",
                          }}
                        >
                          {searchCategoriesResult.map(
                            (category) => (
                              <button
                                key={category.id}
                                type="button"
                                className="dropdown-item py-2"
                                onClick={() =>handleSelectCategory(category,)
                                }
                              >
                                <div className="fw-semibold">
                                  {
                                    category.categoryName
                                  }
                                </div>

                                {category.description && (
                                  <small className="text-muted">
                                    {
                                      category.description
                                    }
                                  </small>
                                )}
                              </button>
                            ),
                          )}
                        </div>
                      )}

                    {!searchLoading &&
                      categoryKeyword.trim().length >= 2 && searchCategoriesResult.length === 0 && (
                        <div
                          className="position-absolute start-0 end-0 bg-white border rounded shadow-sm mt-1 p-3 text-muted"
                          style={{
                            zIndex: 1056,
                          }}
                        >
                          Không tìm thấy danh mục.
                        </div>
                      )}
                  </div>

                  {form.medicineCategoryId && (
                    <small className="text-success">
                      Đã chọn:{" "}
                      {selectedCategoryName}
                    </small>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Đơn vị{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="unit"
                    className="form-control"
                    value={form.unit}
                    onChange={handleChange}
                    maxLength={30}
                    placeholder="Ví dụ: Viên"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Giá bán{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Mô tả
                  </label>

                  <textarea
                    name="description"
                    className="form-control"
                    rows="4"
                    value={form.description}
                    onChange={handleChange}
                  />
                </div>
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
                    {isEdit
                      ? "Lưu thay đổi"
                      : "Thêm thuốc"}
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