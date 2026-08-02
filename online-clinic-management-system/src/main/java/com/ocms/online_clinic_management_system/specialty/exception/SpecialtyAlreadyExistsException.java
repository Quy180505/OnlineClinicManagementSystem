package com.ocms.online_clinic_management_system.specialty.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class SpecialtyAlreadyExistsException extends BusinessException {

    public SpecialtyAlreadyExistsException() {
        super(ErrorCode.SPECIALTY_ALREADY_EXISTS);
    }

}