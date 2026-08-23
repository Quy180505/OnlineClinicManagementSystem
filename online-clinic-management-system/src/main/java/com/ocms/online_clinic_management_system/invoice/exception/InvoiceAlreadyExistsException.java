package com.ocms.online_clinic_management_system.invoice.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvoiceAlreadyExistsException extends BusinessException {

    public InvoiceAlreadyExistsException() {
        super(ErrorCode.INVOICE_ALREADY_EXISTS);
    }
}