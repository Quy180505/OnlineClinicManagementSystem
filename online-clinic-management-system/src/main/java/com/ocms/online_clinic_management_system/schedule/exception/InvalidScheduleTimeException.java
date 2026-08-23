package com.ocms.online_clinic_management_system.schedule.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvalidScheduleTimeException extends BusinessException {

    public InvalidScheduleTimeException() {
        super(ErrorCode.INVALID_SCHEDULE_TIME);
    }

}