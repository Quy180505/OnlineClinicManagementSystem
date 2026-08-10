package com.ocms.online_clinic_management_system.appointment.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvalidAppointmentStatusException extends BusinessException {

    public InvalidAppointmentStatusException() {
        super(ErrorCode.INVALID_APPOINTMENT_STATUS);
    }

}