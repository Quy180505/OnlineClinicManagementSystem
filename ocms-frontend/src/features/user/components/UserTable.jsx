const roleLabels = {
  ROLE_ADMIN: "Admin",
  ROLE_DOCTOR: "Bác sĩ",
  ROLE_STAFF: "Staff",
  ROLE_PATIENT: "Bệnh nhân",
};

export default function UserTable({ users, loading }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (!users || users.length === 0) {
    return <div className="alert alert-info">Không tìm thấy tài khoản.</div>;
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Họ tên</th>
              <th>Vai trò</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td>
                  <strong>{user.username}</strong>
                </td>

                <td>{user.fullName}</td>

                <td>{roleLabels[user.role] || user.role || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
