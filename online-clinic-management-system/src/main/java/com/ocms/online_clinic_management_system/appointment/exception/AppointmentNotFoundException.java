package com.ocms.online_clinic_management_system.appointment.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class AppointmentNotFoundException extends BusinessException {

    public AppointmentNotFoundException() {
        super(ErrorCode.APPOINTMENT_NOT_FOUND);
    }

}