package com.ocms.online_clinic_management_system.specialty.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;


public class SpecialtyNotFoundException extends BusinessException {


    public SpecialtyNotFoundException() {

        super(ErrorCode.SPECIALTY_NOT_FOUND);

    }

}