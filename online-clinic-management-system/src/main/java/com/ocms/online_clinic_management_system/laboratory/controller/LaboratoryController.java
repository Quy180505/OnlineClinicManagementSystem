package com.ocms.online_clinic_management_system.laboratory.controller;

import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.laboratory.dto.request.CreateTestOrderRequest;
import com.ocms.online_clinic_management_system.laboratory.dto.request.UpdateLabResultRequest;
import com.ocms.online_clinic_management_system.laboratory.dto.response.LabResultResponse;
import com.ocms.online_clinic_management_system.laboratory.dto.response.PatientLabResultDetailResponse;
import com.ocms.online_clinic_management_system.laboratory.dto.response.PatientLabResultResponse;
import com.ocms.online_clinic_management_system.laboratory.dto.response.TestOrderResponse;
import com.ocms.online_clinic_management_system.laboratory.service.LaboratoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/laboratory")
@RequiredArgsConstructor
public class LaboratoryController {

    private final LaboratoryService laboratoryService;

    @GetMapping("/patient/results")
    public ResponseEntity<ApiResponse<List<PatientLabResultResponse>>> getMyLabResults() {
        return ResponseEntity.ok(ApiResponse.success(laboratoryService.getMyLabResults()));
    }

    @GetMapping("/patient/results/{labResultId}")
    public ResponseEntity<ApiResponse<PatientLabResultDetailResponse>> getMyLabResult(@PathVariable Long labResultId) {
        return ResponseEntity.ok(ApiResponse.success(laboratoryService.getMyLabResult(labResultId)));
    }

    @PostMapping("/medical-records/{medicalRecordId}/test-orders")
    public ResponseEntity<ApiResponse<TestOrderResponse>> createTestOrder(@PathVariable Long medicalRecordId, @Valid @RequestBody CreateTestOrderRequest request) {
        return ResponseEntity.ok(ApiResponse.success(laboratoryService.createTestOrder(medicalRecordId, request)));
    }

    @GetMapping("/test-orders/{testOrderId}")
    public ResponseEntity<ApiResponse<TestOrderResponse>> getTestOrder(@PathVariable Long testOrderId) {
        return ResponseEntity.ok(ApiResponse.success(laboratoryService.getTestOrder(testOrderId)));
    }

    @PatchMapping("/test-orders/{testOrderId}/start")
    public ResponseEntity<ApiResponse<TestOrderResponse>> startTestOrder(@PathVariable Long testOrderId) {
        return ResponseEntity.ok(ApiResponse.success(laboratoryService.startTestOrder(testOrderId)));
    }

    @PatchMapping("/test-order-details/{testOrderDetailId}/result")
    public ResponseEntity<ApiResponse<LabResultResponse>> updateLabResult(@PathVariable Long testOrderDetailId, @Valid @RequestBody UpdateLabResultRequest request) {
        return ResponseEntity.ok(ApiResponse.success(laboratoryService.updateLabResult(testOrderDetailId, request)));
    }

    @GetMapping("/test-order-details/{testOrderDetailId}/result")
    public ResponseEntity<ApiResponse<LabResultResponse>> getLabResult(@PathVariable Long testOrderDetailId) {
        return ResponseEntity.ok(ApiResponse.success(laboratoryService.getLabResult(testOrderDetailId)));
    }

}