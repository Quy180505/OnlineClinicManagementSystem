import { useNavigate } from "react-router-dom";

import AppointmentForm from "../components/AppointmentForm";
import useAppointmentBooking from "../hooks/useAppointmentBooking";
import { ROUTES } from "../../../constants/routeConstants";

export default function AppointmentBookingPage() {
  const navigate = useNavigate();

  const { 
    specialties, services,schedules,selectedSpecialtyId,specialtyLoading,
    serviceLoading, scheduleLoading,processing,error,bookingError, successMessage,

    handleSpecialtyChange, handleServiceChange,createAppointment,retry, clearSuccessMessage,
  } = useAppointmentBooking();

  const handleSubmit = async (data) => {
    const result = await createAppointment(data);

    if (result.success) {
      navigate(ROUTES.PATIENT.APPOINTMENTS.DETAIL(result.data.id));
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="mb-4">
        <h3 className="mb-1">Đặt lịch khám</h3>

        <p className="text-muted mb-0">
          Chọn chuyên khoa, dịch vụ và lịch khám phù hợp.
        </p>
      </div>

      {error && (
        <div
          className="alert alert-danger d-flex justify-content-between align-items-center"
          role="alert"
        >
          <span>{error}</span>

          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={retry}
          >
            Thử lại
          </button>
        </div>
      )}

      {bookingError && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {bookingError}

          <button type="button" className="btn-close" aria-label="Close" />
        </div>
      )}

      {successMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {successMessage}

          <button
            type="button"
            className="btn-close"
            onClick={clearSuccessMessage}
            aria-label="Close"
          />
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-7">
          <AppointmentForm
            specialties={specialties}
            services={services}
            schedules={schedules}
            selectedSpecialtyId={selectedSpecialtyId}
            onSpecialtyChange={handleSpecialtyChange}
            onServiceChange={handleServiceChange}
            onSubmit={handleSubmit}
            loading={processing}
            processing={processing}
            specialtyLoading={specialtyLoading}
            serviceLoading={serviceLoading}
            scheduleLoading={scheduleLoading}
          />
        </div>
      </div>
    </div>
  );
}
