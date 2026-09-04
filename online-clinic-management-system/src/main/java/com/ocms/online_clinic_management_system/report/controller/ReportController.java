package com.ocms.online_clinic_management_system.report.controller;

import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.report.dto.response.patient.PatientAgeResponse;
import com.ocms.online_clinic_management_system.report.dto.response.patient.PatientGenderResponse;
import com.ocms.online_clinic_management_system.report.dto.response.patient.PatientSpecialtyResponse;
import com.ocms.online_clinic_management_system.report.dto.response.revenue.RevenueBySpecialtyResponse;
import com.ocms.online_clinic_management_system.report.dto.response.revenue.RevenueOverviewResponse;
import com.ocms.online_clinic_management_system.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/revenue/monthly")
    public ResponseEntity<ApiResponse<List<RevenueOverviewResponse>>> getMonthlyRevenue(@RequestParam Integer year) {
        return ResponseEntity.ok(ApiResponse.success(reportService.getMonthlyRevenue(year)));
    }

    @GetMapping("/revenue/quarterly")
    public ResponseEntity<ApiResponse<List<RevenueOverviewResponse>>> getQuarterlyRevenue(@RequestParam Integer year) {
        return ResponseEntity.ok(ApiResponse.success(reportService.getQuarterlyRevenue(year)));
    }

    @GetMapping("/revenue/specialties")
    public ResponseEntity<ApiResponse<List<RevenueBySpecialtyResponse>>> getRevenueBySpecialty(@RequestParam Integer year, @RequestParam(required = false) Integer quarter) {
        return ResponseEntity.ok(ApiResponse.success(reportService.getRevenueBySpecialty(year, quarter)));
    }

    @GetMapping("/patients/age")
    public ResponseEntity<ApiResponse<List<PatientAgeResponse>>> getPatientsByAge(@RequestParam Integer year) {
        return ResponseEntity.ok(ApiResponse.success(reportService.getPatientsByAge(year)));
    }

    @GetMapping("/patients/gender")
    public ResponseEntity<ApiResponse<List<PatientGenderResponse>>> getPatientsByGender(@RequestParam Integer year) {
        return ResponseEntity.ok(ApiResponse.success(reportService.getPatientsByGender(year)));
    }

    @GetMapping("/patients/specialties")
    public ResponseEntity<ApiResponse<List<PatientSpecialtyResponse>>> getPatientsBySpecialty(@RequestParam Integer year) {
        return ResponseEntity.ok(ApiResponse.success(reportService.getPatientsBySpecialty(year)));
    }
}