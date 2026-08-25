import { useState } from "react";
import SpecialtyForm from "../components/SpecialtyForm";
import SpecialtySearch from "../components/SpecialtySearch";
import SpecialtyTable from "../components/SpecialtyTable";
import useSpecialtyManagement from "../hooks/useSpecialtyManagement";

export default function SpecialtyManagementPage() {
  const {
    specialties,
    pageInfo,
    loading,
    processing,
    error,
    actionError,
    searchSpecialties,
    handlePageChange,
    retry,
    createSpecialty,
    deleteSpecialty,
    clearActionError,
  } = useSpecialtyManagement();

  const [successMessage, setSuccessMessage] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearch = (value) => {
    setKeyword(value);
    searchSpecialties(value);
  };

  const handleCreate = async (data) => {
    setSuccessMessage("");
    clearActionError();

    const result = await createSpecialty(data);

    if (result.success) {
      setSuccessMessage("Tạo chuyên khoa thành công.");
      searchSpecialties(keyword);
    }

    return result;
  };

  const handleDelete = async (specialtyId) => {
    setSuccessMessage("");
    clearActionError();

    const result = await deleteSpecialty(specialtyId);

    if (result.success) {
      setSuccessMessage("Xóa chuyên khoa thành công.");
    }

    return result;
  };

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">
              Đang tải...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger">
          {error}
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={retry}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">
            Quản lý chuyên khoa
          </h2>

          <p className="text-muted mb-0">
            Quản lý danh sách chuyên khoa của phòng khám.
          </p>
        </div>
      </div>

      {successMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {successMessage}

          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setSuccessMessage("")}
          />
        </div>
      )}

      {actionError && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {actionError}

          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={clearActionError}
          />
        </div>
      )}

      <div className="row g-4">
        <div className="col-xl-4">
          <SpecialtyForm
            onSubmit={handleCreate}
            loading={processing}
          />
        </div>

        <div className="col-xl-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <SpecialtySearch
                keyword={keyword}
                onKeywordChange={handleSearch}
              />

              <SpecialtyTable
                specialties={specialties}
                pageInfo={pageInfo}
                loading={processing}
                onDelete={handleDelete}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}