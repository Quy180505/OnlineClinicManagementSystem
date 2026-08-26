package com.ocms.online_clinic_management_system.doctor.controller;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.doctor.dto.response.DoctorSummaryResponse;
import com.ocms.online_clinic_management_system.doctor.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<DoctorSummaryResponse>>> getAllDoctors(@RequestParam(required = false) String keyword,@ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(doctorService.getAllDoctors(keyword,pageable)));
    }

}