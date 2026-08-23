package com.ocms.online_clinic_management_system.appointment.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class AppointmentExamServiceRequiredException extends BusinessException {

    public AppointmentExamServiceRequiredException() {
        super(ErrorCode.APPOINTMENT_EXAM_SERVICE_REQUIRED);
    }
}