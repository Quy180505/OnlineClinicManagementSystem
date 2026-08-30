export default function MedicalRecordForm({formData,saving,onChange,onSubmit,}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="symptoms" className="form-label fw-semibold">
          Triệu chứng
        </label>

        <textarea
          id="symptoms"
          name="symptoms"
          className="form-control"
          rows="2"
          maxLength={5000}
          value={formData.symptoms}
          onChange={(e) => onChange("symptoms", e.target.value)}
          placeholder="Nhập triệu chứng của bệnh nhân..."
        />

        <div className="form-text text-end">
          {formData.symptoms.length}/5000
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="examinationResult" className="form-label fw-semibold">
          Kết quả thăm khám
        </label>

        <textarea
          id="examinationResult"
          name="examinationResult"
          className="form-control"
          rows="3"
          maxLength={5000}
          value={formData.examinationResult}
          onChange={(e) => onChange("examinationResult", e.target.value)}
          placeholder="Nhập kết quả thăm khám..."
        />

        <div className="form-text text-end">
          {formData.examinationResult.length}/5000
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="diagnosis" className="form-label fw-semibold">
          Chẩn đoán
        </label>

        <textarea
          id="diagnosis"
          name="diagnosis"
          className="form-control"
          rows="4"
          maxLength={2000}
          value={formData.diagnosis}
          onChange={(e) => onChange("diagnosis", e.target.value)}
          placeholder="Nhập chẩn đoán..."
        />

        <div className="form-text text-end">
          {formData.diagnosis.length}/2000
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              />
              Đang lưu...
            </>
          ) : (
            "Lưu bệnh án"
          )}
        </button>
      </div>
    </form>
  );
}
