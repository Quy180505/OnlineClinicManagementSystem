package com.ocms.online_clinic_management_system.medicalrecord.validator;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.appointment.exception.AppointmentNotFoundException;
import com.ocms.online_clinic_management_system.appointment.repository.AppointmentRepository;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.doctor.repository.DoctorRepository;
import com.ocms.online_clinic_management_system.medicalrecord.exception.AppointmentNotConfirmedException;
import com.ocms.online_clinic_management_system.medicalrecord.exception.MedicalExaminationAccessDeniedException;
import com.ocms.online_clinic_management_system.medicalrecord.exception.MedicalRecordAlreadyExistsException;
import com.ocms.online_clinic_management_system.medicalrecord.repository.MedicalRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MedicalExaminationValidator {

    private final AppointmentRepository appointmentRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final DoctorRepository doctorRepository;

    public void validateDoctorAuthenticated(Long doctorId) {
        if (doctorId == null) {
            throw new MedicalExaminationAccessDeniedException();
        }
    }

    public Long validateAndGetDoctorId(Long userId) {
        return doctorRepository.findByUserId(userId).map(Doctor::getId).orElseThrow(MedicalExaminationAccessDeniedException::new);
    }

    public Appointment validateAppointmentExists(Long appointmentId) {
        return appointmentRepository.findById(appointmentId).orElseThrow(AppointmentNotFoundException::new);
    }

    public void validateDoctorOwnership(Appointment appointment,Long currentUserId) {
        if (!appointment.getDoctor().getUser().getId().equals(currentUserId)) {
            throw new MedicalExaminationAccessDeniedException();
        }
    }

    public void validateAppointmentConfirmed(Appointment appointment) {
        String status = appointment.getAppointmentStatus().getName();

        if (!"CONFIRMED".equals(status)) {
            throw new AppointmentNotConfirmedException();
        }
    }

    public void validateMedicalRecordNotExists(Long appointmentId) {
        if (medicalRecordRepository.findByAppointmentId(appointmentId).isPresent()) {
            throw new MedicalRecordAlreadyExistsException();
        }
    }
}

