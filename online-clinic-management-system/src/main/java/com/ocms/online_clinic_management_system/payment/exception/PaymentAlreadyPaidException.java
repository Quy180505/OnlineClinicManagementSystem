package com.ocms.online_clinic_management_system.payment.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class PaymentAlreadyPaidException extends BusinessException {

    public PaymentAlreadyPaidException() {
        super(ErrorCode.PAYMENT_ALREADY_PAID);
    }
}