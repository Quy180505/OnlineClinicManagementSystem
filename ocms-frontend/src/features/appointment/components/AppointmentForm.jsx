import { useState } from "react";

export default function AppointmentForm({
  specialties = [],
  services = [],
  schedules = [],

  selectedSpecialtyId = "",

  onSpecialtyChange,
  onServiceChange,
  onSubmit,

  loading = false,
  processing = false,
  specialtyLoading = false,
  serviceLoading = false,
  scheduleLoading = false,
}) {
  const [form, setForm] = useState({
    serviceId: "",
    scheduleId: "",
    note: "",
  });

  const handleSpecialtyChange = (event) => {

    const { value } = event.target;

    setForm((previous) => ({...previous, serviceId: "", scheduleId: "",}));
    onSpecialtyChange(value);
  };

  const handleServiceChange = async (event) => {
    const { value } = event.target;

    setForm((previous) => ({...previous,serviceId: value,scheduleId: "",}));

    await onServiceChange(value);
  };

  const handleScheduleChange = (event) => {
    const { value } = event.target;

    setForm((previous) => ({ ...previous,scheduleId: value,}));
  };

  const handleNoteChange = (event) => {
    setForm((previous) => ({...previous,note: event.target.value,}));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.serviceId || !form.scheduleId) {
      return;
    }

    onSubmit({
      serviceId: Number(form.serviceId),
      scheduleId: Number(form.scheduleId),
      note: form.note.trim() || null,
    });
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-0 py-3">
        <h5 className="mb-1">Đặt lịch khám</h5>

        <small className="text-muted">
          Chọn chuyên khoa, dịch vụ và lịch làm việc phù hợp để đặt lịch khám.
        </small>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="appointmentSpecialty" className="form-label">
                Chuyên khoa
              </label>

              <select
                id="appointmentSpecialty"
                className="form-select"
                value={selectedSpecialtyId}
                onChange={handleSpecialtyChange}
                disabled={loading || processing || specialtyLoading}
                required
              >
                <option value="">-- Chọn chuyên khoa --</option>

                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>

              {specialtyLoading && (
                <div className="form-text">Đang tải chuyên khoa...</div>
              )}
            </div>
            <div className="col-12">
              <label htmlFor="appointmentService" className="form-label">
                Dịch vụ khám
              </label>

              <select
                id="appointmentService"
                className="form-select"
                value={form.serviceId}
                onChange={handleServiceChange}
                disabled={loading ||processing ||serviceLoading ||!selectedSpecialtyId}
                required
              >
                <option value="">
                  {!selectedSpecialtyId ? "-- Vui lòng chọn chuyên khoa trước --" : "-- Chọn dịch vụ khám --"}
                </option>

                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.serviceName}

                    {service.price != null? ` - ${Number(service.price).toLocaleString("vi-VN",)} VNĐ`: ""}
                  </option>
                ))}
              </select>

              {serviceLoading && (
                <div className="form-text">Đang tải dịch vụ khám...</div>
              )}
            </div>
            <div className="col-12">
              <label htmlFor="appointmentSchedule" className="form-label">
                Lịch khám
              </label>

              <select
                id="appointmentSchedule"
                className="form-select"
                value={form.scheduleId}
                onChange={handleScheduleChange}
                disabled={loading || processing || scheduleLoading || !form.serviceId}
                required
              >
                <option value="">
                  {!form.serviceId ? "-- Vui lòng chọn dịch vụ trước --": "-- Chọn lịch khám --"}
                </option>

                {schedules.map((schedule) => (
                  <option key={schedule.id} value={schedule.id}>
                    {schedule.doctorName ? `${schedule.doctorName} - ` : ""}
                    {schedule.workDate || schedule.date}{" "}
                    {schedule.startTime?.slice(0, 5)} -{" "}
                    {schedule.endTime?.slice(0, 5)}
                  </option>
                ))}
              </select>

              {scheduleLoading && (
                <div className="form-text">Đang tải lịch khám...</div>
              )}

              {!scheduleLoading && form.serviceId && schedules.length === 0 && (
                <div className="form-text text-warning">
                  Không có lịch khám phù hợp.
                </div>
              )}
            </div>

            <div className="col-12">
              <label htmlFor="appointmentNote" className="form-label">
                Ghi chú
              </label>

              <textarea
                id="appointmentNote"
                name="note"
                className="form-control"
                rows="4"
                value={form.note}
                onChange={handleNoteChange}
                disabled={loading || processing}
                maxLength={500}
                placeholder="Nhập ghi chú nếu cần..."
              />

              <div className="form-text text-end">{form.note.length}/500</div>
            </div>
          </div>
        </div>

        <div className="card-footer bg-white border-0 d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={ loading || processing || !selectedSpecialtyId ||!form.serviceId ||!form.scheduleId}
          >
            {loading || processing ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                Đang đặt lịch...
              </>
            ) : (
              "Đặt lịch khám"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
