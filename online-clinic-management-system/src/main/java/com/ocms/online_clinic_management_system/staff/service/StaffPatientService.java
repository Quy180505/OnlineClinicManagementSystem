package com.ocms.online_clinic_management_system.staff.service;

import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.patient.dto.request.PatientSearchRequest;
import com.ocms.online_clinic_management_system.staff.dto.request.UpdatePatientInformationRequest;
import com.ocms.online_clinic_management_system.staff.dto.response.PatientManagementResponse;
import org.springframework.data.domain.Pageable;
public interface StaffPatientService {

    PageResponse<PatientManagementResponse> searchPatients(PatientSearchRequest request,  Pageable pageable);

    PatientManagementResponse getPatient(Long patientId);

    PatientManagementResponse updatePatient(Long patientId, UpdatePatientInformationRequest request);
}
