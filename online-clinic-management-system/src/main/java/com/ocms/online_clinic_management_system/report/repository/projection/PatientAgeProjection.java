package com.ocms.online_clinic_management_system.report.repository.projection;

public interface PatientAgeProjection {
    String getAgeGroup();
    Long getPatientCount();
}