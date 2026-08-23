package com.ocms.online_clinic_management_system.appointment.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class AppointmentCancellationException extends BusinessException {

    public AppointmentCancellationException() {
        super(ErrorCode.APPOINTMENT_CANCELLATION_NOT_ALLOWED);
    }

}