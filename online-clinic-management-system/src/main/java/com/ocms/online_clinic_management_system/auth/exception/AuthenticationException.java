package com.ocms.online_clinic_management_system.auth.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class AuthenticationException extends BusinessException {

    public AuthenticationException() {
        super(ErrorCode.INVALID_USERNAME_OR_PASSWORD);
    }

}