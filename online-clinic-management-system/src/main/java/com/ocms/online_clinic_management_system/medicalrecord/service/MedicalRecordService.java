package com.ocms.online_clinic_management_system.medicalrecord.service;

import com.ocms.online_clinic_management_system.medicalrecord.dto.request.UpdateMedicalRecordRequest;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.MedicalRecordResponse;

public interface MedicalRecordService {

    MedicalRecordResponse getMedicalRecord(Long appointmentId);

    MedicalRecordResponse updateMedicalRecord(Long appointmentId, UpdateMedicalRecordRequest request);
}