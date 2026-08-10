package com.ocms.online_clinic_management_system.appointment.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class AppointmentStatusNotFoundException extends BusinessException {

    public AppointmentStatusNotFoundException() {
        super(ErrorCode.APPOINTMENT_STATUS_NOT_FOUND);
    }
}