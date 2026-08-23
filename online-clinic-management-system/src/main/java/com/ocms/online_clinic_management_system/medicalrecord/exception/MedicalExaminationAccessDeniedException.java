package com.ocms.online_clinic_management_system.medicalrecord.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class MedicalExaminationAccessDeniedException extends BusinessException {

    public MedicalExaminationAccessDeniedException() {
        super(ErrorCode.MEDICAL_EXAMINATION_ACCESS_DENIED);
    }
}