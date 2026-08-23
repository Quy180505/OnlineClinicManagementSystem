package com.ocms.online_clinic_management_system.prescription.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class PrescriptionAccessDeniedException extends BusinessException {

    public PrescriptionAccessDeniedException() {
        super(ErrorCode.PRESCRIPTION_ACCESS_DENIED);
    }
}