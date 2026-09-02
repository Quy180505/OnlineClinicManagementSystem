package com.ocms.online_clinic_management_system.invoice.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvoiceAccessDeniedException extends BusinessException {

    public InvoiceAccessDeniedException() {
        super(ErrorCode.INVOICE_ACCESS_DENIED);
    }
}