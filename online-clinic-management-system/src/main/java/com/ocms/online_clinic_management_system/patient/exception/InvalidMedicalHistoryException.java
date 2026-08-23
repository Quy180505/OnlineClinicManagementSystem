package com.ocms.online_clinic_management_system.patient.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvalidMedicalHistoryException extends BusinessException {

    public InvalidMedicalHistoryException() {
        super(ErrorCode.INVALID_MEDICAL_HISTORY);
    }

}