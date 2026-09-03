package com.ocms.online_clinic_management_system.report.repository.projection.impl;

import com.ocms.online_clinic_management_system.report.repository.projection.PatientSpecialtyProjection;

public record PatientSpecialtyProjectionImpl(Long specialtyId, String specialtyName, Long patientCount) implements PatientSpecialtyProjection {

    @Override
    public Long getSpecialtyId() {
        return specialtyId;
    }

    @Override
    public String getSpecialtyName() {
        return specialtyName;
    }

    @Override
    public Long getPatientCount() {
        return patientCount;
    }
}