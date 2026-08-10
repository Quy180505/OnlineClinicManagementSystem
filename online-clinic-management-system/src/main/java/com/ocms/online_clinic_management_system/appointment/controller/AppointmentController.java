package com.ocms.online_clinic_management_system.appointment.controller;

import com.ocms.online_clinic_management_system.appointment.dto.request.AppointmentSearchRequest;
import com.ocms.online_clinic_management_system.appointment.dto.request.CreateAppointmentRequest;
import com.ocms.online_clinic_management_system.appointment.dto.response.AppointmentDetailResponse;
import com.ocms.online_clinic_management_system.appointment.dto.response.AppointmentResponse;
import com.ocms.online_clinic_management_system.appointment.service.AppointmentService;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<AppointmentResponse>> create(@Valid @RequestBody CreateAppointmentRequest request) {
        return ResponseEntity.ok(ApiResponse.success(appointmentService.create(request)));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<PageResponse<AppointmentResponse>>> getMyAppointments(@ParameterObject AppointmentSearchRequest request, @ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(appointmentService.getMyAppointments(request, pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AppointmentDetailResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(appointmentService.getById(id)));
    }


    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<AppointmentResponse>>> search(@ParameterObject AppointmentSearchRequest request, @ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(appointmentService.search(request, pageable)));
    }


    @PatchMapping("/{id}/confirm")
    public ResponseEntity<ApiResponse<AppointmentResponse>> confirm(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(appointmentService.confirm(id)));
    }


    @PatchMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<AppointmentResponse>> reject(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(appointmentService.reject(id)));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<AppointmentResponse>> cancel(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(appointmentService.cancel(id)));
    }



}