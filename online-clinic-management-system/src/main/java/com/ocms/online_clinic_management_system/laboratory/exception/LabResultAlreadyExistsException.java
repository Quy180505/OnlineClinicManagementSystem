package com.ocms.online_clinic_management_system.laboratory.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class LabResultAlreadyExistsException extends BusinessException {

    public LabResultAlreadyExistsException() {
        super(ErrorCode.LAB_RESULT_ALREADY_EXISTS);
    }
}