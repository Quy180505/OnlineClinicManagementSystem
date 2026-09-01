  
export default function PrescriptionMedicineList({ details = []}) {

  if (details.length === 0) {
    return (
      <div className="text-muted text-center py-3 small">
        Không có thuốc trong đơn.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-sm align-middle mb-0 small">
        <thead className="table-light">
          <tr>
            <th>Thuốc</th>
            <th className="text-center">
              Số lượng
            </th>
            <th>Liều dùng</th>
            <th>Hướng dẫn</th>
            <th className="text-end">
              Thành tiền
            </th>
          </tr>
        </thead>

        <tbody>
          {details.map((detail) => (
            <tr key={detail.id}>
              <td className="fw-semibold">
                {detail.medicineName}
              </td>

              <td className="text-center">
                {detail.quantity}
              </td>

              <td>
                {detail.dosage || "-"}
              </td>

              <td className="text-break">
                {detail.usageInstruction || "-"}
              </td>

              <td className="text-end text-nowrap">
                {detail.totalPrice != null ? Number(detail.totalPrice).toLocaleString("vi-VN") : "0"}{" "} ₫
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}