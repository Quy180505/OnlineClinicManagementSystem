package com.ocms.online_clinic_management_system.medicalrecord.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class AppointmentNotConfirmedException extends BusinessException {

    public AppointmentNotConfirmedException() {
        super(ErrorCode.APPOINTMENT_NOT_CONFIRMED);
    }
}