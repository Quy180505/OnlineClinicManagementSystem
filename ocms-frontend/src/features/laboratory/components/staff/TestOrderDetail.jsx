import { useState } from "react";
import useTestOrder from "../../hooks/useTestOrder";
import useLabResult from "../../hooks/useLabResult";
import TestOrderStatusBadge from "../TestOrderStatusBadge";
import TestOrderCard from "../TestOrderCard";
import LabResultItem from "../LabResultItem";
import LabResultForm from "./LabResultForm";

export default function TestOrderDetail({testOrder,onUpdated}) {

  const {startTestOrder,starting,startError,clearStartError} = useTestOrder();

  const {labResult,loading: resultLoading,loadLabResult} = useLabResult();

  const [selectedDetail, setSelectedDetail] = useState(null);
  const [mode, setMode] = useState(null);

  const handleStart = async () => {
    if (!testOrder?.id || starting) {
      return;
    }

    clearStartError();

    const updatedTestOrder =
      await startTestOrder(testOrder.id);

    if (updatedTestOrder && onUpdated) {
      await onUpdated(updatedTestOrder);
    }
  };

  const handleEditResult = (detail) => {
    if (!detail?.id) {
      return;
    }

    setSelectedDetail(detail);
    setMode("edit");
  };

  const handleViewResult = async (detail) => {
    if (!detail?.id || !detail.resultAvailable) {
      return;
    }

    setSelectedDetail(detail);
    setMode("view");

    await loadLabResult(detail.id);
  };

  const handleResultSaved = async () => {
    setMode(null);
    setSelectedDetail(null);

    if (onUpdated) {
      await onUpdated();
    }
  };

  const handleCancelResult = () => {
    setMode(null);
    setSelectedDetail(null);
  };

  if (!testOrder) {
    return (
      <div className="text-center text-muted py-5">
        <h6>Chọn một phiếu xét nghiệm</h6>

        <small>
          Chọn phiếu bên trái để xem chi tiết và xử lý.
        </small>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h5 className="mb-1">
            Phiếu xét nghiệm #{testOrder.id}
          </h5>

          <small className="text-muted">
            {testOrder.orderDate ? new Date(testOrder.orderDate).toLocaleString("vi-VN") : "-"}
          </small>
        </div>

        <TestOrderStatusBadge
          status={testOrder.status}
        />
      </div>

      {startError && (
        <div className="alert alert-danger">
          {startError}
        </div>
      )}

      <TestOrderCard
        testOrder={testOrder}
        onEditResult={handleEditResult}
        onViewResult={handleViewResult}
      />

      {testOrder.status === "PENDING" && (
        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleStart}
            disabled={starting}
          >
            {starting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Đang tiếp nhận...
              </>
            ) : (
              "Tiếp nhận phiếu"
            )}
          </button>
        </div>
      )}

      {mode === "edit" && selectedDetail && (
        <div className="mt-4 pt-4 border-top">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1">
                Nhập kết quả xét nghiệm
              </h6>

              <small className="text-muted">
                {selectedDetail.serviceName}
              </small>
            </div>
          </div>

          <LabResultForm
            testOrderDetail={selectedDetail}
            onSaved={handleResultSaved}
            onCancel={handleCancelResult}
          />
        </div>
      )}
      
      {mode === "view" && selectedDetail && (
        <div className="mt-4 pt-4 border-top">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1">
                Kết quả xét nghiệm
              </h6>

              <small className="text-muted">
                {selectedDetail.serviceName}
              </small>
            </div>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                setMode(null);
                setSelectedDetail(null);
              }}
            >
              Đóng
            </button>
          </div>

          {resultLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border spinner-border-sm" />

              <div className="small text-muted mt-2">
                Đang tải kết quả...
              </div>
            </div>
          ) : labResult ? (
            <LabResultItem result={labResult} />
          ) : (
            <div className="alert alert-warning">
              Không tìm thấy kết quả xét nghiệm.
            </div>
          )}
        </div>
      )}
    </div>
  );
}