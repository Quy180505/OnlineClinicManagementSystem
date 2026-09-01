import { useState } from "react";
import PrescriptionModal from "../components/create/PrescriptionModal";
import usePrescription from "../hooks/usePrescription";
import usePrescriptionMedicineSearch from "../hooks/usePrescriptionMedicineSearch";

export default function DoctorPrescriptionPage({medicalRecordId, onPrescriptionCreated}) {

  const [showModal, setShowModal] = useState(false);
  const { actionLoading,error,createPrescription,clearError } = usePrescription();
  const { medicines,searchLoading,searchMedicines,clearSearch} = usePrescriptionMedicineSearch();

  const handleOpenModal = () => {

    clearError();
    clearSearch();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (actionLoading) {
      return;
    }

    clearSearch();
    setShowModal(false);
  };

  const handleSubmit = async (data) => {
    try {
      const result = await createPrescription( medicalRecordId,data);

      clearSearch();
      setShowModal(false);

      onPrescriptionCreated?.(result);
    } catch {
      console.error("Error creating prescription");
    }
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-circle me-2" />
          {error}

          <button
            type="button"
            className="btn-close float-end"
            onClick={clearError}
          />
        </div>
      )}

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleOpenModal}
        disabled={!medicalRecordId}
      >
        <i className="bi bi-prescription2 me-1" />
        Kê đơn thuốc
      </button>

      {showModal && (
        <PrescriptionModal
          medicalRecordId={medicalRecordId}
          medicines={medicines}
          medicineSearchLoading={searchLoading}
          loading={actionLoading}
          onSearchMedicine={ searchMedicines}
          onClearMedicineSearch={clearSearch}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}