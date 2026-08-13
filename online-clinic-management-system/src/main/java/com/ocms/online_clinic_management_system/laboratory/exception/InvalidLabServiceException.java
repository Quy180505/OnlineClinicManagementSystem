package com.ocms.online_clinic_management_system.laboratory.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvalidLabServiceException extends BusinessException {
    public InvalidLabServiceException() {
        super(ErrorCode.INVALID_LAB_SERVICE);
    }
}