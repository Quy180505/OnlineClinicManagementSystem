package com.ocms.online_clinic_management_system.laboratory.exception;

import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class TestOrderNotFoundException extends BusinessException {

    public TestOrderNotFoundException() {
        super(ErrorCode.TEST_ORDER_NOT_FOUND);
    }
}