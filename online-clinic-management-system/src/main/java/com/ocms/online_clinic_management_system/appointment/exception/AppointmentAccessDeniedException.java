package com.ocms.online_clinic_management_system.appointment.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class AppointmentAccessDeniedException extends BusinessException {

    public AppointmentAccessDeniedException() {
        super(ErrorCode.APPOINTMENT_ACCESS_DENIED);
    }
}