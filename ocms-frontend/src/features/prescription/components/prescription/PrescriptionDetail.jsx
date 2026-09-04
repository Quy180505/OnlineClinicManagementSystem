import PrescriptionMedicineList from "./PrescriptionMedicineList";
import { formatDateTime } from "../../../../utils/dateUtils";
export default function PrescriptionDetail({prescription}) {
  if (!prescription) {
    return null;
  }

  return (
    <div>
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="text-muted small">
            Ngày kê đơn
          </div>

          <div className="fw-semibold">
            {formatDateTime(prescription.prescriptionDate)}
          </div>
        </div>

        <div className="col-md-6">
          <div className="text-muted small">
            Bác sĩ kê đơn
          </div>

          <div className="fw-semibold">
            {prescription.doctorName}
          </div>
        </div>
      </div>

      {prescription.note && (
        <div className="alert alert-light border">
          <strong>Ghi chú:</strong>{" "}
          {prescription.note}
        </div>
      )}

      <PrescriptionMedicineList
        details={prescription.details}
      />
    </div>
  );
}