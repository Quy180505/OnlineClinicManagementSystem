package com.ocms.online_clinic_management_system.appointment.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class ScheduleFullException extends BusinessException {

    public ScheduleFullException() {
        super(ErrorCode.APPOINTMENT_SCHEDULE_FULL);
    }
}