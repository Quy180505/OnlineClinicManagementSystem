import { useState } from "react";

import MedicineSearchDropdown from "./MedicineSearchDropdown";

export default function ImportMedicineModal({
  loading, selectedMedicine,medicines,medicineSearchLoading,
  onSearchMedicine,onSelectMedicine,onClearMedicineSearch,onClose,onSubmit,
}) {
  const [quantity, setQuantity] = useState("");
  const [importDate, setImportDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!selectedMedicine) {
      setError("Vui lòng chọn thuốc.");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      setError("Số lượng phải lớn hơn 0.");
      return;
    }

    if (!importDate) {
      setError("Vui lòng chọn ngày nhập.");
      return;
    }

    if (!expireDate) {
      setError("Vui lòng chọn hạn sử dụng.");
      return;
    }

    if (expireDate <= importDate) {
      setError("Hạn sử dụng phải sau ngày nhập.",);
      return;
    }

    try {
      await onSubmit({
        medicineId: selectedMedicine.id,
        quantity: Number(quantity),
        importDate,
        expireDate,
        note: note.trim() || null,
      });
    } catch {
     console.error("Có lỗi xảy ra")
    }
  };

  const handleClose = () => {
    if (loading) {
      return;
    }
    onClose();
  };

  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{
          zIndex: 1040,
        }}
      />

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{
          zIndex: 1050,
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-box-arrow-in-down me-2" />
                  Nhập thuốc vào kho
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  disabled={loading}
                  aria-label="Close"
                />
              </div>

              <div className="modal-body">
                {error && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                  >
                    <i className="bi bi-exclamation-circle me-2" />
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">
                    Thuốc
                    <span className="text-danger">
                      {" "}
                      *
                    </span>
                  </label>

                  {selectedMedicine ? (
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={
                          selectedMedicine.medicineName
                        }
                        readOnly
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={
                          onClearMedicineSearch
                        }
                        disabled={loading}
                      >
                        <i className="bi bi-x-lg" />
                      </button>
                    </div>
                  ) : (
                    <MedicineSearchDropdown
                      medicines={medicines}
                      loading={medicineSearchLoading}
                      onSearch={onSearchMedicine}
                      onSelect={onSelectMedicine}
                    />
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Số lượng
                    <span className="text-danger">
                      {" "}
                      *
                    </span>
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(
                        event.target.value,
                      )
                    }
                    disabled={loading}
                    placeholder="Nhập số lượng"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Ngày nhập
                      <span className="text-danger">
                        {" "}
                        *
                      </span>
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      value={importDate}
                      onChange={(event) =>
                        setImportDate(
                          event.target.value,
                        )
                      }
                      disabled={loading}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Hạn sử dụng
                      <span className="text-danger">
                        {" "}
                        *
                      </span>
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      value={expireDate}
                      min={importDate || undefined}
                      onChange={(event) =>
                        setExpireDate(
                          event.target.value,
                        )
                      }
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Ghi chú
                  </label>

                  <textarea
                    className="form-control"
                    rows="3"
                    value={note}
                    onChange={(event) =>
                      setNote(event.target.value)
                    }
                    disabled={loading}
                    placeholder="Nhập ghi chú nếu có..."
                  />
                </div>

                {selectedMedicine && (
                  <div className="card bg-light border-0">
                    <div className="card-body py-2">
                      <div className="small text-muted">
                        Thuốc đã chọn
                      </div>

                      <div className="fw-semibold">
                        {
                          selectedMedicine.medicineName
                        }
                      </div>

                      {selectedMedicine.unit && (
                        <div className="small text-muted">
                          Đơn vị:{" "}
                          {selectedMedicine.unit}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    loading ||
                    !selectedMedicine
                  }
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg me-1" />
                      Nhập thuốc
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}