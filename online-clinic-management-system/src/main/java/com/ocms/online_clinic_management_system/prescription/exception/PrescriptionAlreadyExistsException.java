package com.ocms.online_clinic_management_system.prescription.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class PrescriptionAlreadyExistsException extends BusinessException {

    public PrescriptionAlreadyExistsException() {
        super(ErrorCode.PRESCRIPTION_ALREADY_EXISTS);
    }
}