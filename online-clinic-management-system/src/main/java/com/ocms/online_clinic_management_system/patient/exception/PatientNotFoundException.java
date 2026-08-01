package com.ocms.online_clinic_management_system.patient.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;


public class PatientNotFoundException extends BusinessException {


    public PatientNotFoundException() {

        super(ErrorCode.PATIENT_NOT_FOUND);

    }

}