package com.ocms.online_clinic_management_system.service.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class MedicalServiceNotFoundException extends BusinessException {

    public MedicalServiceNotFoundException() {
        super(ErrorCode.MEDICAL_SERVICE_NOT_FOUND);
    }

}