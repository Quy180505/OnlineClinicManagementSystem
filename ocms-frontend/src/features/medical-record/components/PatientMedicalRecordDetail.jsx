import {formatDateTime} from "../../../utils/dateUtils";
export default function PatientMedicalRecordDetail({medicalRecord,onChatWithDoctor, creatingChatRoom}) {
  
  if (!medicalRecord) {
    return null;
  }

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white border-0 py-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5 className="mb-1">
            Bệnh án
          </h5>

          <small className="text-muted">
            Thông tin của lần khám
          </small>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() =>
            onChatWithDoctor?.(medicalRecord.doctorId)
          }
          disabled={
            creatingChatRoom ||
            !medicalRecord.doctorId
          }
        >
          {creatingChatRoom ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-1"
                role="status"
                aria-hidden="true"
              />
              Đang xử lý...
            </>
          ) : (
            <>
              <i className="bi bi-chat-dots me-1" />
              Nhắn tin
            </>
          )}
    </button>
      </div>
    </div>

      <div className="card-body">
        <div className="row g-3">

          <div className="col-12">
            <small className="text-muted d-block">
              Ngày khám
            </small>

            <span className="fw-semibold">
              {formatDateTime(medicalRecord.examinationDate)}
            </span>
          </div>

          <div className="col-12">
            <small className="text-muted d-block">
              Chuyên khoa
            </small>

            <span className="fw-semibold">
              {medicalRecord.specialtyName || "-"}
            </span>
          </div>

          <div className="col-12">
            <small className="text-muted d-block">
              Bác sĩ
            </small>

            <span className="fw-semibold">
              {medicalRecord.doctorName || "-"}
            </span>
          </div>

          <div className="col-12">
            <small className="text-muted d-block">
              Trạng thái
            </small>

            <span className="fw-semibold">
              {medicalRecord.appointmentStatus || "-"}
            </span>
          </div>

        </div>

        <hr className="my-4" />

        <div className="mb-4">
          <h6 className="mb-2">
            Triệu chứng
          </h6>

          <p className="mb-0">
            {medicalRecord.symptoms || "-"}
          </p>
        </div>

        <div>
          <h6 className="mb-2">
            Bệnh được chẩn đoán
          </h6>

          <p className="mb-0">
            {medicalRecord.diagnosis || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}