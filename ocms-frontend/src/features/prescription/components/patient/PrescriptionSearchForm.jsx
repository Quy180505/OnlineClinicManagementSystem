export default function PrescriptionSearchForm({fromDate,toDate,loading,onChange,onSearch,onReset}) {

  return (
    <form onSubmit={onSearch}>
      <div className="row g-3">
      
        <div className="col-md-4">
          <label className="form-label">
            Từ ngày
          </label>

          <input
            type="date"
            name="fromDate"
            className="form-control"
            value={fromDate}
            onChange={onChange}
            disabled={loading}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">
            Đến ngày
          </label>

          <input
            type="date"
            name="toDate"
            className="form-control"
            value={toDate}
            onChange={onChange}
            disabled={loading}
          />
        </div>

        <div className="col-md-4 d-flex align-items-end gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onReset}
            disabled={loading}
          >
            <i className="bi bi-arrow-counterclockwise" />
          </button>

          <button
            type="submit"
            className="btn btn-primary flex-grow-1"
            disabled={loading}
          >
            <i className="bi bi-search me-1" />
            Tìm
          </button>
        </div>
      </div>
    </form>
  );
}