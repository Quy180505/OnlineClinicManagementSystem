import { useState } from "react";

export default function MedicineSelector({ medicines = [],loading = false,onSearch,onSelect, onClear,}) {

  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (event) => {

    const value = event.target.value;
    setKeyword(value);
    setShowDropdown(true);
    onSearch?.(value);

    if (!value.trim()) {
      onClear?.();
    }
  };

  const handleSelect = (medicine) => {
    onSelect?.(medicine);
    setKeyword("");
    setShowDropdown(false);

    onClear?.();
  };

  const handleClear = () => {
    setKeyword("");
    setShowDropdown(false);
    onClear?.();
  };

  return (
    <div className="mb-3">
      <label className="form-label">
        Thuốc
        <span className="text-danger ms-1">
          *
        </span>
      </label>

      <div className="position-relative">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={keyword}
            onChange={handleChange}
            onFocus={() => {
              if (keyword.trim()) {
                setShowDropdown(true);
              }
            }}
            placeholder="Nhập tên thuốc để tìm..."
            autoComplete="off"
            disabled={loading}
          />

          {keyword && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleClear}
              disabled={loading}
            >
              <i className="bi bi-x-lg" />
            </button>
          )}
        </div>

        {showDropdown && (
          <div
            className="position-absolute start-0 end-0 bg-white border rounded shadow-sm mt-1"
            style={{
              zIndex: 1055,
              maxHeight: "250px",
              overflowY: "auto",
            }}
          >
            {loading && (
              <div className="px-3 py-2 text-muted">
                <span className="spinner-border spinner-border-sm me-2" />
                Đang tìm thuốc...
              </div>
            )}

            {!loading &&
              keyword.trim().length >= 2 &&
              medicines.length === 0 && (
                <div className="px-3 py-2 text-muted">
                  Không tìm thấy thuốc.
                </div>
              )}

            {!loading &&
              medicines.map((medicine) => (
                <button
                  key={medicine.id}
                  type="button"
                  className="dropdown-item px-3 py-2"
                  onClick={() =>
                    handleSelect(medicine)
                  }
                >
                  <div className="fw-semibold">
                    {medicine.medicineName}
                  </div>

                  <small className="text-muted">
                    {medicine.unit || "-"}
                    {" • "}
                    {medicine.price != null? Number( medicine.price,).toLocaleString("vi-VN"): "0"}{" "} đ
                  </small>
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}