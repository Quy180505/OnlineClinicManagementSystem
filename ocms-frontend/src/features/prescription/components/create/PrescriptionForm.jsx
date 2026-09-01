import {useCallback,useState} from "react";

import MedicineSelector from "./MedicineSelector";
import PrescriptionDetailForm from "./PrescriptionDetailForm";

export default function PrescriptionForm({medicines = [],medicineSearchLoading = false,loading = false,onSearchMedicine,
                                          onClearMedicineSearch,onSubmit,  onCancel}) {
  const [note, setNote] = useState("");
  const [details, setDetails] = useState([]);
  const [error, setError] = useState("");

  const handleSelectMedicine =
    useCallback((medicine) => {
      setDetails((prev) => [...prev,
        {
          medicineId: medicine.id,
          medicineName: medicine.medicineName,
          unitPrice:medicine.price ?? 0,
          quantity: 1,
          dosage: "",
          usageInstruction: "",
        },
      ]);
    }, []);

  const handleDetailChange = useCallback(
    (index, changes) => {
      setDetails((prev) =>
        prev.map((detail, detailIndex) => detailIndex === index ? {...detail,...changes} : detail));
    },
    [],
  );

  const handleRemoveDetail = useCallback((index) => { setDetails((prev) => prev.filter((_, detailIndex) => detailIndex !== index))}, []);

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    if (details.length === 0) {
      setError("Vui lòng chọn ít nhất một loại thuốc.");
      return;
    }

    const invalidDetail = details.find(
      (detail) =>
        !detail.quantity ||
        detail.quantity < 1 ||
        !detail.dosage.trim(),
    );

    if (invalidDetail) {
      setError(
        "Vui lòng nhập đầy đủ số lượng và liều dùng cho các thuốc.",
      );
      return;
    }

    const request = {

      note: note.trim() || null,

      details: details.map((detail) => ({
        medicineId: detail.medicineId,
        quantity: detail.quantity,
        dosage: detail.dosage.trim(),
        usageInstruction:detail.usageInstruction.trim() || null
      })),
    };

    try {
      await onSubmit?.(request);
    } catch {
      console.error("Error submitting prescription form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-circle me-2" />
          {error}
        </div>
      )}

      <MedicineSelector
       medicines={medicines}
        loading={medicineSearchLoading}
        onSearch={onSearchMedicine}
        onSelect={handleSelectMedicine}
        onClear={onClearMedicineSearch}
      />

      <div className="mt-3">
        {details.length === 0 ? (
          <div className="text-center text-muted border rounded p-4">
            <i className="bi bi-capsule fs-3 d-block mb-2" />
            Chưa có thuốc được chọn.
          </div>
        ) : (
          details.map((detail, index) => (
            <PrescriptionDetailForm
              key={`${detail.medicineId}-${index}`}
              detail={detail}
              index={index}
              onChange={ handleDetailChange}
              onRemove={ handleRemoveDetail}
            />
          ))
        )}
      </div>

      <div className="mt-3">
        <label className="form-label">
          Ghi chú
        </label>

        <textarea
          className="form-control"
          rows="3"
          value={note}
          onChange={(event) =>setNote(event.target.value)}
          placeholder="Nhập ghi chú cho đơn thuốc nếu có..."
          maxLength={1000}
        />
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onCancel}
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
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              />
              Đang kê đơn...
            </>
          ) : (
            <>
              <i className="bi bi-prescription2 me-1" />
              Kê đơn thuốc
            </>
          )}
        </button>
      </div>
    </form>
  );
}