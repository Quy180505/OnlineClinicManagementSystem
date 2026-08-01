package com.ocms.online_clinic_management_system.patient.service;

import com.ocms.online_clinic_management_system.patient.dto.request.UpdatePatientRequest;
import com.ocms.online_clinic_management_system.patient.dto.response.PatientResponse;
import com.ocms.online_clinic_management_system.user.entity.User;

public interface PatientService {

    void createPatient(User user);

    PatientResponse update(Long patientId, UpdatePatientRequest request);

    PatientResponse findById(Long patientId);

}