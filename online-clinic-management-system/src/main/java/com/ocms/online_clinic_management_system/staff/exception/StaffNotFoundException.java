package com.ocms.online_clinic_management_system.staff.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;


public class StaffNotFoundException extends BusinessException {


    public StaffNotFoundException() {

        super(ErrorCode.STAFF_NOT_FOUND);

    }

}