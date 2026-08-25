import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PatientInformationForm from "../components/PatientInformationForm";
import usePatientDetail from "../hooks/usePatientDetail";

export default function PatientDetailPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");

  const {
    patient,
    loading,
    updating,
    error,
    updateError,
    retry,
    updatePatient,
    clearUpdateError,
  } = usePatientDetail(patientId);

  const handleSubmit = async (data) => {
    setSuccessMessage("");
    clearUpdateError();

    const result = await updatePatient(data);

    if (result?.success) {
      setSuccessMessage("Cập nhật thông tin bệnh nhân thành công.");
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
        <div className="alert alert-danger" role="alert">
          <h6 className="alert-heading">Không thể tải thông tin bệnh nhân</h6>

          <div>{error}</div>
        </div>

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

  if (!patient) {
    return null;
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Chi tiết bệnh nhân</h2>

          <p className="text-muted mb-0">
            Xem và cập nhật thông tin bệnh nhân.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
          disabled={updating}
        >
          Quay lại
        </button>
      </div>

      {successMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Thành công!</strong> {successMessage}
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
          <strong>Không thể cập nhật.</strong> {updateError}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={clearUpdateError}
          />
        </div>
      )}

      <PatientInformationForm
        patient={patient}
        onSubmit={handleSubmit}
        loading={updating}
      />
    </div>
  );
}
