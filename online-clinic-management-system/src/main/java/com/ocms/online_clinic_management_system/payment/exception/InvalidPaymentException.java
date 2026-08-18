package com.ocms.online_clinic_management_system.payment.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvalidPaymentException extends BusinessException {

    public InvalidPaymentException() {
        super(ErrorCode.INVALID_PAYMENT);
    }
}