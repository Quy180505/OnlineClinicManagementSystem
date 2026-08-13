package com.ocms.online_clinic_management_system.service.controller;

import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.service.dto.request.CreateMedicalServiceRequest;
import com.ocms.online_clinic_management_system.service.dto.request.PatchMedicalServiceRequest;
import com.ocms.online_clinic_management_system.service.dto.request.UpdateMedicalServiceRequest;
import com.ocms.online_clinic_management_system.service.dto.response.MedicalServiceDetailResponse;
import com.ocms.online_clinic_management_system.service.dto.response.MedicalServiceResponse;
import com.ocms.online_clinic_management_system.service.service.MedicalServiceService;
import com.ocms.online_clinic_management_system.specialty.dto.request.UpdateSpecialtyRequest;
import com.ocms.online_clinic_management_system.specialty.dto.response.SpecialtyResponse;
import com.ocms.online_clinic_management_system.specialty.service.SpecialtyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-services")
@RequiredArgsConstructor
public class MedicalServiceController {

    private final MedicalServiceService medicalServiceService;

    @GetMapping("/specialty/{specialtyId}/examination")
    public ApiResponse<List<MedicalServiceResponse>> getExaminationServicesBySpecialty(@PathVariable Long specialtyId) {
        return ApiResponse.success(medicalServiceService.getExaminationServicesBySpecialty(specialtyId));
    }

    @GetMapping("/specialty/{specialtyId}")
    public ApiResponse<List<MedicalServiceResponse>> getBySpecialty(@PathVariable Long specialtyId) {
        return ApiResponse.success(medicalServiceService.getBySpecialty(specialtyId));
    }

    @PostMapping
    public ApiResponse<MedicalServiceResponse> create(@Valid @RequestBody CreateMedicalServiceRequest request) {
        return ApiResponse.success(medicalServiceService.create(request));
    }

    @PutMapping("/{medicalServiceId}")
    public ApiResponse<MedicalServiceResponse> update(@PathVariable Long medicalServiceId, @Valid @RequestBody UpdateMedicalServiceRequest request) {
        return ApiResponse.success(medicalServiceService.update(medicalServiceId, request));
    }
    @PatchMapping("/{medicalServiceId}")
    public ApiResponse<MedicalServiceResponse> partialUpdate(@PathVariable Long medicalServiceId, @RequestBody PatchMedicalServiceRequest request) {
        return ApiResponse.success(medicalServiceService.partialUpdate(medicalServiceId, request)
        );
    }

    @DeleteMapping("/{medicalServiceId}")
    public ApiResponse<Void> delete(@PathVariable Long medicalServiceId) {

        medicalServiceService.delete(medicalServiceId);

        return ApiResponse.success();
    }

    @GetMapping("/{medicalServiceId}")
    public ApiResponse<MedicalServiceDetailResponse> getById(@PathVariable Long medicalServiceId) {

        return ApiResponse.success(medicalServiceService.getById(medicalServiceId));
    }

    @GetMapping
    public ApiResponse<PageResponse<MedicalServiceResponse>> getAll(@RequestParam(required = false) String keyword,
                                                                    @RequestParam(required = false) Long specialtyId,
                                                                    @RequestParam(defaultValue = "0") int page,
                                                                    @RequestParam(defaultValue = "10") int size,
                                                                    @RequestParam(defaultValue = "serviceName") String sortBy,
                                                                    @RequestParam(defaultValue = "asc") String direction) {
        return ApiResponse.success(medicalServiceService.getAll(keyword, specialtyId, page, size, sortBy, direction));
    }

}