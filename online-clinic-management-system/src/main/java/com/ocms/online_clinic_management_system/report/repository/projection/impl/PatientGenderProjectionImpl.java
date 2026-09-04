package com.ocms.online_clinic_management_system.report.repository.projection.impl;

import com.ocms.online_clinic_management_system.report.repository.projection.PatientGenderProjection;

public record PatientGenderProjectionImpl(String gender, Long patientCount) implements PatientGenderProjection {

    @Override
    public String getGender() {
        return gender;
    }

    @Override
    public Long getPatientCount() {
        return patientCount;
    }
}