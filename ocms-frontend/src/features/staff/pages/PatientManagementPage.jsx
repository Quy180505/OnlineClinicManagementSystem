import PatientSearchForm from "../components/PatientSearchForm";
import PatientTable from "../components/PatientTable";
import PatientPagination from "../components/PatientPagination";
import usePatientManagement from "../hooks/usePatientManagement";

export default function PatientManagementPage() {
  const {
    patients,
    pageInfo,
    searchParams,
    loading,
    error,
    handleSearch,
    handlePageChange,
    retry,
  } = usePatientManagement();

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h2 className="mb-1">Quản lý bệnh nhân</h2>

        <p className="text-muted mb-0">
          Tìm kiếm và quản lý thông tin bệnh nhân.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}

          <div className="mt-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={retry}
            >
              Thử lại
            </button>
          </div>
        </div>
      )}

      <PatientSearchForm onSearch={handleSearch} />

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0">Danh sách bệnh nhân</h5>
        </div>

        <div className="card-body p-0">
          <PatientTable
            patients={patients}
            loading={loading}
            currentPage={pageInfo.page}
            pageSize={searchParams.size}
          />
        </div>
      </div>

      <PatientPagination
        currentPage={pageInfo.page}
        totalPages={pageInfo.totalPages}
        totalElements={pageInfo.totalElements}
        pageSize={searchParams.size}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
