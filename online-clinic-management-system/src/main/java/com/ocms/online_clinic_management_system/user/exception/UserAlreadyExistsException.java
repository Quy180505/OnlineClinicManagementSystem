package com.ocms.online_clinic_management_system.user.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class UserAlreadyExistsException extends BusinessException {

    public UserAlreadyExistsException(ErrorCode errorCode) {
        super(errorCode);
    }

}