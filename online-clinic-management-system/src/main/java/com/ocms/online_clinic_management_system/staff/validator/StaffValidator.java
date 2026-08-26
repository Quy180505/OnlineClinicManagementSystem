package com.ocms.online_clinic_management_system.staff.validator;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import com.ocms.online_clinic_management_system.patient.exception.CitizenIdAlreadyExistsException;
import com.ocms.online_clinic_management_system.patient.exception.InvalidCitizenIdException;
import com.ocms.online_clinic_management_system.patient.exception.PatientNotFoundException;
import com.ocms.online_clinic_management_system.patient.repository.PatientRepository;
import com.ocms.online_clinic_management_system.staff.dto.request.UpdatePatientInformationRequest;
import com.ocms.online_clinic_management_system.patient.exception.InvalidEmergencyContactException;
import com.ocms.online_clinic_management_system.user.exception.UserAlreadyExistsException;
import com.ocms.online_clinic_management_system.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
public class StaffValidator {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    public void validateUpdatePatientInformation(Long patientId,UpdatePatientInformationRequest request) {

        validateCitizenId(patientId,request.getCitizenId());
        validateEmergencyContact(request.getEmergencyContact());
        validatePhone(patientId, request.getPhone());
    }

    private void validateCitizenId(Long patientId,String citizenId) {

        if (!StringUtils.hasText(citizenId)) {
            return;
        }

        if (!citizenId.matches("\\d{12}")) {
            throw new InvalidCitizenIdException();
        }

        if (patientRepository.existsByCitizenIdAndIdNot(citizenId, patientId)) {
            throw new CitizenIdAlreadyExistsException();
        }

    }

    private void validateEmergencyContact(String emergencyContact) {

        if (!StringUtils.hasText(emergencyContact)) {
            return;
        }

        if (!emergencyContact.matches("^0\\d{9}$")) {
            throw new InvalidEmergencyContactException();
        }
    }

    private void validatePhone(Long patientId, String phone) {
        if (!StringUtils.hasText(phone)) {
            return;
        }

        Patient patient = patientRepository.findById(patientId).orElseThrow(PatientNotFoundException::new);

        Long userId = patient.getUser().getId();

        if (userRepository.existsByPhoneAndIdNot(phone, userId)) {
            throw new UserAlreadyExistsException(ErrorCode.PHONE_ALREADY_EXISTS);
        }
    }
}