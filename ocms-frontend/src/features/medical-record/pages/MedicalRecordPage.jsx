import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MedicalRecordForm from "../components/MedicalRecordForm";
import useMedicalRecord from "../hooks/useMedicalRecord";
import DoctorLaboratoryPanel from "../../laboratory/components/doctor/DoctorLaboratoryPanel";
export default function MedicalRecordPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const {
    medicalRecord,formData,loading,saving,error,saveError,saveSuccess,
    loadMedicalRecord,updateField,updateMedicalRecord,clearError, clearSaveSuccess,clearSaveError,
  } = useMedicalRecord();

  const loadData = useCallback(() => {
    loadMedicalRecord(appointmentId);
  }, [appointmentId, loadMedicalRecord]);

  useEffect(() => {
    loadData();
  }, [loadData]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateMedicalRecord(appointmentId);
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary me-3"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>

        <div>
          <h4 className="mb-1">Bệnh án điện tử</h4>

          <p className="text-muted mb-0">
            Cập nhật thông tin khám bệnh của bệnh nhân.
          </p>
        </div>
      </div>

      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}

          <button type="button" className="btn-close" onClick={clearError} />
        </div>
      )}

      {saveError && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {saveError}

          <button
            type="button"
            className="btn-close"
            onClick={clearSaveError}
          />
        </div>
      )}

      {saveSuccess && (
        <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <i className="bi bi-check-circle me-2" />
            {saveSuccess}

            <button
              type="button"
              className="btn-close"
              onClick={clearSaveSuccess}
            />
          </div>
        )}

 
  {medicalRecord && (
    <div className="row g-4">
      <div className="col-lg-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-header bg-white border-0 py-3">
            <h5 className="mb-1">Bệnh án điện tử</h5>

            <small className="text-muted">
              Thông tin khám bệnh của bệnh nhân
            </small>
          </div>

          <div className="card-body">
            <div className="row g-3 mb-4">
              <div className="col-12">
                <small className="text-muted d-block">
                  Ngày khám
                </small>

                <span className="fw-semibold">
                  {medicalRecord.examinationDate? new Date( medicalRecord.examinationDate).toLocaleString("vi-VN"): "-"}
                </span>
              </div>
            </div>

            <hr className="mb-4" />

            <h6 className="mb-3">
              Thông tin khám bệnh
            </h6>

            <MedicalRecordForm
              formData={formData}
              saving={saving}
              onChange={updateField}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
      
      <div className="col-lg-6">
        
        <DoctorLaboratoryPanel medicalRecordId={medicalRecord.id}/>
       
      </div>
    </div>
  )}
      </div>
    );
}
