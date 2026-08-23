package com.ocms.online_clinic_management_system.appointment.validator;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.appointment.exception.*;
import com.ocms.online_clinic_management_system.appointment.repository.AppointmentRepository;
import com.ocms.online_clinic_management_system.common.constant.enums.MedicalServiceType;
import com.ocms.online_clinic_management_system.common.constant.enums.ScheduleStatus;
import com.ocms.online_clinic_management_system.schedule.entity.DoctorSchedule;
import com.ocms.online_clinic_management_system.service.entity.MedicalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AppointmentValidator {

    private final AppointmentRepository appointmentRepository;

    public Appointment validateAppointmentExists(Long appointmentId) {
        return appointmentRepository.findById(appointmentId).orElseThrow(AppointmentNotFoundException::new);
    }

    public void validatePatientOwnership(Appointment appointment, Long patientId) {
        if (!appointment.getPatient().getId().equals(patientId)) {
            throw new AppointmentAccessDeniedException();
        }
    }
    public void validateAppointmentNotExists(Long patientId, Long scheduleId) {
        if (appointmentRepository.existsByPatient_IdAndSchedule_Id(patientId, scheduleId)) {
            throw new AppointmentAlreadyExistsException();
        }
    }

    public void validateScheduleAvailable(DoctorSchedule schedule) {
        if (schedule.getStatus() != ScheduleStatus.AVAILABLE) {
            throw new ScheduleUnavailableException();
        }
    }

    public void validateServiceIsExam(MedicalService medicalService) {
        if (medicalService.getServiceType() != MedicalServiceType.EXAM) {
            throw new AppointmentExamServiceRequiredException();
        }
    }

    public void validateServiceBelongsToDoctor(MedicalService medicalService, DoctorSchedule schedule) {
        Long serviceSpecialtyId = medicalService.getSpecialty().getId();
        Long doctorSpecialtyId = schedule.getDoctor().getSpecialty().getId();
        if (!serviceSpecialtyId.equals(doctorSpecialtyId)) {
            throw new InvalidAppointmentServiceException();
        }
    }

    public void validateScheduleCapacity(DoctorSchedule schedule) {

        long currentAppointments = appointmentRepository.countValidAppointmentsByScheduleId(schedule.getId());

        if (currentAppointments >= schedule.getMaxPatients()) {
            throw new ScheduleFullException();
        }
    }
    public void validateCancellation(Appointment appointment) {
        String status = appointment.getAppointmentStatus().getName();

        if (!"PENDING".equals(status) && !"CONFIRMED".equals(status)) {
            throw new AppointmentCancellationException();
        }
    }

    public void validateStatusTransition(Appointment appointment, String targetStatus) {
        String currentStatus = appointment.getAppointmentStatus().getName();

        boolean valid = switch (currentStatus) {
            case "PENDING" -> "CONFIRMED".equals(targetStatus) || "REJECTED".equals(targetStatus) || "CANCELLED".equals(targetStatus);
            case "CONFIRMED" -> "IN_PROGRESS".equals(targetStatus) || "CANCELLED".equals(targetStatus);
            case "IN_PROGRESS" -> "COMPLETED".equals(targetStatus);
            case "COMPLETED", "CANCELLED", "REJECTED" -> false;
            default -> false;
        };

        if (!valid) {
            throw new InvalidAppointmentStatusException();
        }
    }
}