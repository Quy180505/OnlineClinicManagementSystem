package com.ocms.online_clinic_management_system.schedule.controller;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.schedule.dto.request.CreateDoctorScheduleRequest;
import com.ocms.online_clinic_management_system.schedule.dto.request.DoctorScheduleSearchRequest;
import com.ocms.online_clinic_management_system.schedule.dto.request.UpdateDoctorScheduleRequest;
import com.ocms.online_clinic_management_system.schedule.dto.response.DoctorScheduleDetailResponse;
import com.ocms.online_clinic_management_system.schedule.dto.response.DoctorScheduleResponse;
import com.ocms.online_clinic_management_system.schedule.service.DoctorScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctor-schedules")
@RequiredArgsConstructor
public class DoctorScheduleController {

    private final DoctorScheduleService doctorScheduleService;

    @PostMapping
    public ResponseEntity<ApiResponse<DoctorScheduleDetailResponse>> create(@Valid @RequestBody CreateDoctorScheduleRequest request) {
        return ResponseEntity.ok(ApiResponse.success(doctorScheduleService.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DoctorScheduleDetailResponse>> update(@PathVariable Long id, @Valid @RequestBody UpdateDoctorScheduleRequest request) {
        return ResponseEntity.ok(ApiResponse.success(doctorScheduleService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        doctorScheduleService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DoctorScheduleDetailResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(doctorScheduleService.getById(id)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<DoctorScheduleResponse>>> getAll(@ParameterObject DoctorScheduleSearchRequest request, @ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(doctorScheduleService.getAll(request, pageable)));
    }

    @GetMapping("/future")
    public ResponseEntity<ApiResponse<PageResponse<DoctorScheduleResponse>>> getFuture(@ParameterObject DoctorScheduleSearchRequest request, @ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(doctorScheduleService.getFuture(request, pageable)));
    }

}