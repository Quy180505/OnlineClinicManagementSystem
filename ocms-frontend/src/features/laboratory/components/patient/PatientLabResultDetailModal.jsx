import { useEffect } from "react";

import usePatientLabResult from "../../hooks/usePatientLabResult";

const formatDateTime = (dateTime) => {
  if (!dateTime) {
    return "-";
  }

  return new Date(dateTime).toLocaleString("vi-VN");
};

export default function PatientLabResultDetailModal({show,labResultId,onClose,}) {
  const {
    labResultDetail,detailLoading, detailError,loadLabResultDetail,clearDetailError,
  } = usePatientLabResult();

  useEffect(() => {
    if (show && labResultId) {
      loadLabResultDetail(labResultId);
    }
  }, [show, labResultId, loadLabResultDetail]);

  if (!show) {
    return null;
  }

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{ zIndex: 1060 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title">
                Chi tiết kết quả xét nghiệm
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Đóng"
              />
            </div>

            <div className="modal-body">
              {detailError && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {detailError}

                  <button
                    type="button"
                    className="btn-close"
                    onClick={clearDetailError}
                  />
                </div>
              )}

              {detailLoading ? (
                <div className="text-center py-5">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  >
                    <span className="visually-hidden">
                      Đang tải...
                    </span>
                  </div>

                  <div className="text-muted mt-2">
                    Đang tải chi tiết kết quả...
                  </div>
                </div>
              ) : labResultDetail ? (
                <div className="d-flex flex-column gap-3">
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <small className="text-muted d-block">
                            Tên xét nghiệm
                          </small>

                          <span className="fw-semibold">
                            {labResultDetail.serviceName || "-"}
                          </span>
                        </div>

                        <div className="col-md-6">
                          <small className="text-muted d-block">
                            Thời gian có kết quả
                          </small>

                          <span className="fw-semibold">
                            {formatDateTime(
                              labResultDetail.resultDate,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-0 py-3">
                      <h6 className="mb-0">
                        Nội dung kết quả
                      </h6>
                    </div>

                    <div className="card-body">
                      <div
                        className="p-3 bg-light rounded"
                        style={{
                          whiteSpace: "pre-wrap",
                          minHeight: "120px",
                        }}
                      >
                        {labResultDetail.resultContent || "-"}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  Không có dữ liệu kết quả xét nghiệm.
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

      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1055 }}
      />
    </>
  );
}