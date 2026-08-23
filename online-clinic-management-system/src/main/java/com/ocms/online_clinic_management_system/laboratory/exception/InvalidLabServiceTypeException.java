package com.ocms.online_clinic_management_system.laboratory.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvalidLabServiceTypeException extends BusinessException {

    public InvalidLabServiceTypeException() {
        super(ErrorCode.INVALID_LAB_SERVICE_TYPE);
    }
}