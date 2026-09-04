import PrescriptionMedicineList from "../prescription/PrescriptionMedicineList";
import { formatDateTime } from "../../../../utils/dateUtils";
export default function PrescriptionPatientDetail({prescription,loading = false}) {
  if (loading) {
    return (
      <div className="text-center py-4">
        <div
          className="spinner-border spinner-border-sm text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Đang tải...
          </span>
        </div>

        <div className="text-muted small mt-2">
          Đang tải đơn thuốc...
        </div>
      </div>
    );
  }

  if (!prescription) {
    return null;
  }

  return (
    <div>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <div className="text-muted small">
              Ngày kê
            </div>

            <div className="fw-semibold">
                {formatDateTime(prescription.prescriptionDate)}
            </div>
          </div>

          <div className="text-end">
            <div className="text-muted small">
              Bác sĩ
            </div>

            <div className="fw-semibold text-truncate">
              {prescription.doctorName || "-"}
            </div>
          </div>
        </div>
      </div>

      {prescription.note && (
        <div className="border rounded p-2 mb-3 bg-light">
          <div className="text-muted small mb-1">
            <i className="bi bi-info-circle me-1" />
            Ghi chú
          </div>

          <div className="small">
            {prescription.note}
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">
          Danh sách thuốc
        </h6>

        <span className="badge text-bg-light">
          {prescription.details?.length || 0}
        </span>
      </div>

      <PrescriptionMedicineList
        details={prescription.details || []}
      />
    </div>
  );
}