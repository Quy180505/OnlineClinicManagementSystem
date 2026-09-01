import PrescriptionForm from "./PrescriptionForm";

export default function PrescriptionModal({
  medicalRecordId,medicines = [], medicineSearchLoading = false,loading = false,
  onSearchMedicine,onClearMedicineSearch,onClose, onSubmit
}) {

  const selectedMedicineIds = medicines.map(() => null);

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor:
          "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-scrollable"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title mb-1">
                Kê đơn thuốc điện tử
              </h5>

              <small className="text-muted">
               Mã bệnh án: {medicalRecordId}
              </small>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            />
          </div>

          <div className="modal-body">
            <PrescriptionForm
              medicines={medicines}
              medicineSearchLoading={medicineSearchLoading}
              selectedMedicineIds={selectedMedicineIds}
              loading={loading}
              onSearchMedicine={ onSearchMedicine}
              onClearMedicineSearch={ onClearMedicineSearch}
              onSubmit={onSubmit}
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}