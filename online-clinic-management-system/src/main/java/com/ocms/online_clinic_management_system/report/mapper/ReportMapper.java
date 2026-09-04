package com.ocms.online_clinic_management_system.report.mapper;

import com.ocms.online_clinic_management_system.report.dto.response.patient.PatientAgeResponse;
import com.ocms.online_clinic_management_system.report.dto.response.patient.PatientGenderResponse;
import com.ocms.online_clinic_management_system.report.dto.response.patient.PatientSpecialtyResponse;
import com.ocms.online_clinic_management_system.report.dto.response.revenue.RevenueBySpecialtyResponse;
import com.ocms.online_clinic_management_system.report.dto.response.revenue.RevenueOverviewResponse;
import com.ocms.online_clinic_management_system.report.repository.projection.*;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReportMapper {
    RevenueOverviewResponse toRevenueOverviewResponse(RevenueOverviewProjection projection);
    RevenueBySpecialtyResponse toRevenueBySpecialtyResponse(RevenueBySpecialtyProjection projection);
    PatientAgeResponse toPatientAgeResponse(PatientAgeProjection projection);
    PatientGenderResponse toPatientGenderResponse(PatientGenderProjection projection);
    PatientSpecialtyResponse toPatientSpecialtyResponse(PatientSpecialtyProjection projection);
}