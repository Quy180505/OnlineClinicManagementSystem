package com.ocms.online_clinic_management_system.staff.service.impl;
import com.ocms.online_clinic_management_system.common.event.DomainEventPublisher;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.patient.dto.request.PatientSearchRequest;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import com.ocms.online_clinic_management_system.patient.event.PatientUpdateEvent;
import com.ocms.online_clinic_management_system.patient.exception.PatientNotFoundException;
import com.ocms.online_clinic_management_system.patient.repository.PatientRepository;
import com.ocms.online_clinic_management_system.patient.specification.PatientSpecification;
import com.ocms.online_clinic_management_system.staff.dto.request.UpdatePatientInformationRequest;
import com.ocms.online_clinic_management_system.staff.dto.response.PatientManagementResponse;
import com.ocms.online_clinic_management_system.staff.mapper.StaffMapper;
import com.ocms.online_clinic_management_system.staff.service.StaffPatientService;
import com.ocms.online_clinic_management_system.staff.validator.StaffValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class StaffPatientServiceImpl implements StaffPatientService {

    private final PatientRepository patientRepository;
    private final StaffMapper staffMapper;
    private final StaffValidator staffValidator;
    private final DomainEventPublisher eventPublisher;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<PatientManagementResponse> searchPatients(PatientSearchRequest request, Pageable pageable) {
        Page<Patient> page = patientRepository.findAll(PatientSpecification.search(request), pageable);
        return PageResponse.of(page.map(staffMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public PatientManagementResponse getPatient(Long patientId) {
        return staffMapper.toResponse(findPatient(patientId));
    }

    @Override
    public PatientManagementResponse updatePatient(Long patientId, UpdatePatientInformationRequest request) {

        staffValidator.validateUpdatePatientInformation(request);
        Patient patient = findPatient(patientId);
        staffMapper.updatePatientInformation(request, patient);
        patientRepository.save(patient);
        eventPublisher.publish(new PatientUpdateEvent(patient.getId(), patient.getUser().getId()));
        return staffMapper.toResponse(patient);
    }

    private Patient findPatient(Long patientId) {
        return patientRepository.findById(patientId).orElseThrow(PatientNotFoundException::new);
    }
}