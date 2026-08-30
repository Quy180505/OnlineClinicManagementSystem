import { useEffect, useState } from "react";
import TestOrderForm from "../../laboratory/components/TestOrderForm";
import TestOrderCard from "../../laboratory/components/TestOrderCard";
import useTestOrder from "../../laboratory/hooks/useTestOrder";

export default function PatientLaboratoryPanel({ medicalRecordId }) {
  const [showForm, setShowForm] = useState(false);

  const {
    testOrders,
    loading,
    creating,
    error,
    createError,
    loadTestOrders,
    createTestOrder,
    clearError,
    clearCreateError,
  } = useTestOrder();

  useEffect(() => {
    loadTestOrders(medicalRecordId);
  }, [medicalRecordId, loadTestOrders]);

  const handleCreateTestOrder = async (selectedServices) => {
    const serviceIds = selectedServices.map((service) => service.id);

    const success = await createTestOrder(medicalRecordId, serviceIds);

    if (success) {
      setShowForm(false);
      await loadTestOrders(medicalRecordId);
    }
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white border-0 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">Xét nghiệm</h5>

            <small className="text-muted">
              Xét nghiệm của bệnh nhân trong lần khám hiện tại
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
        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            {error}

            <button type="button" className="btn-close" onClick={clearError} />
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
            onSubmit={handleCreateTestOrder}
            submitting={creating}
            onCancel={() => setShowForm(false)}
          />
        ) : loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" />
          </div>
        ) : testOrders.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {testOrders.map((testOrder) => (
              <TestOrderCard key={testOrder.id} testOrder={testOrder}  source="PATIENT" />
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

            <h6 className="mb-2">Chưa có chỉ định xét nghiệm</h6>

            <p className="text-muted mb-3">
              Bác sĩ có thể chỉ định một hoặc nhiều xét nghiệm cho bệnh nhân.
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
  );
}
