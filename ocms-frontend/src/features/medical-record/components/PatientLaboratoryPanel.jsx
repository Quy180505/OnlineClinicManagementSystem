
export default function PatientLaboratoryPanel() {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white border-0 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">Xét nghiệm</h5>
            <small className="text-muted">
              Xét nghiệm của bệnh nhân trong lần khám hiện tại
            </small>
          </div>

          <button type="button" className="btn btn-sm btn-primary">
            Chỉ định xét nghiệm
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="text-center py-5">
          <div className="mb-3">
            <span
              className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle"
              style={{ width: "64px", height: "64px" }}
            >
              <span className="fs-3 text-muted">+</span>
            </span>
          </div>

          <h6 className="mb-2">Chưa có chỉ định xét nghiệm</h6>

          <p className="text-muted mb-3">
            Bác sĩ có thể chỉ định một hoặc nhiều xét nghiệm cho bệnh nhân.
          </p>

          <button type="button" className="btn btn-outline-primary">
            Chỉ định xét nghiệm
          </button>
        </div>
      </div>
    </div>
  );
}

