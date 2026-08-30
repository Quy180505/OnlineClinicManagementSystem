import { useState } from "react";

import PatientLabResultModal from "../../laboratory/components/patient/PatientLabResultModal";

const formatDateTime = (dateTime) => {
  if (!dateTime) {
    return "-";
  }

  return new Date(dateTime).toLocaleString("vi-VN");
};

export default function PatientMedicalRecordDetail({ medicalRecord }) {
  const [showLabResultModal, setShowLabResultModal] = useState(false);

  if (!medicalRecord) {
    return null;
  }

  return (
    <>
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="d-flex flex-column gap-3">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0">Thông tin lần khám</h5>
              </div>

              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <small className="text-muted d-block">
                      Ngày khám
                    </small>

                    <span className="fw-semibold">
                      {formatDateTime(medicalRecord.examinationDate)}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <small className="text-muted d-block">
                      Chuyên khoa
                    </small>

                    <span className="fw-semibold">
                      {medicalRecord.specialtyName || "-"}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <small className="text-muted d-block">
                      Bác sĩ
                    </small>

                    <span className="fw-semibold">
                      {medicalRecord.doctorName || "-"}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <small className="text-muted d-block">
                      Trạng thái
                    </small>

                    <span className="fw-semibold">
                      {medicalRecord.appointmentStatus || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0">Triệu chứng</h5>
              </div>

              <div className="card-body">
                <p className="mb-0">
                  {medicalRecord.symptoms || "-"}
                </p>
              </div>
            </div>
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0">Bệnh được chẩn đoán</h5>
              </div>

              <div className="card-body">
                <p className="mb-0">
                  {medicalRecord.diagnosis || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="d-flex flex-column gap-3">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0">Kết quả thăm khám</h5>
              </div>

              <div className="card-body">
                <p className="mb-0">
                  {medicalRecord.examinationResult || "-"}
                </p>
              </div>
            </div>
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Xét nghiệm</h5>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setShowLabResultModal(true)}
                  >
                    <i className="bi bi-eyedropper me-1" />
                    Xem xét nghiệm
                  </button>
                </div>
              </div>

              <div className="card-body">
                <p className="text-muted mb-0">
                  Nhấn nút để xem các kết quả xét nghiệm của lần khám này.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PatientLabResultModal
        show={showLabResultModal}
        onClose={() => setShowLabResultModal(false)}
        medicalRecordId={medicalRecord.medicalRecordId}
        medicalRecord={medicalRecord}
      />
    </>
  );
}