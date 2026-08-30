import { useEffect, useState } from "react";

import usePatientLabResult from "../../hooks/usePatientLabResult";
import PatientLabResultDetailModal from "./PatientLabResultDetailModal";

const formatDateTime = (dateTime) => {
  if (!dateTime) {
    return "-";
  }

  return new Date(dateTime).toLocaleString("vi-VN");
};

export default function PatientLabResultModal({ show,onClose,medicalRecordId,medicalRecord}) {

  const { labResults,loading,error,loadLabResultsByMedicalRecord,clearError} = usePatientLabResult();

  const [selectedLabResultId, setSelectedLabResultId] =
    useState(null);

  useEffect(() => {
    if (show && medicalRecordId) {
      loadLabResultsByMedicalRecord(medicalRecordId);
    }
  }, [show,medicalRecordId,loadLabResultsByMedicalRecord]);

  const handleClose = () => {
    setSelectedLabResultId(null);
    clearError();
    onClose();
  };

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
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <div>
                <h5 className="modal-title">
                  Kết quả xét nghiệm
                </h5>

                <small className="text-muted">
                  {medicalRecord?.examinationDate
                    ? `Lần khám ngày ${formatDateTime(
                        medicalRecord.examinationDate,
                      )}`
                    : "Kết quả xét nghiệm của lần khám"}
                </small>
              </div>

              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Đóng"
              />
            </div>

            <div className="modal-body">
              {error && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {error}

                  <button
                    type="button"
                    className="btn-close"
                    onClick={clearError}
                  />
                </div>
              )}

              {loading ? (
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
                    Đang tải kết quả xét nghiệm...
                  </div>
                </div>
              ) : !labResults.length ? (
                <div className="text-center py-5 text-muted">
                  Chưa có kết quả xét nghiệm cho lần khám này.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Xét nghiệm</th>
                        <th>Thời gian có kết quả</th>
                        <th className="text-end">
                          Thao tác
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {labResults.map((result) => (
                        <tr key={result.labResultId}>
                          <td>
                            <span className="fw-semibold">
                              {result.serviceName || "-"}
                            </span>
                          </td>

                          <td>
                            {formatDateTime(result.resultDate)}
                          </td>

                          <td className="text-end">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                setSelectedLabResultId(
                                  result.labResultId,
                                )
                              }
                            >
                              <i className="bi bi-eye me-1" />
                              Xem chi tiết
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" />

      <PatientLabResultDetailModal
        show={!!selectedLabResultId}
        labResultId={selectedLabResultId}
        onClose={() => setSelectedLabResultId(null)}
      />
    </>
  );
}