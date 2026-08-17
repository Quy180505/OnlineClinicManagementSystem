package com.ocms.online_clinic_management_system.prescription.controller;

import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.prescription.dto.request.CreatePrescriptionRequest;
import com.ocms.online_clinic_management_system.prescription.dto.request.PrescriptionSearchRequest;
import com.ocms.online_clinic_management_system.prescription.dto.response.PrescriptionPatientResponse;
import com.ocms.online_clinic_management_system.prescription.dto.response.PrescriptionResponse;
import com.ocms.online_clinic_management_system.prescription.service.PrescriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @PostMapping("/medical-records/{medicalRecordId}")
    public ResponseEntity<ApiResponse<PrescriptionResponse>> createPrescription(@PathVariable Long medicalRecordId, @Valid @RequestBody CreatePrescriptionRequest request) {
        return ResponseEntity.ok(ApiResponse.success(prescriptionService.create(medicalRecordId, request)));
    }

    @GetMapping("/{prescriptionId}")
    public ResponseEntity<ApiResponse<PrescriptionResponse>> getPrescription(@PathVariable Long prescriptionId) {
        return ResponseEntity.ok(ApiResponse.success(prescriptionService.getById(prescriptionId)));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<PageResponse<PrescriptionPatientResponse>>> searchMyPrescriptions(@ModelAttribute PrescriptionSearchRequest request, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(prescriptionService.search(request, pageable)));
    }
    @GetMapping("/my/{prescriptionId}")
    public ResponseEntity<ApiResponse<PrescriptionPatientResponse>> getMyPrescription(@PathVariable Long prescriptionId) {
        return ResponseEntity.ok(ApiResponse.success(prescriptionService.getMyPrescription(prescriptionId)));
    }
}