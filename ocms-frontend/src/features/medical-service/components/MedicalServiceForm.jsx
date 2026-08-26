import useMedicalServiceForm from "../hooks/useMedicalServiceForm";

const SERVICE_TYPE_LABELS = {
  EXAM: "Dịch vụ khám",
  TEST: "Dịch vụ xét nghiệm",
};

export default function MedicalServiceForm({
  medicalService,
  specialties,
  onSubmit,
  loading,
}) {
  const { form, handleChange, getSubmitData } =
    useMedicalServiceForm(medicalService);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(getSubmitData());
  };

  const isEdit = Boolean(medicalService);

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3">
        <h5 className="mb-1">
          {isEdit ? "Thông tin dịch vụ y tế" : "Thêm dịch vụ y tế"}
        </h5>

        <small className="text-muted">
          {isEdit
            ? "Cập nhật thông tin của dịch vụ y tế."
            : "Nhập thông tin để tạo dịch vụ y tế mới."}
        </small>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="serviceName" className="form-label">
                Tên dịch vụ
              </label>

              <input
                id="serviceName"
                type="text"
                name="serviceName"
                value={form.serviceName}
                onChange={handleChange}
                className="form-control"
                maxLength={150}
                disabled={loading}
                required
                placeholder="Nhập tên dịch vụ"
              />
            </div>

            <div className="col-12">
              <label htmlFor="specialtyId" className="form-label">
                Chuyên khoa
              </label>

              <select
                id="specialtyId"
                name="specialtyId"
                value={form.specialtyId}
                onChange={handleChange}
                className="form-select"
                disabled={loading}
                required
              >
                <option value="">-- Chọn chuyên khoa --</option>

                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <label htmlFor="serviceType" className="form-label">
                Loại dịch vụ
              </label>

              <select
                id="serviceType"
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                className="form-select"
                disabled={loading}
                required
              >
                <option value="">-- Chọn loại dịch vụ --</option>

                {Object.entries(SERVICE_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <label htmlFor="price" className="form-label">
                Giá dịch vụ
              </label>

              <div className="input-group">
               <input
                  id="price"
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="form-control"
                  min="0.01"
                  step="any"
                  disabled={loading}
                  required
                  placeholder="Nhập giá dịch vụ"
                />

                <span className="input-group-text">VNĐ</span>
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="description" className="form-label">
                Mô tả
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
                rows="4"
                maxLength={2000}
                disabled={loading}
                placeholder="Nhập mô tả dịch vụ"
              />
            </div>
          </div>
        </div>

        <div className="card-footer bg-white d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                Đang lưu...
              </>
            ) : isEdit ? (
              "Lưu thay đổi"
            ) : (
              "Thêm dịch vụ"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
