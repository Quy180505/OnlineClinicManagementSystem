package com.ocms.online_clinic_management_system.inventory.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class MedicineCategoryNotFoundException extends BusinessException {

    public MedicineCategoryNotFoundException() {
        super(ErrorCode.MEDICINE_CATEGORY_NOT_FOUND);
    }
}