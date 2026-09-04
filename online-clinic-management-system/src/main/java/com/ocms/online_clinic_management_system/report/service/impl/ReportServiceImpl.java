package com.ocms.online_clinic_management_system.report.service.impl;
import com.ocms.online_clinic_management_system.report.dto.response.patient.PatientAgeResponse;
import com.ocms.online_clinic_management_system.report.dto.response.patient.PatientGenderResponse;
import com.ocms.online_clinic_management_system.report.dto.response.patient.PatientSpecialtyResponse;
import com.ocms.online_clinic_management_system.report.dto.response.revenue.RevenueBySpecialtyResponse;
import com.ocms.online_clinic_management_system.report.dto.response.revenue.RevenueOverviewResponse;
import com.ocms.online_clinic_management_system.report.mapper.ReportMapper;
import com.ocms.online_clinic_management_system.report.repository.ReportRepository;
import com.ocms.online_clinic_management_system.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final ReportMapper reportMapper;

    @Override
    public List<RevenueOverviewResponse> getMonthlyRevenue(Integer year) {
        return reportRepository.findMonthlyRevenue(year).stream().map(reportMapper::toRevenueOverviewResponse).toList();
    }

    @Override
    public List<RevenueOverviewResponse> getQuarterlyRevenue(Integer year) {
        return reportRepository.findQuarterlyRevenue(year).stream().map(reportMapper::toRevenueOverviewResponse).toList();
    }

    @Override
    public List<RevenueBySpecialtyResponse> getRevenueBySpecialty(Integer year, Integer quarter) {
        return reportRepository.findRevenueBySpecialty(year, quarter).stream().map(reportMapper::toRevenueBySpecialtyResponse).toList();
    }

    @Override
    public List<PatientAgeResponse> getPatientsByAge(Integer year) {
        return reportRepository.findPatientsByAge(year).stream().map(reportMapper::toPatientAgeResponse).toList();
    }

    @Override
    public List<PatientGenderResponse> getPatientsByGender(Integer year) {
        return reportRepository.findPatientsByGender(year).stream().map(reportMapper::toPatientGenderResponse).toList();
    }

    @Override
    public List<PatientSpecialtyResponse> getPatientsBySpecialty(Integer year) {
        return reportRepository.findPatientsBySpecialty(year).stream().map(reportMapper::toPatientSpecialtyResponse).toList();
    }
}