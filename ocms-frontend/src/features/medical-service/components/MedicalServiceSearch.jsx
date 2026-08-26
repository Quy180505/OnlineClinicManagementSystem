const SERVICE_TYPE_LABELS = {
  EXAM: "Dịch vụ khám",
  TEST: "Dịch vụ xét nghiệm",
};

export default function MedicalServiceSearch({
  keyword,
  specialtyId,
  serviceType,
  specialties,
  onKeywordChange,
  onSpecialtyChange,
  onServiceTypeChange,
}) {
  return (
    <div className="row g-3 mb-3">
      <div className="col-lg-6">
        <label htmlFor="medicalServiceKeyword" className="form-label">
          Tìm kiếm dịch vụ
        </label>

        <div className="input-group">
          <span className="input-group-text">🔍</span>

          <input
            id="medicalServiceKeyword"
            type="search"
            className="form-control"
            placeholder="Nhập tên dịch vụ..."
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
          />
        </div>
      </div>

      <div className="col-lg-3">
        <label htmlFor="medicalServiceSpecialty" className="form-label">
          Chuyên khoa
        </label>

        <select
          id="medicalServiceSpecialty"
          className="form-select"
          value={specialtyId}
          onChange={(event) => onSpecialtyChange(event.target.value)}
        >
          <option value="">Tất cả chuyên khoa</option>

          {specialties.map((specialty) => (
            <option key={specialty.id} value={specialty.id}>
              {specialty.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-lg-3">
        <label htmlFor="medicalServiceType" className="form-label">
          Loại dịch vụ
        </label>

        <select
          id="medicalServiceType"
          className="form-select"
          value={serviceType}
          onChange={(event) => onServiceTypeChange(event.target.value)}
        >
          <option value="">Tất cả loại</option>

          {Object.entries(SERVICE_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
