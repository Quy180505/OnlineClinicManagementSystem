package com.ocms.online_clinic_management_system.patient.service;
import com.ocms.online_clinic_management_system.patient.dto.request.UpdateAccountRequest;
import com.ocms.online_clinic_management_system.patient.dto.request.UpdatePatientRequest;
import com.ocms.online_clinic_management_system.patient.dto.response.PatientDetailResponse;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import com.ocms.online_clinic_management_system.user.entity.User;

public interface PatientService {

    void createPatient(User user);
    PatientDetailResponse getMyProfile();
    PatientDetailResponse updateProfile(UpdatePatientRequest request);
    void updateAccount(UpdateAccountRequest request);
    Patient getCurrentPatient();
}