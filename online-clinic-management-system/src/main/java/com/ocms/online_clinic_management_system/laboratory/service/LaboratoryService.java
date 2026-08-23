package com.ocms.online_clinic_management_system.laboratory.service;
import com.ocms.online_clinic_management_system.laboratory.dto.request.CreateTestOrderRequest;
import com.ocms.online_clinic_management_system.laboratory.dto.request.UpdateLabResultRequest;
import com.ocms.online_clinic_management_system.laboratory.dto.response.LabResultResponse;
import com.ocms.online_clinic_management_system.laboratory.dto.response.PatientLabResultDetailResponse;
import com.ocms.online_clinic_management_system.laboratory.dto.response.PatientLabResultResponse;
import com.ocms.online_clinic_management_system.laboratory.dto.response.TestOrderResponse;
import java.util.List;

public interface LaboratoryService {

    TestOrderResponse createTestOrder(Long medicalRecordId, CreateTestOrderRequest request);
    TestOrderResponse getTestOrder(Long testOrderId);
    LabResultResponse updateLabResult(Long testOrderDetailId, UpdateLabResultRequest request);
    TestOrderResponse startTestOrder(Long testOrderId);
    LabResultResponse getLabResult(Long testOrderDetailId);
    List<PatientLabResultResponse> getMyLabResults();
    PatientLabResultDetailResponse getMyLabResult(Long labResultId);
}