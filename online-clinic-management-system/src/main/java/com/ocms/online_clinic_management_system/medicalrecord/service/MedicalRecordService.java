package com.ocms.online_clinic_management_system.medicalrecord.service;
import com.ocms.online_clinic_management_system.medicalrecord.dto.request.UpdateMedicalRecordRequest;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.MedicalRecordResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.PatientMedicalHistoryDetailResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.PatientMedicalHistoryResponse;
import java.util.List;

public interface MedicalRecordService {

    MedicalRecordResponse getMedicalRecord(Long appointmentId);
    MedicalRecordResponse updateMedicalRecord(Long appointmentId, UpdateMedicalRecordRequest request);
    List<PatientMedicalHistoryResponse> getMyMedicalHistory();
    PatientMedicalHistoryDetailResponse getMyMedicalHistoryDetail(Long medicalRecordId);
}