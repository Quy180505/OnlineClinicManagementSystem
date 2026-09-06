package com.ocms.online_clinic_management_system.chat.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class InvalidChatRoomStatusException extends BusinessException {

    public InvalidChatRoomStatusException() {
        super(ErrorCode.INVALID_CHAT_ROOM_STATUS);
    }
}