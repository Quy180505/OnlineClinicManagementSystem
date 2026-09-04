import { formatDateTime } from "../../../../utils/dateUtils";
export default function PrescriptionPatientTable({prescriptions = [], loading = false,onViewDetail}) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <span
          className="spinner-border"
          role="status"
        />
      </div>
    );
  }

  if (prescriptions.length === 0) {
    return (
      <div className="text-center text-muted py-5">
        Không tìm thấy đơn thuốc.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Ngày kê đơn</th>
            <th>Bác sĩ</th>
            <th>Thuốc</th>
            <th className="text-end">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody>
          {prescriptions.map(
            (prescription) => (
              <tr key={prescription.id}>


                <td>
                  {formatDateTime(prescription.prescriptionDate)}
                </td>

                <td>
                  {prescription.doctorName}
                </td>

                <td>
                  {prescription.details?.map((detail) => detail.medicineName).join(", ") || "—"}
                </td>

                <td className="text-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onViewDetail?.(prescription.id)}
                  >
                    <i className="bi bi-eye me-1" />
                    Xem
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}