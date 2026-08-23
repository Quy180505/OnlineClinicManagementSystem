package com.ocms.online_clinic_management_system.prescription.service;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.prescription.dto.request.CreatePrescriptionRequest;
import com.ocms.online_clinic_management_system.prescription.dto.request.PrescriptionSearchRequest;
import com.ocms.online_clinic_management_system.prescription.dto.response.PrescriptionPatientResponse;
import com.ocms.online_clinic_management_system.prescription.dto.response.PrescriptionResponse;
import org.springframework.data.domain.Pageable;

public interface PrescriptionService {

    PrescriptionResponse create(Long medicalRecordId, CreatePrescriptionRequest request);
    PrescriptionResponse getById(Long prescriptionId);
    PrescriptionPatientResponse getMyPrescription(Long prescriptionId);
    PageResponse<PrescriptionPatientResponse> search(PrescriptionSearchRequest request, Pageable pageable);
}