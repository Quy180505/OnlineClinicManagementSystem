package com.ocms.online_clinic_management_system.chat.exception;
import com.ocms.online_clinic_management_system.common.exception.BusinessException;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;

public class ChatRoomAlreadyExistsException extends BusinessException {

    public ChatRoomAlreadyExistsException() {
        super(ErrorCode.CHAT_ROOM_ALREADY_EXISTS);
    }
}