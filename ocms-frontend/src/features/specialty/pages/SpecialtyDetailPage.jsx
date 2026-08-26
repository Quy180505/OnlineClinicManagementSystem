import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SpecialtyForm from "../components/SpecialtyForm";
import useSpecialtyDetail from "../hooks/useSpecialtyDetail";

export default function SpecialtyDetailPage() {
  const { specialtyId } = useParams();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");

  const {
    specialty,
    loading,
    updating,
    error,
    updateError,
    retry,
    updateSpecialty,
    clearUpdateError,
  } = useSpecialtyDetail(specialtyId);

  const handleSubmit = async (data) => {
    setSuccessMessage("");
    clearUpdateError();

    const result = await updateSpecialty(data);

    if (result.success) {
      setSuccessMessage("Cập nhật chuyên khoa thành công.");
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

        <button type="button" className="btn btn-primary" onClick={retry}>
          Thử lại
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary ms-2"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
      </div>
    );
  }

  if (!specialty) {
    return null;
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Chi tiết chuyên khoa</h2>

          <p className="text-muted mb-0">
            Xem và cập nhật thông tin chuyên khoa.
          </p>
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
        <div className="col-12">
          <SpecialtyForm
            specialty={specialty}
            onSubmit={handleSubmit}
            loading={updating}
          />
        </div>
      </div>
    </div>
  );
}
