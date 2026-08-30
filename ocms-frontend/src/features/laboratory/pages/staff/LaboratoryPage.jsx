import { useEffect, useState } from "react";
import { laboratoryApi } from "../../api/laboratoryApi";
import TestOrderList from "../../components/staff/TestOrderList";
import TestOrderDetail from "../../components/staff/TestOrderDetail";
import { PAGINATION } from "../../../../constants/paginationConstants";
export default function LaboratoryPage() {
  const [status, setStatus] = useState("PENDING");
  const [testOrders, setTestOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(0);

  const loadTestOrders = async () => {
    setLoading(true);

    try {
      const response = await laboratoryApi.getTestOrders({
        status,
        page,
        size: PAGINATION.LABORATORY_PAGE_SIZE,
      });

      const pageData = response?.data;

      setTestOrders(pageData?.content || []);
      setTotalPages(pageData?.totalPages || 0);
    } catch (err) {
      console.error("Không thể tải danh sách phiếu xét nghiệm:", err);

      setTestOrders([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchTestOrders = async () => {
      setLoading(true);

      try {
        const response = await laboratoryApi.getTestOrders({
          status,
          page,
          size: PAGINATION.LABORATORY_PAGE_SIZE,
        });

        if (cancelled) {
          return;
        }

        const pageData = response?.data;

        setTestOrders(pageData?.content || []);
        setTotalPages(pageData?.totalPages || 0);
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error("Không thể tải danh sách phiếu xét nghiệm:", err);

        setTestOrders([]);
        setTotalPages(0);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTestOrders();

    return () => {
      cancelled = true;
    };
  }, [status, page]);

  const handleStatusChange = (newStatus) => {
    if (newStatus === status) {
      return;
    }

    setStatus(newStatus);
    setPage(0);
    setSelectedOrder(null);
  };

  const handleUpdated = async () => {
    await loadTestOrders();

    if (!selectedOrder) {
      return;
    }

    try {
      const response = await laboratoryApi.getTestOrder(selectedOrder.id);

      setSelectedOrder(response?.data || null);
    } catch (err) {
      console.error("Không thể tải lại phiếu xét nghiệm:", err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h4 className="mb-1">Quản lý xét nghiệm</h4>

        <p className="text-muted mb-0">
          Tiếp nhận phiếu và cập nhật kết quả xét nghiệm.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <div className="btn-group w-100">
                <button
                  type="button"
                  className={`btn ${
                    status === "PENDING" ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => handleStatusChange("PENDING")}
                >
                  Chờ tiếp nhận
                </button>

                <button
                  type="button"
                  className={`btn ${
                    status === "IN_PROGRESS"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => handleStatusChange("IN_PROGRESS")}
                >
                  Đang thực hiện
                </button>

                <button
                  type="button"
                  className={`btn ${
                    status === "COMPLETED"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => handleStatusChange("COMPLETED")}
                >
                  Hoàn thành
                </button>
              </div>
            </div>

            <div className="card-body">
              <TestOrderList
                testOrders={testOrders}
                loading={loading}
                onSelect={setSelectedOrder}
              />

              {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    disabled={page === 0}
                    onClick={() => setPage((currentPage) => currentPage - 1)}
                  >
                    Trước
                  </button>

                  <small className="text-muted">
                    Trang {page + 1} / {totalPages}
                  </small>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((currentPage) => currentPage + 1)}
                  >
                    Sau
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {selectedOrder ? (
                <TestOrderDetail
                  testOrder={selectedOrder}
                  onUpdated={handleUpdated}
                />
              ) : (
                <div className="text-center text-muted py-5">
                  <h6>Chọn một phiếu xét nghiệm</h6>

                  <small>Chọn phiếu bên trái để xem chi tiết và xử lý.</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
