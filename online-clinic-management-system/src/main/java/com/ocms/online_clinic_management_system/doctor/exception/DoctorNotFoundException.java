package com.ocms.online_clinic_management_system.doctor.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;


public class DoctorNotFoundException extends BusinessException {


    public DoctorNotFoundException() {

        super(ErrorCode.DOCTOR_NOT_FOUND);

    }

}