package com.ocms.online_clinic_management_system.patient.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;


public class CitizenIdAlreadyExistsException  extends BusinessException {
    public CitizenIdAlreadyExistsException(){
        super(ErrorCode.CITIZEN_ID_ALREADY_EXISTS);
    }
}
