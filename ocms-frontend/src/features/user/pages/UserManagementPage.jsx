import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi";
import UserSearchForm from "../components/UserSearchForm";
import UserTable from "../components/UserTable";
import { ROUTES } from "../../../constants/routeConstants";
import { PAGINATION } from "../../../constants/paginationConstants";
const DEFAULT_SEARCH_PARAMS = {
  keyword: null,
  roleName: null,
  status: null,
  page: PAGINATION.DEFAULT_PAGE,
};

export default function UserManagementPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    totalPages: 0,
    totalElements: 0,
  });

  const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMS);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = async (params) => {
    try {
      setLoading(true);
      setError("");

      const response = await userApi.search(params);

      if (!response.success) {
        throw new Error(
          response.message || "Không thể lấy danh sách tài khoản.",
        );
      }

      const data = response.data;

      setUsers(data?.content || []);

      setPageInfo({
        page: data?.number ?? 0,
        totalPages: data?.totalPages ?? 0,
        totalElements: data?.totalElements ?? 0,
      });
    } catch (error) {
      setError(error?.response?.data?.message ||error?.message ||"Không thể tải danh sách tài khoản.", );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUsers(DEFAULT_SEARCH_PARAMS);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (params) => {
    const searchParams = {
      ...params,
      page: PAGINATION.DEFAULT_PAGE,
    };

    setSearchParams(searchParams);
    loadUsers(searchParams);
  };

  const handlePageChange = (page) => {
    const params = {
      ...searchParams,
      page,
    };

    setSearchParams(params);
    loadUsers(params);
  };

  const handleCreateDoctor = () => {
     navigate(ROUTES.ADMIN.USERS.CREATE_DOCTOR);
  };

  const handleCreateStaff = () => {
    navigate(ROUTES.ADMIN.USERS.CREATE_STAFF);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Quản lý tài khoản</h2>

          <p className="text-muted mb-0">
            Quản lý tài khoản Admin, bác sĩ, Staff và bệnh nhân.
          </p>
        </div>

        <div className="dropdown">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
             Tạo tài khoản
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                type="button"
                className="dropdown-item"
                onClick={handleCreateDoctor}
              >
                Tạo tài khoản bác sĩ
              </button>
            </li>

            <li>
              <button
                type="button"
                className="dropdown-item"
                onClick={handleCreateStaff}
              >
                Tạo tài khoản Staff
              </button>
            </li>
          </ul>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <UserSearchForm
        onSearch={handleSearch}
        initialValues={DEFAULT_SEARCH_PARAMS}
      />

      <UserTable users={users} loading={loading} />

      {pageInfo.totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            Tổng cộng {pageInfo.totalElements} tài khoản
          </small>

          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={pageInfo.page === 0 || loading}
              onClick={() => handlePageChange(pageInfo.page - 1)}
            >
              Trước
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={pageInfo.page >= pageInfo.totalPages - 1 || loading}
              onClick={() => handlePageChange(pageInfo.page + 1)}
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
