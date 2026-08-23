package com.ocms.online_clinic_management_system.inventory.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class MedicineCategoryAlreadyExistsException extends BusinessException {

    public MedicineCategoryAlreadyExistsException() {
        super(ErrorCode.MEDICINE_CATEGORY_ALREADY_EXISTS);
    }
}