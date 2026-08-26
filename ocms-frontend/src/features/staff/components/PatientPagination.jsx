export default function PatientPagination({
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return (
      <div className="d-flex justify-content-end mt-3">
        <small className="text-muted">Tổng số: {totalElements} bệnh nhân</small>
      </div>
    );
  }

  const pages = [];

  for (let page = 0; page < totalPages; page++) {
    pages.push(page);
  }

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <div>
        <small className="text-muted">
          Tổng số :  {""}
          {totalElements} bệnh nhân
        </small>
      </div>

      <nav aria-label="Patient pagination">
        <ul className="pagination mb-0">
          <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              disabled={currentPage === 0}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Trước
            </button>
          </li>

          {pages.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => onPageChange(page)}
              >
                {page + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages - 1 ? "disabled" : ""
            }`}
          >
            <button
              type="button"
              className="page-link"
              disabled={currentPage === totalPages - 1}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Sau
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
