import TestOrderListItem from "./TestOrderListItem";

export default function TestOrderList({ testOrders = [], loading, onSelect }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" />
      </div>
    );
  }

  if (!testOrders.length) {
    return (
      <div className="text-center text-muted py-5">
        Không có phiếu xét nghiệm.
      </div>
    );
  }

  return (
    <div className="list-group">
      {testOrders.map((testOrder) => (
        <TestOrderListItem
          key={testOrder.id}
          testOrder={testOrder}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
