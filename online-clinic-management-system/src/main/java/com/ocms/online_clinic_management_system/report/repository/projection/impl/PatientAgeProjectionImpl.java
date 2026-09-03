package com.ocms.online_clinic_management_system.report.repository.projection.impl;

import com.ocms.online_clinic_management_system.report.repository.projection.PatientAgeProjection;

public record PatientAgeProjectionImpl(String ageGroup, Long patientCount) implements PatientAgeProjection {

    @Override
    public String getAgeGroup() {
        return ageGroup;
    }

    @Override
    public Long getPatientCount() {
        return patientCount;
    }
}