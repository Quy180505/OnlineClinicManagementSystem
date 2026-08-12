package com.ocms.online_clinic_management_system.medicalrecord.service.impl;

import com.ocms.online_clinic_management_system.auth.security.SecurityHelper;
import com.ocms.online_clinic_management_system.medicalrecord.dto.request.UpdateMedicalRecordRequest;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.MedicalRecordResponse;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecord;
import com.ocms.online_clinic_management_system.medicalrecord.mapper.MedicalRecordMapper;
import com.ocms.online_clinic_management_system.medicalrecord.repository.MedicalRecordRepository;
import com.ocms.online_clinic_management_system.medicalrecord.service.MedicalRecordService;
import com.ocms.online_clinic_management_system.medicalrecord.validator.MedicalRecordValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MedicalRecordServiceImpl implements MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final MedicalRecordMapper medicalRecordMapper;
    private final MedicalRecordValidator medicalRecordValidator;
    private final SecurityHelper securityHelper;

    @Override
    public MedicalRecordResponse getMedicalRecord(Long appointmentId) {

        Long currentUserId = securityHelper.getCurrentUserId();

        MedicalRecord medicalRecord = medicalRecordValidator.validateMedicalRecordExists(appointmentId);
        medicalRecordValidator.validateDoctorOwnership(medicalRecord, currentUserId);

        return medicalRecordMapper.toMedicalRecordResponse(medicalRecord);
    }

    @Override
    @Transactional
    public MedicalRecordResponse updateMedicalRecord(Long appointmentId, UpdateMedicalRecordRequest request) {

        Long currentUserId = securityHelper.getCurrentUserId();

        MedicalRecord medicalRecord = medicalRecordValidator.validateMedicalRecordExists(appointmentId);
        medicalRecordValidator.validateDoctorOwnership(medicalRecord, currentUserId);
        medicalRecordValidator.validateAppointmentInProgress(medicalRecord);

        medicalRecordMapper.updateMedicalRecord(request, medicalRecord);
        medicalRecordRepository.save(medicalRecord);

        return medicalRecordMapper.toMedicalRecordResponse(medicalRecord);
    }
}