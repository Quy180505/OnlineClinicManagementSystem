package com.ocms.online_clinic_management_system.patient.service.impl;


import com.ocms.online_clinic_management_system.patient.dto.request.UpdatePatientRequest;
import com.ocms.online_clinic_management_system.patient.dto.response.PatientResponse;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import com.ocms.online_clinic_management_system.patient.exception.PatientNotFoundException;
import com.ocms.online_clinic_management_system.patient.mapper.PatientMapper;
import com.ocms.online_clinic_management_system.patient.repository.PatientRepository;
import com.ocms.online_clinic_management_system.patient.service.PatientService;
import com.ocms.online_clinic_management_system.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;

    @Override
    public void createPatient(User user) {
        Patient patient = Patient.builder().user(user).build();
        patientRepository.save(patient);
    }

    @Override
    public PatientResponse update(Long patientId, UpdatePatientRequest request) {
        Patient patient = findEntity(patientId);
        patientMapper.updatePatientFromRequest(request, patient);

        return patientMapper.toPatientResponse(patient);
    }


    @Override
    @Transactional(readOnly = true)
    public PatientResponse findById(Long patientId) {
        return patientMapper.toPatientResponse(findEntity(patientId));
    }


    private Patient findEntity(Long id) {
        return patientRepository.findById(id).orElseThrow(PatientNotFoundException::new);
    }


}