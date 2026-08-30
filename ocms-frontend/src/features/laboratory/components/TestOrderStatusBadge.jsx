export default function TestOrderStatusBadge({ status }) {
  const statusConfig = {
    PENDING: {
      label: "Chờ tiếp nhận",
      className: "text-bg-warning",
    },

    IN_PROGRESS: {
      label: "Đang thực hiện",
      className: "text-bg-primary",
    },

    COMPLETED: {
      label: "Đã hoàn thành",
      className: "text-bg-success",
    },
  };

  const config =
    statusConfig[status] || {
      label: status || "Không xác định",
      className: "text-bg-secondary",
    };

  return (
    <span className={`badge ${config.className}`}>
      {config.label}
    </span>
  );
}