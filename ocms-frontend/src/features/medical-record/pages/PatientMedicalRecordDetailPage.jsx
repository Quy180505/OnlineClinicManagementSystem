import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PatientMedicalRecordDetail from "../components/PatientMedicalRecordDetail";
import usePatientMedicalRecord from "../hooks/usePatientMedicalRecord";

export default function PatientMedicalRecordDetailPage() {
  const { medicalRecordId } = useParams();
  const navigate = useNavigate();

  const { medicalRecordDetail, detailLoading,detailError,loadMyHistoryDetail,clearDetailError} = usePatientMedicalRecord();

  useEffect(() => {
    if (medicalRecordId) {
      loadMyHistoryDetail(medicalRecordId);
    }
  }, [medicalRecordId, loadMyHistoryDetail]);

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary me-3"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-1" />
          Quay lại
        </button>

        <div>
          <h4 className="mb-1">
           Chi tiết lần khám của bạn 
          </h4>
        </div>
      </div>

      {detailError && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {detailError}

          <button
            type="button"
            className="btn-close"
            onClick={clearDetailError}
          />
        </div>
      )}

      {detailLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">
              Đang tải...
            </span>
          </div>

          <div className="text-muted mt-2">
            Đang tải hồ sơ khám...
          </div>
        </div>
      ) :medicalRecordDetail ? (
        <PatientMedicalRecordDetail
          medicalRecord={medicalRecordDetail}
        />
      ) : !detailError ? (
        <div className="text-center py-5 text-muted">
          Không tìm thấy hồ sơ khám bệnh.
        </div>
      ) : null}
    </div>
  );
}