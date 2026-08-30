  import { useEffect, useState } from "react";
  import TestOrderForm from "../TestOrderForm";
  import TestOrderCard from "../TestOrderCard";
  import LabResultItem from "../LabResultItem";
  import useDoctorLaboratory from "../../hooks/useDoctorLaboratory";

  export default function DoctorLaboratoryPanel({ medicalRecordId }) {

    const [showForm, setShowForm] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const [showResultModal, setShowResultModal] = useState(false);

    const {
      testOrders,testOrderLoading,creating,labResult,labResultLoading,createError,testOrderError,
      loadLaboratory,createTestOrder,selectTestDetail,clearCreateError,clearErrors,
    } = useDoctorLaboratory();

    useEffect(() => {
      if (medicalRecordId) {
        loadLaboratory(medicalRecordId);
      }
    }, [medicalRecordId, loadLaboratory]);

    const handleCreate = async (selectedServices) => {
      const serviceIds = selectedServices.map((service) => service.id);

      const createdTestOrder = await createTestOrder(medicalRecordId,serviceIds);

      if (createdTestOrder) {
        setShowForm(false);
        await loadLaboratory(medicalRecordId);
      }
    };

    const handleViewResult = async (detail) => {
      if (!detail?.id) {
        return;
      }

      setSelectedResult(detail);
      setShowResultModal(true);
      await selectTestDetail(detail.id);
    };

    const handleCloseResultModal = () => {
      setShowResultModal(false);
      setSelectedResult(null);
    };

    return (
      <>
        <div className="card border-0 shadow-sm h-100">
          <div className="card-header bg-white border-0 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">Xét nghiệm</h5>

                <small className="text-muted">
                  Chỉ định và theo dõi kết quả xét nghiệm
                </small>
              </div>

              {!showForm && (
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    clearCreateError();
                    setShowForm(true);
                  }}
                >
                  Chỉ định xét nghiệm
                </button>
              )}
            </div>
          </div>

          <div className="card-body">
            {testOrderError && (
              <div className="alert alert-danger alert-dismissible fade show">
                {testOrderError}

                <button
                  type="button"
                  className="btn-close"
                  onClick={clearErrors}
                />
              </div>
            )}

            {createError && (
              <div className="alert alert-danger alert-dismissible fade show">
                {createError}

                <button
                  type="button"
                  className="btn-close"
                  onClick={clearCreateError}
                />
              </div>
            )}

            {showForm ? (
              <TestOrderForm
                medicalRecordId={medicalRecordId}
                onSubmit={handleCreate}
                submitting={creating}
                onCancel={() => {
                  clearCreateError();
                  setShowForm(false);
                }}
              />
            ) : testOrderLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" />

                <div className="text-muted mt-2">
                  Đang tải phiếu xét nghiệm...
                </div>
              </div>
            ) : testOrders.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {testOrders.map((testOrder) => (
                  <TestOrderCard
                    key={testOrder.id}
                    testOrder={testOrder}
            
                    onViewResult={handleViewResult}
                  
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="mb-3">
                  <span
                    className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle"
                    style={{
                      width: "64px",
                      height: "64px",
                    }}
                  >
                    <span className="fs-3 text-muted">+</span>
                  </span>
                </div>

                <h6 className="mb-2">
                  Chưa có chỉ định xét nghiệm
                </h6>

                <p className="text-muted mb-3">
                  Bác sĩ có thể chỉ định một hoặc nhiều xét nghiệm
                  cho bệnh nhân.
                </p>

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    clearCreateError();
                    setShowForm(true);
                  }}
                >
                  Chỉ định xét nghiệm
                </button>
              </div>
            )}
          </div>
        </div>
        {showResultModal && (
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
                    <h5 className="modal-title mb-1">
                      Kết quả xét nghiệm
                    </h5>

                    {selectedResult && (
                      <small className="text-muted">
                        {selectedResult.serviceName}
                      </small>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseResultModal}
                    aria-label="Close"
                  />
                </div>

                <div className="modal-body">
                  {labResultLoading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" />

                      <div className="text-muted mt-2">
                        Đang tải kết quả...
                      </div>
                    </div>
                  ) : labResult ? (
                    <LabResultItem result={labResult} />
                  ) : (
                    <div className="alert alert-warning mb-0">
                      Không tìm thấy kết quả xét nghiệm.
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseResultModal}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showResultModal && (
          <div className="modal-backdrop fade show" />
        )}
      </>
    );
  }