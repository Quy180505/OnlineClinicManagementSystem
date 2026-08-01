package com.ocms.online_clinic_management_system.auth.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class JwtException extends BusinessException {

    public JwtException(ErrorCode errorCode) {
        super(errorCode);
    }

}