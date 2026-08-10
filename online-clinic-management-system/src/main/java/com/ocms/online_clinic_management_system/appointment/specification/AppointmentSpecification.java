package com.ocms.online_clinic_management_system.appointment.specification;

import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public final class AppointmentSpecification {

    private AppointmentSpecification() {
    }

    public static Specification<Appointment> hasPatientId(Long patientId) {
        return (root, query, criteriaBuilder) -> patientId == null ? null :
                criteriaBuilder.equal(root.get("patient").get("id"), patientId);
    }

    public static Specification<Appointment> hasDoctorId(Long doctorId) {
        return (root, query, criteriaBuilder) -> doctorId == null ? null :
                criteriaBuilder.equal(root.get("doctor").get("id"), doctorId);
    }

    public static Specification<Appointment> hasAppointmentStatusId(Long appointmentStatusId) {
        return (root, query, criteriaBuilder) -> appointmentStatusId == null ? null :
                criteriaBuilder.equal(root.get("appointmentStatus").get("id"), appointmentStatusId);
    }

    public static Specification<Appointment> hasServiceId(Long serviceId) {
        return (root, query, criteriaBuilder) -> serviceId == null ? null :
                criteriaBuilder.equal(root.get("service").get("id"),serviceId);
    }


    public static Specification<Appointment> scheduleDateFrom(LocalDate fromDate) {
        return (root, query, criteriaBuilder) -> fromDate == null ? null :
                criteriaBuilder.greaterThanOrEqualTo(root.get("schedule").get("workDate"), fromDate);
    }

    public static Specification<Appointment> scheduleDateTo(LocalDate toDate) {
        return (root, query, criteriaBuilder) -> toDate == null ? null :
                criteriaBuilder.lessThanOrEqualTo(root.get("schedule").get("workDate"), toDate);
    }
}