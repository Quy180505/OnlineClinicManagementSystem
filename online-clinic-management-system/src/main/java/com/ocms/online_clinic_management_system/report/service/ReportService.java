package com.ocms.online_clinic_management_system.report.service;

import com.ocms.online_clinic_management_system.report.dto.response.patient.PatientAgeResponse;
import com.ocms.online_clinic_management_system.report.dto.response.patient.PatientGenderResponse;
import com.ocms.online_clinic_management_system.report.dto.response.patient.PatientSpecialtyResponse;
import com.ocms.online_clinic_management_system.report.dto.response.revenue.RevenueBySpecialtyResponse;
import com.ocms.online_clinic_management_system.report.dto.response.revenue.RevenueOverviewResponse;

import java.util.List;

public interface ReportService {
    List<RevenueOverviewResponse> getMonthlyRevenue(Integer year);
    List<RevenueOverviewResponse> getQuarterlyRevenue(Integer year);
    List<RevenueBySpecialtyResponse> getRevenueBySpecialty(Integer year,Integer quarter);
    List<PatientAgeResponse> getPatientsByAge(Integer year);
    List<PatientGenderResponse> getPatientsByGender(Integer year);
    List<PatientSpecialtyResponse> getPatientsBySpecialty(Integer year);
}