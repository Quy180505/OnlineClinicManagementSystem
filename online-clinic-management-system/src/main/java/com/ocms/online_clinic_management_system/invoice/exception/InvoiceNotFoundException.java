package com.ocms.online_clinic_management_system.invoice.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvoiceNotFoundException extends BusinessException {

    public InvoiceNotFoundException() {
        super(ErrorCode.INVOICE_NOT_FOUND);
    }
}