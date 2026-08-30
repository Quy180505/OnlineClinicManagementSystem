import { useState } from "react";
import TestOrderStatusBadge from "./TestOrderStatusBadge";

export default function TestOrderCard({testOrder, onEditResult,onViewResult,}) {
  const [expanded, setExpanded] = useState(true);

  if (!testOrder) {
    return null;
  }

  const details = testOrder.details ?? [];

  const completedCount = details.filter((detail) => detail.resultAvailable,).length;

  return (
    <div className="card border shadow-sm rounded-3">
      <div className="card-body pb-2">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <div>
                <div className="fw-semibold">
                  Phiếu xét nghiệm #{testOrder.id}
                </div>

                <small className="text-muted">
                  Chỉ định lúc{" "}
                  {testOrder.orderDate? new Date(testOrder.orderDate).toLocaleString("vi-VN"): "-"}
                </small>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <TestOrderStatusBadge status={testOrder.status} />

       <button
            type="button"
            className="btn btn-sm text-primary border-0 p-1"
            onClick={() => setExpanded((current) => !current)}
            title={expanded ? "Thu gọn phiếu" : "Mở rộng phiếu"}
            aria-label={expanded ? "Thu gọn phiếu" : "Mở rộng phiếu"}
          >
            <i
              className={`bi ${
                expanded ? "bi-chevron-up" : "bi-chevron-down"
              } text-primary`}
              style={{ fontSize: "1rem" }}
            />
          </button>
          </div>
        </div>
      </div>
      {expanded && (
        <>
          {details.length > 0 && (
            <div className="px-3 pb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <small className="text-muted">
                  Tiến độ xét nghiệm
                </small>

                <small className="fw-semibold">
                  {completedCount}/{details.length}
                </small>
              </div>

              <div
                className="progress"
                style={{ height: "6px" }}
                role="progressbar"
              >
                <div
                  className="progress-bar"
                  style={{
                    width: `${(completedCount / details.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="border-top">
            {details.map((detail, index) => (
              <div
                key={detail.id}
                className={`px-3 py-3 ${
                  index !== details.length - 1 ? "border-bottom" : ""
                }`}
              >
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className={`d-flex align-items-center justify-content-center rounded-circle ${
                        detail.resultAvailable
                          ? "bg-success-subtle text-success"
                          : "bg-warning-subtle text-warning"
                      }`}
                      style={{
                        width: "40px",
                        height: "40px",
                        flexShrink: 0,
                      }}
                    >
                      <i className={detail.resultAvailable? "bi bi-check-lg": "bi bi-hourglass-split"}/>
                    </div>

                    <div>
                      <div className="fw-semibold">
                        {index + 1}. {detail.serviceName}
                      </div>

                      <small className="text-muted">
                        {detail.resultAvailable
                          ? "Đã có kết quả xét nghiệm"
                          : "Chưa có kết quả"}
                      </small>
                    </div>
                  </div>

                  <div>
                    {!detail.resultAvailable &&
                      testOrder.status === "IN_PROGRESS" &&
                      onEditResult && (
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => onEditResult(detail)}
                        >
                          <i className="bi bi-pencil-square me-1" />
                          Nhập kết quả
                        </button>
                      )}

                    {detail.resultAvailable && onViewResult && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onViewResult(detail)}
                      >
                        <i className="bi bi-file-earmark-medical me-1" />
                        Xem kết quả
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card-footer bg-light border-0">
            <div className="d-flex align-items-center gap-2 text-muted">
              <i className="bi bi-info-circle" />

              <small>
                {completedCount === details.length &&
                details.length > 0
                  ? "Tất cả xét nghiệm đã có kết quả."
                  : `Đã có ${completedCount}/${details.length} xét nghiệm có kết quả.`}
              </small>
            </div>
          </div>
        </>
      )}

      {!expanded && (
        <div className="card-footer bg-light border-0 py-2">
          <small className="text-muted">
            <i className="bi bi-info-circle me-1" />
            {completedCount}/{details.length} xét nghiệm đã có kết quả
          </small>
        </div>
      )}
    </div>
  );
}