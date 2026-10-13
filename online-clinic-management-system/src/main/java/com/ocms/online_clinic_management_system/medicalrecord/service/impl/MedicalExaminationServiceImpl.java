package com.ocms.online_clinic_management_system.medicalrecord.service.impl;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.appointment.entity.AppointmentStatus;
import com.ocms.online_clinic_management_system.appointment.exception.AppointmentNotFoundException;
import com.ocms.online_clinic_management_system.appointment.repository.AppointmentRepository;
import com.ocms.online_clinic_management_system.appointment.repository.AppointmentStatusRepository;
import com.ocms.online_clinic_management_system.auth.security.SecurityHelper;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.MedicalExaminationResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.TodayAppointmentResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.TreatmentHistoryResponse;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecord;
import com.ocms.online_clinic_management_system.medicalrecord.mapper.MedicalExaminationMapper;
import com.ocms.online_clinic_management_system.medicalrecord.repository.MedicalRecordRepository;
import com.ocms.online_clinic_management_system.medicalrecord.service.MedicalExaminationService;
import com.ocms.online_clinic_management_system.medicalrecord.validator.MedicalExaminationValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MedicalExaminationServiceImpl implements MedicalExaminationService {

    private static final String STATUS_CONFIRMED = "CONFIRMED";
    private static final String STATUS_IN_PROGRESS = "IN_PROGRESS";
    private static final String STATUS_COMPLETED = "COMPLETED";
    private final AppointmentRepository appointmentRepository;
    private final AppointmentStatusRepository appointmentStatusRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final MedicalExaminationMapper medicalExaminationMapper;
    private final MedicalExaminationValidator medicalExaminationValidator;
    private final SecurityHelper securityHelper;

    @Override
    public List<TodayAppointmentResponse> getTodayAppointments() {

        LocalDate workDate = LocalDate.now();
        Long currentUserId = securityHelper.getCurrentUserId();

        medicalExaminationValidator.validateDoctorAuthenticated(currentUserId);
        Long doctorId = medicalExaminationValidator.validateAndGetDoctorId(currentUserId);
        List<Appointment> appointments = appointmentRepository.findByDoctorAndWorkDateAndStatuses(doctorId, workDate, List.of(STATUS_CONFIRMED, STATUS_IN_PROGRESS,STATUS_COMPLETED));

        return medicalExaminationMapper.toTodayAppointmentResponseList(appointments);
    }

    @Override
    @Transactional
    public MedicalExaminationResponse startMedicalExamination(Long appointmentId) {

        Long currentUserId = securityHelper.getCurrentUserId();
        medicalExaminationValidator.validateDoctorAuthenticated(currentUserId);
        Appointment appointment = medicalExaminationValidator.validateAppointmentExists(appointmentId);
        medicalExaminationValidator.validateDoctorOwnership(appointment, currentUserId);
        medicalExaminationValidator.validateAppointmentConfirmed(appointment);
        medicalExaminationValidator.validateMedicalRecordNotExists(appointmentId);

        AppointmentStatus inProgressStatus = appointmentStatusRepository.findByName(STATUS_IN_PROGRESS).orElseThrow(AppointmentNotFoundException::new);

        appointment.setAppointmentStatus(inProgressStatus);

        MedicalRecord medicalRecord = MedicalRecord.builder()
                        .appointment(appointment)
                        .patient(appointment.getPatient())
                        .doctor(appointment.getDoctor())
                        .examinationDate(LocalDateTime.now())
                        .build();

        medicalRecordRepository.save(medicalRecord);

        return medicalExaminationMapper.toMedicalExaminationResponse(appointment);
    }
    @Override
    public List<TreatmentHistoryResponse> getTreatmentHistory(Long appointmentId) {

        Long currentUserId = securityHelper.getCurrentUserId();

        medicalExaminationValidator.validateDoctorAuthenticated(currentUserId);
        Appointment appointment = medicalExaminationValidator.validateAppointmentExists(appointmentId);
        medicalExaminationValidator.validateDoctorOwnership(appointment, currentUserId);
        Long patientId = appointment.getPatient().getId();
        List<MedicalRecord> medicalRecords = medicalRecordRepository.findByPatientIdOrderByExaminationDateDesc(patientId);

        return medicalExaminationMapper.toTreatmentHistoryResponseList(medicalRecords);
    }
}