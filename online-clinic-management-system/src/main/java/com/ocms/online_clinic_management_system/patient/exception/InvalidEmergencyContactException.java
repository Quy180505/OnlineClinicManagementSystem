package com.ocms.online_clinic_management_system.patient.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvalidEmergencyContactException extends BusinessException {

    public InvalidEmergencyContactException() {
        super(ErrorCode.INVALID_EMERGENCY_CONTACT);
    }

}