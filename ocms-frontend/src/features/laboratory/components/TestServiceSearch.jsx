import { useEffect, useRef, useState } from "react";
import { laboratoryApi } from "../api/laboratoryApi";
import { PAGINATION } from "../../../constants/paginationConstants";

export default function TestServiceSearch({ medicalRecordId,selectedServices,onSelect,onRemove,}) {
  const [keyword, setKeyword] = useState("");
  const [services, setServices] = useState([]);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);

  const searchDebounceRef = useRef(null);

  const pageSize = PAGINATION.MEDICAL_SERVICE_SEARCH_SIZE;

  const searchServices = (searchKeyword, searchPage = 0) => {
    const trimmedKeyword = searchKeyword.trim();

    if (
      trimmedKeyword.length > 0 &&
      trimmedKeyword.length < PAGINATION.DOCTOR_SEARCH_MIN_LENGTH
    ) {
      setServices([]);
      setTotalPages(0);
      setLoading(false);
      return;
    }

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(async () => {
      setLoading(true);

      try {
        const response = await laboratoryApi.getAvailableTestServices(
          medicalRecordId,
          {
            keyword: trimmedKeyword || undefined,
            page: searchPage,
            size: pageSize,
          },
        );

        const pageData = response?.data;

        setServices(pageData?.content || []);
        setTotalPages(pageData?.totalPages || 0);
        setPage(searchPage);
      } catch (err) {
        console.error("Không thể tìm dịch vụ xét nghiệm:", err);

        setServices([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const handleKeywordChange = (event) => {
    const value = event.target.value;

    setKeyword(value);
    setPage(0);

    searchServices(value, 0);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 0 || newPage >= totalPages) {
      return;
    }

    searchServices(keyword, newPage);
  };

  const isSelected = (serviceId) =>
    selectedServices.some((service) => service.id === serviceId);

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, []);


    const handleSelectService = (service) => {
        onSelect(service);
        if (searchDebounceRef.current) {
          clearTimeout(searchDebounceRef.current);
        }
        setServices([]);
        setKeyword("");

        setPage(0);
        setTotalPages(0);
  };

  return (
    <div>
      <label className="form-label fw-semibold">Tìm dịch vụ xét nghiệm</label>

      <input
        type="text"
        className="form-control"
        placeholder="Nhập tên xét nghiệm..."
        value={keyword}
        onChange={handleKeywordChange}
      />

      {loading && <div className="text-muted small mt-2">Đang tìm kiếm...</div>}

      {!loading &&
        keyword.trim().length >= PAGINATION.DOCTOR_SEARCH_MIN_LENGTH &&
        services.length === 0 && (
          <div className="text-muted small mt-2">
            Không tìm thấy dịch vụ xét nghiệm.
          </div>
        )}

      {services.length > 0 && (
        <>
          <div className="list-group mt-2">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                className={`list-group-item list-group-item-action ${
                  isSelected(service.id) ? "active" : ""
                }`}
              onClick={() => handleSelectService(service)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">{service.serviceName}</span>

                  <span>{service.price?.toLocaleString("vi-VN")} đ</span>
                </div>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                disabled={page === 0 || loading}
                onClick={() => handlePageChange(page - 1)}
              >
                Trước
              </button>

              <span className="small text-muted">
                Trang {page + 1} / {totalPages}
              </span>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                disabled={page >= totalPages - 1 || loading}
                onClick={() => handlePageChange(page + 1)}
              >
                Sau
              </button>
            </div>
          )}
        </>
      )}

      {selectedServices.length > 0 && (
        <div className="mt-4">
          <h6 className="mb-3">Xét nghiệm đã chọn</h6>

          <div className="list-group">
            {selectedServices.map((service) => (
              <div
                key={service.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <div className="fw-semibold">{service.serviceName}</div>

                  <small className="text-muted">
                    {service.price?.toLocaleString("vi-VN")} đ
                  </small>
                </div>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onRemove(service.id)}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
