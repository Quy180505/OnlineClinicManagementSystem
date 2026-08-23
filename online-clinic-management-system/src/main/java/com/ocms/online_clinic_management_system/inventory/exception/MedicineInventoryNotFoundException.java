package com.ocms.online_clinic_management_system.inventory.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class MedicineInventoryNotFoundException extends BusinessException {

    public MedicineInventoryNotFoundException() {
        super(ErrorCode.MEDICINE_INVENTORY_NOT_FOUND);
    }
}