package com.ocms.online_clinic_management_system.service.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class MedicalServiceAlreadyExistsException extends BusinessException {

    public MedicalServiceAlreadyExistsException() {
        super(ErrorCode.MEDICAL_SERVICE_ALREADY_EXISTS);
    }

}