package com.ocms.online_clinic_management_system.medicalrecord.validator;

import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.appointment.exception.InvalidAppointmentStatusException;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.doctor.repository.DoctorRepository;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecord;
import com.ocms.online_clinic_management_system.medicalrecord.exception.MedicalExaminationAccessDeniedException;
import com.ocms.online_clinic_management_system.medicalrecord.exception.MedicalRecordNotFoundException;
import com.ocms.online_clinic_management_system.medicalrecord.repository.MedicalRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MedicalRecordValidator {

    private static final String STATUS_IN_PROGRESS = "IN_PROGRESS";

    private final MedicalRecordRepository medicalRecordRepository;

    public MedicalRecord validateMedicalRecordExists(Long appointmentId) {
        return medicalRecordRepository.findByAppointmentId(appointmentId).orElseThrow(MedicalRecordNotFoundException::new);
    }

    public void validateDoctorOwnership(MedicalRecord medicalRecord, Long currentUserId) {
        if (!medicalRecord.getDoctor().getUser().getId().equals(currentUserId)) {
            throw new MedicalExaminationAccessDeniedException();
        }
    }

    public void validateAppointmentInProgress(MedicalRecord medicalRecord) {
        Appointment appointment = medicalRecord.getAppointment();

        if (appointment == null || appointment.getAppointmentStatus() == null
                || !STATUS_IN_PROGRESS.equals(appointment.getAppointmentStatus().getName()))
        {
            throw new InvalidAppointmentStatusException();
        }
    }

    public MedicalRecord validateMedicalRecordById(Long medicalRecordId) {
        return medicalRecordRepository.findById(medicalRecordId).orElseThrow(MedicalRecordNotFoundException::new);
    }
}