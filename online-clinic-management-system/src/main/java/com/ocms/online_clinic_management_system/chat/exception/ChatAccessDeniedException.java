package com.ocms.online_clinic_management_system.chat.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class ChatAccessDeniedException extends BusinessException {

    public ChatAccessDeniedException() {
        super(ErrorCode.CHAT_ACCESS_DENIED);
    }
}