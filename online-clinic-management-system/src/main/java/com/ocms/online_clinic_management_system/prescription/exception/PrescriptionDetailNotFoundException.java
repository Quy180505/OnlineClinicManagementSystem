package com.ocms.online_clinic_management_system.prescription.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class PrescriptionDetailNotFoundException extends BusinessException {

    public PrescriptionDetailNotFoundException() {
        super(ErrorCode.PRESCRIPTION_DETAIL_NOT_FOUND);
    }
}