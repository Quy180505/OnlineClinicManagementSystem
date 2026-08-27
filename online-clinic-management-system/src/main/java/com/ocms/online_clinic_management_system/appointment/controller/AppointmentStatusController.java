package com.ocms.online_clinic_management_system.appointment.controller;
import com.ocms.online_clinic_management_system.appointment.dto.response.AppointmentStatusResponse;
import com.ocms.online_clinic_management_system.appointment.service.AppointmentStatusService;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/appointment-statuses")
@RequiredArgsConstructor
public class AppointmentStatusController {

    private final AppointmentStatusService appointmentStatusService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AppointmentStatusResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(appointmentStatusService.getAll()));
    }
}