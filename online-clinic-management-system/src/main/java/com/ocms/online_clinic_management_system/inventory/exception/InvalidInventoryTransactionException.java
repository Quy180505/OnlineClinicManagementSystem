package com.ocms.online_clinic_management_system.inventory.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvalidInventoryTransactionException extends BusinessException {

    public InvalidInventoryTransactionException() {
        super(ErrorCode.INVALID_INVENTORY_TRANSACTION);
    }
}