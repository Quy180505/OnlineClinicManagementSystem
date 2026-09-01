export default function PrescriptionDetailForm({detail,index, onChange,onRemove}) {
  return (
    <div className="border rounded p-2 mb-2 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="text-truncate pe-2">
          <span className="fw-semibold">
            {index + 1}. {detail.medicineName}
          </span>

          <small className="text-muted ms-2">
            {detail.unitPrice != null ? Number(detail.unitPrice).toLocaleString("vi-VN"): "0"}{" "} ₫
          </small>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-danger flex-shrink-0"
          onClick={() => onRemove(index)}
          title="Xóa thuốc"
        >
          <i className="bi bi-trash" />
        </button>
      </div>

      <div className="row g-2">
        <div className="col-md-3">
          <label className="form-label small mb-1">
            Số lượng
          </label>

          <input
            type="number"
            min="1"
            className="form-control form-control-sm"
            value={detail.quantity}
            onChange={(event) =>
              onChange(index, {
                quantity: Number(event.target.value),
              })
            }
          />
        </div>

        <div className="col-md-9">
          <label className="form-label small mb-1">
            Liều dùng
          </label>

          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Ví dụ: 1 viên/lần"
            value={detail.dosage}
            onChange={(event) =>
              onChange(index, {
                dosage: event.target.value,
              })
            }
            maxLength={255}
          />
        </div>

        <div className="col-12">
          <label className="form-label small mb-1">
            Hướng dẫn sử dụng
          </label>

          <textarea
            className="form-control form-control-sm"
            rows="1"
            placeholder="Ví dụ: Uống sau ăn sáng và tối."
            value={detail.usageInstruction}
            onChange={(event) =>
              onChange(index, {
                usageInstruction: event.target.value,
              })
            }
            maxLength={2000}
          />
        </div>
      </div>
    </div>
  );
}