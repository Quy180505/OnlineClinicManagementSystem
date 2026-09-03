package com.ocms.online_clinic_management_system.report.repository;
import com.ocms.online_clinic_management_system.report.repository.projection.*;
import java.util.List;

public interface ReportRepository {
    List<RevenueOverviewProjection> findMonthlyRevenue(Integer year);
    List<RevenueOverviewProjection> findQuarterlyRevenue(Integer year);
    List<RevenueBySpecialtyProjection> findRevenueBySpecialty(Integer year, Integer quarter);
    List<PatientAgeProjection> findPatientsByAge(Integer year);
    List<PatientGenderProjection> findPatientsByGender(Integer year);
    List<PatientSpecialtyProjection> findPatientsBySpecialty(Integer year);
}