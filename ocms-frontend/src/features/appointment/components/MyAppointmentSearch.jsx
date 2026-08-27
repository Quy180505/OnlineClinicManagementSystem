export default function MyAppointmentSearch({ appointmentStatuses = [],appointmentStatusId,fromDate,toDate,onSearch,statusLoading = false,
}) {
  const handleSearch = (overrides = {}) => {
    onSearch({appointmentStatusId,fromDate,toDate, ...overrides,});};

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-header bg-white border-0 py-3">
        <h5 className="mb-1">Tìm kiếm lịch khám</h5>

        <small className="text-muted">
          Lọc lịch khám của bạn theo các điều kiện.
        </small>
      </div>

      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6 col-lg-4">
            <label htmlFor="myAppointmentStatus" className="form-label">
              Trạng thái
            </label>

            <select
              id="myAppointmentStatus"
              className="form-select"
              value={appointmentStatusId}
              onChange={(event) =>
                handleSearch({appointmentStatusId: event.target.value, })
              }
              disabled={statusLoading}
            >
              <option value="">Tất cả trạng thái</option>

              {appointmentStatuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 col-lg-4">
            <label htmlFor="myAppointmentFromDate" className="form-label">
              Từ ngày
            </label>

            <input
              id="myAppointmentFromDate"
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(event) =>
                handleSearch({
                  fromDate: event.target.value,
                })
              }
            />
          </div>

          <div className="col-md-6 col-lg-4">
            <label htmlFor="myAppointmentToDate" className="form-label">
              Đến ngày
            </label>

            <input
              id="myAppointmentToDate"
              type="date"
              className="form-control"
              value={toDate}
              onChange={(event) =>
                handleSearch({
                  toDate: event.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
