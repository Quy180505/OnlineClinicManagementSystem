package com.ocms.online_clinic_management_system.payment.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class PaymentAccessDeniedException extends BusinessException{

    public PaymentAccessDeniedException() {
        super(ErrorCode.PAYMENT_ACCESS_DENIED);
    }
}
