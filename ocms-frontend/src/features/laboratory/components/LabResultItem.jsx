export default function LabResultItem({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div>
      <div className="mb-4">
        <label className="form-label text-muted small mb-1">
          Nội dung kết quả
        </label>

        <div
          className="border rounded-3 p-3 bg-light"
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: "1.7",
          }}
        >
          {result.resultContent || "-"}
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label text-muted small mb-1">
            Dịch vụ
          </label>

          <div className="fw-semibold">
            {result.serviceName || "-"}
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label text-muted small mb-1">
            Ngày thực hiện
          </label>

          <div className="fw-semibold">
            {result.resultDate? new Date(result.resultDate).toLocaleString("vi-VN") : "-"}
          </div>
        </div>
      </div>
    </div>
  );
}