package com.ocms.online_clinic_management_system.chat.service;

import com.ocms.online_clinic_management_system.chat.dto.request.CreateChatRoomRequest;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatRoomDetailResponse;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatRoomResponse;

import java.util.List;

public interface ChatRoomService {

    ChatRoomResponse createChatRoom(CreateChatRoomRequest request);
    List<ChatRoomResponse> getMyChatRooms();
    ChatRoomDetailResponse getChatRoomDetail(Long roomId);
    ChatRoomResponse closeChatRoom(Long roomId);
    ChatRoomResponse openChatRoom(Long roomId);
}