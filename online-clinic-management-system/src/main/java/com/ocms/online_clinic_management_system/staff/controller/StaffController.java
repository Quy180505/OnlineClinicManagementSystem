package com.ocms.online_clinic_management_system.staff.controller;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.patient.dto.request.PatientSearchRequest;
import com.ocms.online_clinic_management_system.staff.dto.request.UpdatePatientInformationRequest;
import com.ocms.online_clinic_management_system.staff.dto.response.PatientManagementResponse;
import com.ocms.online_clinic_management_system.staff.service.StaffPatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/staff/patients")
@RequiredArgsConstructor
public class StaffController {

    private final StaffPatientService staffPatientService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<PatientManagementResponse>>> searchPatients(PatientSearchRequest request, Pageable pageable){

        return ResponseEntity.ok(ApiResponse.success(staffPatientService.searchPatients(request, pageable)));
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<ApiResponse<PatientManagementResponse>> getPatient(@PathVariable Long patientId){
        return ResponseEntity.ok(ApiResponse.success(staffPatientService.getPatient(patientId)));
    }

    @PutMapping("/{patientId}")
    public ResponseEntity<ApiResponse<PatientManagementResponse>> updatePatient(@PathVariable Long patientId, @Valid @RequestBody UpdatePatientInformationRequest request)
    {
        return ResponseEntity.ok(ApiResponse.success(staffPatientService.updatePatient(patientId, request)));
    }

}