export default function InvoiceDetail({ invoice }) {

  if (!invoice) {
    return null;
  }

  const getItemTypeLabel = (itemType) => {
    switch (itemType) {
      case "SERVICE":
        return "Dịch vụ";

      case "TEST":
        return "Xét nghiệm";

      case "MEDICINE":
        return "Thuốc";

      default:
        return itemType;
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-white">
        <h2 className="mb-0 text-center">
          Chi tiết hóa đơn
        </h2>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Loại</th>
                <th>Nội dung</th>
                <th className="text-center">Số lượng</th>
                <th className="text-end">Đơn giá</th>
                <th className="text-end">Thành tiền</th>
              </tr>
            </thead>

            <tbody>
              {invoice.details?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="badge text-bg-secondary">
                      {getItemTypeLabel(item.itemType)}
                    </span>
                  </td>

                  <td>{item.description}</td>

                  <td className="text-center">
                    {item.quantity}
                  </td>

                  <td className="text-end">
                    {Number(item.unitPrice).toLocaleString("vi-VN")} ₫
                  </td>

                  <td className="text-end fw-semibold">
                    {Number(item.amount).toLocaleString("vi-VN")} ₫
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th
                  colSpan="4"
                  className="text-end"
                >
                  Tổng cộng
                </th>

                <th className="text-end fs-5">
                  {Number(invoice.totalAmount).toLocaleString("vi-VN")} ₫
                </th>
              </tr>
          </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}