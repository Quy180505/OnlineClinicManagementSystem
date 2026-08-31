import InventoryTransactionTable from "../transaction/InventoryTransactionTable";

export default function InventoryDetailModal({
  inventory,loading, transactions,transactionLoading,transactionPage,
  transactionTotalPages,transactionTotalElements,onTransactionPageChange,onClose,
}) {
  if (loading) {
    return (
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center py-5">
              <div
                className="spinner-border"
                role="status"
              />

              <div className="text-muted mt-2">
                Đang tải thông tin...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!inventory) {
    return null;
  }

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-box-seam me-2" />
              Chi tiết tồn kho
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            />
          </div>

          <div className="modal-body">
            <div className="card border-0 bg-light mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <small className="text-muted">
                      Thuốc
                    </small>

                    <div className="fw-semibold">
                      {inventory.medicineName}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <small className="text-muted">
                      Số lượng tồn
                    </small>

                    <div className="fw-semibold">
                      {inventory.quantityInStock}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <small className="text-muted">
                      Ngày nhập
                    </small>

                    <div>
                      {inventory.importDate}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <small className="text-muted">
                      Hạn sử dụng
                    </small>

                    <div>
                      {inventory.expireDate}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <small className="text-muted">
                      Trạng thái
                    </small>

                    <div>
                      {inventory.inventoryStatusName}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <small className="text-muted">
                      Cập nhật lần cuối
                    </small>

                    <div>
                      {inventory.lastUpdated || "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">
                Lịch sử giao dịch
              </h6>

              <small className="text-muted">
                Tổng số: {transactionTotalElements}
              </small>
            </div>

            <InventoryTransactionTable
              transactions={transactions}
              loading={transactionLoading}
            />

            {transactionTotalPages > 1 && (
              <div className="d-flex justify-content-center mt-3">
                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li
                      className={`page-item ${
                        transactionPage === 0
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="page-link"
                        disabled={transactionPage === 0}
                        onClick={() =>onTransactionPageChange(transactionPage - 1)}
                      >
                        <i className="bi bi-chevron-left" />
                      </button>
                    </li>

                    {Array.from(
                      {
                        length: transactionTotalPages,
                      },
                      (_, index) => (
                        <li
                          key={index}
                          className={`page-item ${transactionPage === index? "active": ""}`}
                        >
                          <button
                            type="button"
                            className="page-link"
                            onClick={() =>
                              onTransactionPageChange(
                                index,
                              )
                            }
                          >
                            {index + 1}
                          </button>
                        </li>
                      ),
                    )}

                    <li
                      className={`page-item ${transactionPage ===transactionTotalPages - 1? "disabled": "" }`}
                    >
                      <button
                        type="button"
                        className="page-link"
                        disabled={
                          transactionPage ===
                          transactionTotalPages - 1
                        }
                        onClick={() => onTransactionPageChange(transactionPage + 1)}
                      >
                        <i className="bi bi-chevron-right" />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}