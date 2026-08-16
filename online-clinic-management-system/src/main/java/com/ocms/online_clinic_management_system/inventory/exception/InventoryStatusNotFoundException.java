package com.ocms.online_clinic_management_system.inventory.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InventoryStatusNotFoundException extends BusinessException {

    public InventoryStatusNotFoundException() {
        super(ErrorCode.INVENTORY_STATUS_NOT_FOUND);
    }
}