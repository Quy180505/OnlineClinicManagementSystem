import { useEffect, useState } from "react";

import PrescriptionForm from "../create/PrescriptionForm";
import PrescriptionDetail from "../prescription/PrescriptionDetail";

import usePrescription from "../../hooks/usePrescription";
import usePrescriptionMedicineSearch from "../../hooks/usePrescriptionMedicineSearch";

export default function DoctorPrescriptionPanel({ medicalRecordId }) {
  const [showForm, setShowForm] = useState(false);

  const {
    prescription,loading,actionLoading,error, loadPrescriptionByMedicalRecord,createPrescription,clearError
  } = usePrescription();

  const { medicines,loading: medicineSearchLoading,searchMedicines,clearSearch } = usePrescriptionMedicineSearch();

  useEffect(() => {
    if (!medicalRecordId) {
      return;
    }

    let cancelled = false;

    queueMicrotask(() => {
      if (!cancelled) {
        loadPrescriptionByMedicalRecord(medicalRecordId).catch(() => {});
      }
    });

    return () => {
      cancelled = true;
    };
  }, [medicalRecordId, loadPrescriptionByMedicalRecord]);

  const handleOpenForm = () => {
    clearError();
    clearSearch();
    setShowForm(true);
  };

  const handleCancel = () => {
    if (actionLoading) {
      return;
    }

    clearError();
    clearSearch();
    setShowForm(false);
  };

  const handleCreate = async (data) => {
    try {
      await createPrescription(medicalRecordId, data);

      clearSearch();
      setShowForm(false);
    } catch {
      console.error("Error creating prescription");
    }
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white border-0 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">Đơn thuốc</h5>

            <small className="text-muted">Kê đơn thuốc cho bệnh nhân</small>
          </div>

          {!showForm && !prescription && (
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={handleOpenForm}
            >
              <i className="bi bi-prescription2 me-1" />
              Kê đơn thuốc
            </button>
          )}
        </div>
      </div>

      <div className="card-body">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            {error}

            <button type="button" className="btn-close" onClick={clearError} />
          </div>
        )}

        {showForm ? (
          <PrescriptionForm
            medicines={medicines}
            medicineSearchLoading={medicineSearchLoading}
            loading={actionLoading}
            onSearchMedicine={searchMedicines}
            onClearMedicineSearch={clearSearch}
            onSubmit={handleCreate}
            onCancel={handleCancel}
          />
        ) : loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" />

            <div className="text-muted mt-2">Đang tải đơn thuốc...</div>
          </div>
        ) : prescription ? (
          <PrescriptionDetail prescription={prescription} />
        ) : (
          <div className="text-center py-5">
            <div className="mb-3">
              <span
                className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle"
                style={{
                  width: "64px",
                  height: "64px",
                }}
              >
                <i className="bi bi-prescription2 fs-3 text-muted" />
              </span>
            </div>

            <h6 className="mb-2">Chưa có đơn thuốc</h6>

            <p className="text-muted mb-3">
              Bác sĩ có thể kê thuốc cho bệnh nhân trong quá trình khám.
            </p>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleOpenForm}
            >
              Kê đơn thuốc
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
