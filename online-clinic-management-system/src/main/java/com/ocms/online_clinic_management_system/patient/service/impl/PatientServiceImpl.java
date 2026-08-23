package com.ocms.online_clinic_management_system.patient.service.impl;
import com.ocms.online_clinic_management_system.auth.security.UserPrincipal;
import com.ocms.online_clinic_management_system.common.event.DomainEventPublisher;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;
import com.ocms.online_clinic_management_system.patient.dto.request.UpdateAccountRequest;
import com.ocms.online_clinic_management_system.patient.dto.request.UpdatePatientRequest;
import com.ocms.online_clinic_management_system.patient.dto.response.PatientDetailResponse;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import com.ocms.online_clinic_management_system.patient.event.PatientUpdateEvent;
import com.ocms.online_clinic_management_system.patient.exception.PatientNotFoundException;
import com.ocms.online_clinic_management_system.patient.mapper.PatientMapper;
import com.ocms.online_clinic_management_system.patient.repository.PatientRepository;
import com.ocms.online_clinic_management_system.patient.service.PatientService;
import com.ocms.online_clinic_management_system.patient.validator.PatientValidator;
import com.ocms.online_clinic_management_system.user.entity.User;
import com.ocms.online_clinic_management_system.user.exception.UserAlreadyExistsException;
import com.ocms.online_clinic_management_system.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
@Transactional
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final PatientMapper patientMapper;
    private final PatientValidator patientValidator;
    private final PasswordEncoder passwordEncoder;
    private final DomainEventPublisher eventPublisher;

    @Override
    public void createPatient(User user) {
        Patient patient = Patient.builder().user(user).build();
        patientRepository.save(patient);
    }

    @Override
    @Transactional(readOnly = true)
    public PatientDetailResponse getMyProfile() {
        return patientMapper.toDetailResponse(getCurrentPatient());
    }

    @Override
    public PatientDetailResponse updateProfile(UpdatePatientRequest request) {

        patientValidator.validateUpdate(request);
        Patient patient = getCurrentPatient();
        patientMapper.updatePatientFromRequest(request, patient);
        eventPublisher.publish(new PatientUpdateEvent(patient.getId(), patient.getUser().getId()));

        return patientMapper.toDetailResponse(patient);
    }

    @Override
    public void updateAccount(UpdateAccountRequest request) {

        patientValidator.validateAccount(request);

        User user = getCurrentPatient().getUser();

        if (StringUtils.hasText(request.getUsername())) {

            if (!request.getUsername().equals(user.getUsername()) && userRepository.existsByUsername(request.getUsername())) {
                throw new UserAlreadyExistsException(ErrorCode.USERNAME_ALREADY_EXISTS);
            }

            user.setUsername(request.getUsername());
        }

        if (request.getGender() != null) {
            user.setGender(request.getGender());
        }

        if (StringUtils.hasText(request.getNewPassword())) {
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        }
    }


    @Override
    @Transactional(readOnly = true)
    public Patient getCurrentPatient() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        return patientRepository.findByUserId(principal.getId()).orElseThrow(PatientNotFoundException::new);
    }
}