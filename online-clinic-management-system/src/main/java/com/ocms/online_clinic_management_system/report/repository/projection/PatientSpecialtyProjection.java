package com.ocms.online_clinic_management_system.report.repository.projection;

public interface PatientSpecialtyProjection {
    Long getSpecialtyId();
    String getSpecialtyName();
    Long getPatientCount();
}