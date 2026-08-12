package com.ocms.online_clinic_management_system.medicalrecord.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class MedicalRecordAlreadyExistsException extends BusinessException {

    public MedicalRecordAlreadyExistsException() {
        super(ErrorCode.MEDICAL_RECORD_ALREADY_EXISTS);
    }
}