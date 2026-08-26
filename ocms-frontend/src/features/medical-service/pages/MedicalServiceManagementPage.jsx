import { useState } from "react";
import MedicalServiceForm from "../components/MedicalServiceForm";
import MedicalServiceSearch from "../components/MedicalServiceSearch";
import MedicalServiceTable from "../components/MedicalServiceTable";
import useMedicalServiceManagement from "../hooks/useMedicalServiceManagement";

export default function MedicalServiceManagementPage() {
  const {
    medicalServices,
    specialties,
    pageInfo,

    loading,
    processing,

    error,
    actionError,

    searchMedicalServices,
    handlePageChange,

    createMedicalService,
    deleteMedicalService,

    clearActionError,
    retry,
  } = useMedicalServiceManagement();

  const [successMessage, setSuccessMessage] = useState("");

  const [keyword, setKeyword] = useState("");

  const [specialtyId, setSpecialtyId] = useState("");

  const [serviceType, setServiceType] = useState("");

  const handleKeywordChange = (value) => {
    setKeyword(value);

    searchMedicalServices({
      keyword: value,
      specialtyId,
      serviceType,
    });
  };

  const handleSpecialtyChange = (value) => {
    setSpecialtyId(value);

    searchMedicalServices({
      keyword,
      specialtyId: value,
      serviceType,
    });
  };

  const handleServiceTypeChange = (value) => {
    setServiceType(value);

    searchMedicalServices({
      keyword,
      specialtyId,
      serviceType: value,
    });
  };

  const handleCreate = async (data) => {
    setSuccessMessage("");
    clearActionError();

    const result = await createMedicalService(data);

    if (result.success) {
      setSuccessMessage("Tạo dịch vụ y tế thành công.");
    }

    return result;
  };

  const handleDelete = async (medicalServiceId) => {
    setSuccessMessage("");
    clearActionError();

    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?");

    if (!confirmed) {
      return {
        success: false,
        message: "Đã hủy xóa.",
      };
    }

    const result = await deleteMedicalService(medicalServiceId);

    if (result.success) {
      setSuccessMessage("Xóa dịch vụ y tế thành công.");
    }

    return result;
  };

  if (loading && !medicalServices.length) {
    return (
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error && !medicalServices.length) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger">{error}</div>

        <button type="button" className="btn btn-primary" onClick={retry}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h2 className="mb-1">Quản lý dịch vụ y tế</h2>

        <p className="text-muted mb-0">
          Quản lý các dịch vụ khám và xét nghiệm của phòng khám.
        </p>
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
          <MedicalServiceForm
            specialties={specialties}
            onSubmit={handleCreate}
            loading={processing}
          />
        </div>

        <div className="col-xl-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <MedicalServiceSearch
                keyword={keyword}
                specialtyId={specialtyId}
                serviceType={serviceType}
                specialties={specialties}
                onKeywordChange={handleKeywordChange}
                onSpecialtyChange={handleSpecialtyChange}
                onServiceTypeChange={handleServiceTypeChange}
              />

              <MedicalServiceTable
                medicalServices={medicalServices}
                pageInfo={pageInfo}
                loading={loading}
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
