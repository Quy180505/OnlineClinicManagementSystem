package com.ocms.online_clinic_management_system.patient.controller;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.patient.dto.request.UpdateAccountRequest;
import com.ocms.online_clinic_management_system.patient.dto.request.UpdatePatientRequest;
import com.ocms.online_clinic_management_system.patient.dto.response.PatientDetailResponse;
import com.ocms.online_clinic_management_system.patient.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patient")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<PatientDetailResponse>> getMyProfile(){
        return ResponseEntity.ok(ApiResponse.success(patientService.getMyProfile()));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<PatientDetailResponse>> updateProfile(@Valid @RequestBody UpdatePatientRequest request)
    {
        return ResponseEntity.ok(ApiResponse.success(patientService.updateProfile(request)));
    }

    @PutMapping("/account")
    public ResponseEntity<ApiResponse<Void>> updateAccount(@Valid @RequestBody UpdateAccountRequest request){
        patientService.updateAccount(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

}