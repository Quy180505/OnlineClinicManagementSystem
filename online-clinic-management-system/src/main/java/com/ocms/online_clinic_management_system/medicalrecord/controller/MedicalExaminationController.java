
package com.ocms.online_clinic_management_system.medicalrecord.controller;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.MedicalExaminationResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.TodayAppointmentResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.TreatmentHistoryResponse;
import com.ocms.online_clinic_management_system.medicalrecord.service.MedicalExaminationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/medical-examinations")
@RequiredArgsConstructor
public class MedicalExaminationController {

    private final MedicalExaminationService medicalExaminationService;

    @GetMapping("/today")
    public ResponseEntity<ApiResponse<List<TodayAppointmentResponse>>> getTodayAppointments(@RequestParam LocalDate workDate) {
        return ResponseEntity.ok(ApiResponse.success(medicalExaminationService.getTodayAppointments(workDate)));
    }

    @PatchMapping("/{appointmentId}/start")
    public ResponseEntity<ApiResponse<MedicalExaminationResponse>> startMedicalExamination(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(ApiResponse.success(medicalExaminationService.startMedicalExamination(appointmentId)));
    }

    @GetMapping("/{appointmentId}/treatment-history")
    public ResponseEntity<ApiResponse<List<TreatmentHistoryResponse>>> getTreatmentHistory(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(ApiResponse.success(medicalExaminationService.getTreatmentHistory(appointmentId)));
    }
}
