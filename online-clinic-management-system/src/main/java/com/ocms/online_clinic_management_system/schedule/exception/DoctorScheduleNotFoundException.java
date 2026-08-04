package com.ocms.online_clinic_management_system.schedule.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class DoctorScheduleNotFoundException extends BusinessException {

    public DoctorScheduleNotFoundException() {
        super(ErrorCode.DOCTOR_SCHEDULE_NOT_FOUND);
    }

}