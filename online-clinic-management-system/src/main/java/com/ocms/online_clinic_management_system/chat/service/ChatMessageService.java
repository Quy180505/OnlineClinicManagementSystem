package com.ocms.online_clinic_management_system.chat.service;
import com.ocms.online_clinic_management_system.chat.dto.request.SendMessageRequest;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatMessageResponse;
import java.util.List;

public interface ChatMessageService {

    ChatMessageResponse sendMessage(SendMessageRequest request);
    ChatMessageResponse sendMessage(SendMessageRequest request, Long currentUserId);
    List<ChatMessageResponse> getMessagesByRoomId(Long roomId);
    ChatMessageResponse getMessage(Long messageId);
}