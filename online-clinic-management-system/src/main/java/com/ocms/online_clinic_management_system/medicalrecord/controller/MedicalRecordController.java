package com.ocms.online_clinic_management_system.medicalrecord.controller;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.request.UpdateMedicalRecordRequest;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.MedicalRecordResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.PatientMedicalHistoryDetailResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.PatientMedicalHistoryResponse;
import com.ocms.online_clinic_management_system.medicalrecord.service.MedicalRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<MedicalRecordResponse> getMedicalRecord(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(medicalRecordService.getMedicalRecord(appointmentId));
    }

    @PatchMapping("/appointment/{appointmentId}")
    public ResponseEntity<MedicalRecordResponse> updateMedicalRecord(@PathVariable Long appointmentId, @Valid @RequestBody UpdateMedicalRecordRequest request) {
        return ResponseEntity.ok(medicalRecordService.updateMedicalRecord(appointmentId, request));
    }

    @GetMapping("/my-history")
    public ResponseEntity<ApiResponse<List<PatientMedicalHistoryResponse>>> getMyMedicalHistory() {
        return ResponseEntity.ok(ApiResponse.success(medicalRecordService.getMyMedicalHistory()));
    }

    @GetMapping("/my-history/{medicalRecordId}")
    public ResponseEntity<ApiResponse<PatientMedicalHistoryDetailResponse>> getMyMedicalHistoryDetail(@PathVariable Long medicalRecordId) {
        return ResponseEntity.ok(ApiResponse.success(medicalRecordService.getMyMedicalHistoryDetail(medicalRecordId)));
    }
}