package com.ocms.online_clinic_management_system.specialty.controller;

import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.specialty.dto.request.CreateSpecialtyRequest;
import com.ocms.online_clinic_management_system.specialty.dto.request.UpdateSpecialtyRequest;
import com.ocms.online_clinic_management_system.specialty.dto.response.SpecialtyDetailResponse;
import com.ocms.online_clinic_management_system.specialty.dto.response.SpecialtyResponse;
import com.ocms.online_clinic_management_system.specialty.service.SpecialtyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specialties")
@RequiredArgsConstructor
public class SpecialtyController {

    private final SpecialtyService specialtyService;


    @GetMapping("/all")
    public ApiResponse<List<SpecialtyResponse>> getAllSpecialties() {
        return ApiResponse.success(specialtyService.getAll());
    }
    @PostMapping
    public ApiResponse<SpecialtyResponse> create(@Valid @RequestBody CreateSpecialtyRequest request) {

        return ApiResponse.success(specialtyService.create(request));
    }

    @PutMapping("/{specialtyId}")
    public ApiResponse<SpecialtyResponse> update(@PathVariable Long specialtyId, @Valid @RequestBody UpdateSpecialtyRequest request) {

        return ApiResponse.success(specialtyService.update(specialtyId, request));
    }

    @PatchMapping("/{specialtyId}")
    public ApiResponse<SpecialtyResponse> partialUpdate(@PathVariable Long specialtyId, @RequestBody UpdateSpecialtyRequest request) {
        return ApiResponse.success(specialtyService.partialUpdate(specialtyId, request));
    }

    @DeleteMapping("/{specialtyId}")
    public ApiResponse<Void> delete(@PathVariable Long specialtyId) {
        specialtyService.delete(specialtyId);
        return ApiResponse.success();
    }

    @GetMapping("/{specialtyId}")
    public ApiResponse<SpecialtyDetailResponse> getById(@PathVariable Long specialtyId) {
        return ApiResponse.success(specialtyService.getById(specialtyId));
    }

    @GetMapping
    public ApiResponse<PageResponse<SpecialtyResponse>> getAll(@RequestParam(required = false) String keyword,
                                                               @RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "10") int size,
                                                               @RequestParam(defaultValue = "name") String sortBy,
                                                               @RequestParam(defaultValue = "asc") String direction) {
        return ApiResponse.success(specialtyService.getAll(keyword, page, size, sortBy, direction));
    }

}