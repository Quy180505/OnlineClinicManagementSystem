import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PatientMedicalRecordDetail from "../components/PatientMedicalRecordDetail";
import PatientLabResultModal from "../../laboratory/components/patient/PatientLabResultModal";
import PrescriptionPatientDetail from "../../prescription/components/patient/PrescriptionPatientDetail";
import usePatientMedicalRecord from "../hooks/usePatientMedicalRecord";
import usePrescriptionDetail from "../../prescription/hooks/usePrescriptionDetail";

export default function PatientMedicalRecordDetailPage() {
  const { medicalRecordId } = useParams();
  const navigate = useNavigate();

  const [showLabResultModal, setShowLabResultModal] =
    useState(false);


  const { medicalRecordDetail, detailLoading, detailError,loadMyHistoryDetail,clearDetailError} = usePatientMedicalRecord();


  const {
    prescription,loading: prescriptionLoading,error: prescriptionError,
    loadPrescriptionByMedicalRecord,clearPrescriptionDetail,clearError: clearPrescriptionError,
  } = usePrescriptionDetail();


  useEffect(() => {
    if (!medicalRecordId) {
      return;
    }

    loadMyHistoryDetail(medicalRecordId);
  }, [
    medicalRecordId,
    loadMyHistoryDetail,
  ]);


  useEffect(() => {
    if (!medicalRecordId) {
      return;
    }

    loadPrescriptionByMedicalRecord( medicalRecordId).catch(() => {});
  }, [
    medicalRecordId,
    loadPrescriptionByMedicalRecord,
  ]);


  useEffect(() => {
    return () => {
      clearPrescriptionDetail();
    };
  }, [clearPrescriptionDetail]);

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
            Chi tiết lần khám
          </h4>

          <p className="text-muted mb-0">
            Xem thông tin bệnh án, xét nghiệm và đơn thuốc.
          </p>
        </div>
      </div>

      {detailError && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-exclamation-circle me-2" />

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
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Đang tải...
            </span>
          </div>

          <div className="text-muted mt-2">
            Đang tải hồ sơ khám...
          </div>
        </div>
      ) : medicalRecordDetail ? (
        <>
          <div className="row g-4">
            <div className="col-lg-4">
              <PatientMedicalRecordDetail
                medicalRecord={medicalRecordDetail}
              />
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-0 py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1">
                        Xét nghiệm
                      </h5>

                      <small className="text-muted">
                        Kết quả xét nghiệm của lần khám
                      </small>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() =>
                        setShowLabResultModal(true)
                      }
                    >
                      <i className="bi bi-eyedropper me-1" />
                      Xem
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <div className="text-center py-5 text-muted">
                    <i className="bi bi-file-earmark-medical fs-2 d-block mb-2" />

                    Nhấn "Xem" để xem kết quả xét nghiệm
                    của lần khám.
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="mb-1">
                    Đơn thuốc
                  </h5>
                </div>

                <div className="card-body">
                  {prescriptionError && (
                    <div
                      className="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      <i className="bi bi-exclamation-circle me-2" />

                      {prescriptionError}

                      <button
                        type="button"
                        className="btn-close"
                        onClick={clearPrescriptionError}
                      />
                    </div>
                  )}

                  {prescriptionLoading ? (
                    <div className="text-center py-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">
                          Đang tải...
                        </span>
                      </div>

                      <div className="text-muted mt-2">
                        Đang tải đơn thuốc...
                      </div>
                    </div>
                  ) : prescription ? (
                    <PrescriptionPatientDetail
                      prescription={prescription}
                    />
                  ) : (
                    <div className="text-center py-5 text-muted">
                      <i className="bi bi-prescription2 fs-2 d-block mb-2" />

                      <div>
                        Lần khám này chưa có đơn thuốc.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <PatientLabResultModal
            show={showLabResultModal}
            onClose={() => setShowLabResultModal(false)}
            medicalRecordId={medicalRecordDetail.medicalRecordId}
            medicalRecord={medicalRecordDetail}
          />
        </>
      ) : !detailError ? (
        <div className="text-center py-5 text-muted">
          Không tìm thấy hồ sơ khám bệnh.
        </div>
      ) : null}
    </div>
  );
}