package com.ocms.online_clinic_management_system.appointment.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvalidAppointmentServiceException extends BusinessException {

    public InvalidAppointmentServiceException() {
        super(ErrorCode.INVALID_APPOINTMENT_SERVICE);
    }
}