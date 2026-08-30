export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav>
      <ul className="pagination justify-content-center mb-0">
        <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
          >
            <i className="bi bi-chevron-left" />
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${page === index ? "active" : ""}`}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(index)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages - 1}
          >
            <i className="bi bi-chevron-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
