package com.ocms.online_clinic_management_system.laboratory.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class LaboratoryAccessDeniedException extends BusinessException {

    public LaboratoryAccessDeniedException() {
        super(ErrorCode.LABORATORY_ACCESS_DENIED);
    }
}