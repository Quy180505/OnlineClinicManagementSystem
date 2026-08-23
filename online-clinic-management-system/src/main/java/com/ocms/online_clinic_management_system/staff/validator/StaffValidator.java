package com.ocms.online_clinic_management_system.staff.validator;
import com.ocms.online_clinic_management_system.patient.exception.InvalidCitizenIdException;
import com.ocms.online_clinic_management_system.staff.dto.request.UpdatePatientInformationRequest;
import com.ocms.online_clinic_management_system.patient.exception.InvalidEmergencyContactException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class StaffValidator {

    public void validateUpdatePatientInformation(UpdatePatientInformationRequest request) {

        validateCitizenId(request.getCitizenId());
        validateEmergencyContact(request.getEmergencyContact());
    }

    private void validateCitizenId(String citizenId) {

        if (!StringUtils.hasText(citizenId)) {
            return;
        }

        if (!citizenId.matches("\\d{12}")) {
            throw new InvalidCitizenIdException();
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
}