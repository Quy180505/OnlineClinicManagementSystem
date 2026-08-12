package com.ocms.online_clinic_management_system.medicalrecord.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class MedicalRecordNotFoundException extends BusinessException {

    public MedicalRecordNotFoundException() {
        super(ErrorCode.MEDICAL_RECORD_NOT_FOUND);
    }
}