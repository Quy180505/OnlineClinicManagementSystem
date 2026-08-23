package com.ocms.online_clinic_management_system.inventory.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class MedicineAlreadyExistsException extends BusinessException {

    public MedicineAlreadyExistsException() {
        super(ErrorCode.MEDICINE_ALREADY_EXISTS);
    }
}