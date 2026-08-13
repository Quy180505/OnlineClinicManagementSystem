package com.ocms.online_clinic_management_system.laboratory.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvalidTestOrderStatusException extends BusinessException {

    public InvalidTestOrderStatusException() {
        super(ErrorCode.INVALID_TEST_ORDER_STATUS);
    }
}