import {formatDateTime} from "../../../utils/dateUtils";
export default function PatientMedicalRecordDetail({medicalRecord}) {
  
  if (!medicalRecord) {
    return null;
  }

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white border-0 py-3">
        <h5 className="mb-1">
          Bệnh án
        </h5>

        <small className="text-muted">
          Thông tin của lần khám
        </small>
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