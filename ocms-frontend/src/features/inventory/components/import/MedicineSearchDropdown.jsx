import { useState } from "react";

export default function MedicineSearchDropdown({medicines = [],loading = false,onSearch, onSelect}) {
  const [keyword, setKeyword] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;

    setKeyword(value);
    setShowResults(true);
    onSearch(value);
  };

  const handleSelect = (medicine) => {
    setKeyword(medicine.medicineName);
    setShowResults(false);

    onSelect(medicine);
  };

  const handleFocus = () => {
    if (keyword.trim().length >= 2) {
      setShowResults(true);
    }
  };

  return (
    <div className="position-relative">
      <div className="input-group">
        <span className="input-group-text">
          <i className="bi bi-search" />
        </span>

        <input
          type="text"
          className="form-control"
          value={keyword}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Nhập tên thuốc..."
          autoComplete="off"
        />

        {loading && (
          <span className="input-group-text">
            <span
              className="spinner-border spinner-border-sm"
              role="status"
            />
          </span>
        )}
      </div>

      {showResults && keyword.trim().length >= 2 && (
        <div
          className="position-absolute bg-white border rounded shadow-sm w-100 mt-1"
          style={{
            zIndex: 1060,
            maxHeight: "250px",
            overflowY: "auto",
          }}
        >
          {loading ? (
            <div className="text-center py-3 text-muted">
              Đang tìm kiếm...
            </div>
          ) : medicines.length === 0 ? (
            <div className="text-center py-3 text-muted">
              Không tìm thấy thuốc.
            </div>
          ) : (
            medicines.map((medicine) => (
              <button
                key={medicine.id}
                type="button"
                className="dropdown-item py-2"
                onMouseDown={(event) => {
                  event.preventDefault();
                  handleSelect(medicine);
                }}
              >
                <div className="fw-semibold">
                  {medicine.medicineName}
                </div>

                <div className="small text-muted">
                  {medicine.unit && (
                    <span>
                      Đơn vị: {medicine.unit}
                    </span>
                  )}

                  {medicine.medicineCategoryName && (
                    <span className="ms-2">
                      • {medicine.medicineCategoryName}
                    </span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}