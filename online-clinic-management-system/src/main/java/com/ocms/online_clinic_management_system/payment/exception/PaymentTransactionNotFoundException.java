package com.ocms.online_clinic_management_system.payment.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class PaymentTransactionNotFoundException extends BusinessException {

    public PaymentTransactionNotFoundException() {
        super(ErrorCode.PAYMENT_TRANSACTION_NOT_FOUND);
    }
}