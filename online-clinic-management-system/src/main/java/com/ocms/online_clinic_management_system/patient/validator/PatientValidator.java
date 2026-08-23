package com.ocms.online_clinic_management_system.patient.validator;
import com.ocms.online_clinic_management_system.patient.dto.request.UpdateAccountRequest;
import com.ocms.online_clinic_management_system.patient.dto.request.UpdatePatientRequest;
import com.ocms.online_clinic_management_system.patient.exception.InvalidAllergyInfoException;
import com.ocms.online_clinic_management_system.patient.exception.InvalidCitizenIdException;
import com.ocms.online_clinic_management_system.patient.exception.InvalidEmergencyContactException;
import com.ocms.online_clinic_management_system.patient.exception.InvalidMedicalHistoryException;
import com.ocms.online_clinic_management_system.patient.exception.PasswordNotMatchException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class PatientValidator {

    public void validateUpdate(UpdatePatientRequest request) {
        validateCitizenId(request.getCitizenId());
        validateEmergencyContact(request.getEmergencyContact());
        validateMedicalHistory(request.getMedicalHistory());
        validateAllergyInfo(request.getAllergyInfo());
    }

    public void validateAccount(UpdateAccountRequest request) {

        String newPassword = request.getNewPassword();
        String confirmPassword = request.getConfirmPassword();

        if (!StringUtils.hasText(newPassword) && !StringUtils.hasText(confirmPassword)) {
            return;
        }

        if (!StringUtils.hasText(newPassword) || !StringUtils.hasText(confirmPassword)) {
            throw new PasswordNotMatchException();
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new PasswordNotMatchException();
        }
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

    private void validateMedicalHistory(String medicalHistory) {

        if (medicalHistory == null) {
            return;
        }

        if (medicalHistory.length() > 5000) {
            throw new InvalidMedicalHistoryException();
        }
    }

    private void validateAllergyInfo(String allergyInfo) {

        if (allergyInfo == null) {
            return;
        }

        if (allergyInfo.length() > 1000) {
            throw new InvalidAllergyInfoException();
        }
    }
}