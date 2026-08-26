import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MedicalServiceForm from "../components/MedicalServiceForm";
import useMedicalServiceDetail from "../hooks/useMedicalServiceDetail";

export default function MedicalServiceDetailPage() {
  const { medicalServiceId } = useParams();

  const navigate = useNavigate();

  const {
    medicalService,
    specialties,

    loading,
    updating,

    error,
    updateError,

    retry,
    updateMedicalService,
    clearUpdateError,
  } = useMedicalServiceDetail(medicalServiceId);

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (data) => {
    setSuccessMessage("");
    clearUpdateError();

    const result = await updateMedicalService(data);

    if (result.success) {
      setSuccessMessage("Cập nhật dịch vụ y tế thành công.");
    }

    return result;
  };

  if (loading) {
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

  if (error) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger">{error}</div>

        <button type="button" className="btn btn-primary me-2" onClick={retry}>
          Thử lại
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
      </div>
    );
  }

  if (!medicalService) {
    return null;
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Chi tiết dịch vụ y tế</h2>

          <p className="text-muted mb-0">Xem và cập nhật thông tin dịch vụ.</p>
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
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

      {updateError && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {updateError}

          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={clearUpdateError}
          />
        </div>
      )}

      <div className="row">
        <div className="col-xl-8">
          <MedicalServiceForm
            medicalService={medicalService}
            specialties={specialties}
            onSubmit={handleSubmit}
            loading={updating}
          />
        </div>
      </div>
    </div>
  );
}
