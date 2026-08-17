package com.ocms.online_clinic_management_system.prescription.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class PrescriptionNotFoundException extends BusinessException {

    public PrescriptionNotFoundException() {
        super(ErrorCode.PRESCRIPTION_NOT_FOUND);
    }
}