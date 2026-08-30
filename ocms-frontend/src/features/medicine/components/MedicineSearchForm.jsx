export default function MedicineSearchForm({searchParams,categories,onSearch}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSearch({
      medicineName: formData.get("medicineName")?.trim() || "",
      medicineCategoryId:formData.get("medicineCategoryId") || "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3 align-items-end">
        <div className="col-md-6">
          <label className="form-label">
            Tên thuốc
          </label>

          <input
            type="text"
            name="medicineName"
            className="form-control"
            placeholder="Nhập tên thuốc..."
            defaultValue={searchParams.medicineName}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">
            Danh mục
          </label>

          <select
            name="medicineCategoryId"
            className="form-select"
            defaultValue={searchParams.medicineCategoryId}
          >
            <option value="">
              Tất cả danh mục
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            <i className="bi bi-search me-1" />
            Tìm kiếm
          </button>
        </div>
      </div>
    </form>
  );
}