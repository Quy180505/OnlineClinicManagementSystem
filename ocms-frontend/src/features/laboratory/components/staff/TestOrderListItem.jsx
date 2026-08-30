import TestOrderStatusBadge from "../TestOrderStatusBadge";

export default function TestOrderListItem({ testOrder, onSelect }) {
  return (
    <button
      type="button"
      className="list-group-item list-group-item-action"
      onClick={() => onSelect(testOrder)}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="fw-semibold">Phiếu xét nghiệm #{testOrder.id}</div>

          <small className="text-muted">
            Ngày chỉ định:{" "}
            {testOrder.orderDate? new Date(testOrder.orderDate).toLocaleString("vi-VN"): "-"}
          </small>
        </div>

        <TestOrderStatusBadge status={testOrder.status} />
      </div>
    </button>
  );
}
