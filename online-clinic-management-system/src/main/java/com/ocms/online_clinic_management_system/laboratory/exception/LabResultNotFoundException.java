package com.ocms.online_clinic_management_system.laboratory.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class LabResultNotFoundException extends BusinessException {

    public LabResultNotFoundException() {
        super(ErrorCode.LAB_RESULT_NOT_FOUND);
    }
}