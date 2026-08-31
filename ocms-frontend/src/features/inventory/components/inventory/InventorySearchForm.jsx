
import { useState } from "react";
import useMedicineCategory from "../../../medicine/hooks/useMedicineCategory";

const STATUS_LABELS = {
  IN_STOCK: "Còn hàng",
  LOW_STOCK: "Sắp hết",
  OUT_OF_STOCK: "Hết hàng",
  EXPIRED: "Hết hạn",
};

export default function InventorySearchForm({statuses = [],onSearch,loading = false}) {
  const [formData, setFormData] = useState({
    medicineCategoryId: "",
    inventoryStatusId: "",
    expireDateFrom: "",
    expireDateTo: "",
  });

  const [categoryKeyword, setCategoryKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState(false);

  const {
    searchCategoriesResult,
    searchLoading: categorySearchLoading,
    searchCategories,
    clearCategorySearch,
  } = useMedicineCategory();


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({...prev,[name]: value}));
  };

  const handleCategorySearch = (event) => {
    const keyword = event.target.value;

    setCategoryKeyword(keyword);
    setShowCategoryDropdown(true);


    if (selectedCategory) {
      setSelectedCategory(null);

      setFormData((prev) => ({...prev,medicineCategoryId: "",}));
    }

    searchCategories(keyword);
  };
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);

    setCategoryKeyword(category.categoryName);

    setFormData((prev) => ({...prev,medicineCategoryId: category.id,}));

    setShowCategoryDropdown(false);
    clearCategorySearch();
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
    setCategoryKeyword("");

    setFormData((prev) => ({...prev,medicineCategoryId: ""}));

    setShowCategoryDropdown(false);
    clearCategorySearch();
  };

const handleSubmit = (event) => {
  event.preventDefault();

  onSearch?.({
    medicineCategoryId: formData.medicineCategoryId? Number(formData.medicineCategoryId): null,
    inventoryStatusId: formData.inventoryStatusId ? Number(formData.inventoryStatusId) : null,
    expireDateFrom:formData.expireDateFrom || null,
    expireDateTo:formData.expireDateTo || null,
  });
};

  const handleReset = () => {
      setFormData({
        medicineCategoryId: "",
        inventoryStatusId: "",
        expireDateFrom: "",
        expireDateTo: "",
      });

      setCategoryKeyword("");
      setSelectedCategory(null);
      setShowCategoryDropdown(false);

      clearCategorySearch();

      onSearch?.({
        medicineCategoryId: null,
        inventoryStatusId: null,
        expireDateFrom: null,
        expireDateTo: null,
      });
    };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label
            htmlFor="medicineCategorySearch"
            className="form-label"
          >
            Danh mục thuốc
          </label>

          <div className="position-relative">
            <div className="input-group">
              <input
                id="medicineCategorySearch"
                type="text"
                className="form-control"
                placeholder="Nhập tên danh mục..."
                value={categoryKeyword}
                onChange={handleCategorySearch}
                onFocus={() => {
                  if (categoryKeyword.trim()) {
                    setShowCategoryDropdown(true);
                  }
                }}
                disabled={loading}
                autoComplete="off"
              />

              {categoryKeyword && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleClearCategory}
                  disabled={loading}
                  title="Xóa danh mục"
                >
                  <i className="bi bi-x-lg" />
                </button>
              )}
            </div>

            {showCategoryDropdown && (
              <div
                className="position-absolute w-100 bg-white border rounded shadow-sm mt-1"
                style={{
                  zIndex: 1050,
                  maxHeight: "240px",
                  overflowY: "auto",
                }}
              >
                {categorySearchLoading && (
                  <div className="px-3 py-2 text-muted">
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Đang tìm danh mục...
                  </div>
                )}

                {!categorySearchLoading &&
                  categoryKeyword.trim().length > 0 &&
                  searchCategoriesResult.length === 0 && (
                    <div className="px-3 py-2 text-muted">
                      Không tìm thấy danh mục.
                    </div>
                  )}

                {!categorySearchLoading &&
                  searchCategoriesResult.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className="dropdown-item px-3 py-2"
                      onClick={() =>
                        handleSelectCategory(category)
                      }
                    >
                      <i className="bi bi-folder2 me-2 text-muted" />
                      {category.categoryName}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {selectedCategory && (
            <div className="form-text">
              Đã chọn:{" "}
              <span className="fw-semibold">
                {selectedCategory.categoryName}
              </span>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label
            htmlFor="inventoryStatusId"
            className="form-label"
          >
            Trạng thái kho
          </label>

          <select
            id="inventoryStatusId"
            name="inventoryStatusId"
            className="form-select"
            value={formData.inventoryStatusId}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">
              Tất cả trạng thái
            </option>

            {statuses.map((status) => (
              <option
                key={status.id}
                value={status.id}
              >
                {STATUS_LABELS[status.statusName] ||
                  status.statusName}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label
            htmlFor="expireDateFrom"
            className="form-label"
          >
            Hạn sử dụng từ
          </label>

          <input
            id="expireDateFrom"
            name="expireDateFrom"
            type="date"
            className="form-control"
            value={formData.expireDateFrom}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="col-md-6">
          <label
            htmlFor="expireDateTo"
            className="form-label"
          >
            Hạn sử dụng đến
          </label>

          <input
            id="expireDateTo"
            name="expireDateTo"
            type="date"
            className="form-control"
            value={formData.expireDateTo}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleReset}
          disabled={loading}
        >
          <i className="bi bi-arrow-counterclockwise me-1" />
          Đặt lại
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              />
              Đang tìm...
            </>
          ) : (
            <>
              <i className="bi bi-search me-1" />
              Tìm kiếm
            </>
          )}
        </button>
      </div>
    </form>
  );
}

