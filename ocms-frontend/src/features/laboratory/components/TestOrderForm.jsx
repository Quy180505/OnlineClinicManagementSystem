import { useState } from "react";
import TestServiceSearch from "./TestServiceSearch";

export default function TestOrderForm({ medicalRecordId,onSubmit, submitting = false,onCancel}) {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelect = (service) => {
    setSelectedServices((previous) => {

      const exists = previous.some((item) => item.id === service.id);

      if (exists) {
        return previous;
      }
      return [...previous, service];
    });
  };


  const handleRemove = (serviceId) => {setSelectedServices((previous) =>previous.filter((service) => service.id !== serviceId));};

  const handleSubmit = (event) => {event.preventDefault();

    if (!selectedServices.length) {
      return;
    }

    onSubmit(selectedServices);
  };

  const totalAmount = selectedServices.reduce((total, service) => total + (service.price || 0),0);

  return (
    <form onSubmit={handleSubmit}>
      <TestServiceSearch
        medicalRecordId={medicalRecordId}
        selectedServices={selectedServices}
        onSelect={handleSelect}
        onRemove={handleRemove}
      />

      {selectedServices.length > 0 && (
        <div className="border-top mt-4 pt-3">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-semibold">Tổng chi phí</span>

            <span className="fw-bold">
              {totalAmount.toLocaleString("vi-VN")} đ
            </span>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
          disabled={submitting}
        >
          Hủy
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting || selectedServices.length === 0}
        >
          {submitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Đang xử lý...
            </>
          ) : (
            "Xác nhận chỉ định"
          )}
        </button>
      </div>
    </form>
  );
}
