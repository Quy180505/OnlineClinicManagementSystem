export default function AppointmentSearch({
  fromDate = "",
  toDate = "",
  onFromDateChange,
  onToDateChange,
}) {
  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-header bg-white border-0 py-3">
        <h5 className="mb-1">Tìm kiếm lịch khám</h5>

        <small className="text-muted">
          Lọc danh sách lịch khám theo khoảng thời gian.
        </small>
      </div>

      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="appointmentFromDate" className="form-label">
              Từ ngày
            </label>

            <input
              id="appointmentFromDate"
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(event) => onFromDateChange(event.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="appointmentToDate" className="form-label">
              Đến ngày
            </label>

            <input
              id="appointmentToDate"
              type="date"
              className="form-control"
              value={toDate}
              onChange={(event) => onToDateChange(event.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}