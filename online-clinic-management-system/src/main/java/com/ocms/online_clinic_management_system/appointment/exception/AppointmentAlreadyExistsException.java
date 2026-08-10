package com.ocms.online_clinic_management_system.appointment.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class AppointmentAlreadyExistsException extends BusinessException {

    public AppointmentAlreadyExistsException() {
        super(ErrorCode.APPOINTMENT_ALREADY_EXISTS);
    }

}