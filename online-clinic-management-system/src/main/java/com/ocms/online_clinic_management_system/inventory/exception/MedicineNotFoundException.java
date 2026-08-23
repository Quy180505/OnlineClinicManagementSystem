package com.ocms.online_clinic_management_system.inventory.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class MedicineNotFoundException extends BusinessException {

    public MedicineNotFoundException() {
        super(ErrorCode.MEDICINE_NOT_FOUND);
    }
}