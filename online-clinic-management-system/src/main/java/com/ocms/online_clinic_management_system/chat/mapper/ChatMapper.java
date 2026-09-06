package com.ocms.online_clinic_management_system.chat.mapper;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatMessageResponse;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatParticipantResponse;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatRoomDetailResponse;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatRoomResponse;
import com.ocms.online_clinic_management_system.chat.entity.ChatMessage;
import com.ocms.online_clinic_management_system.chat.entity.ChatRoom;
import com.ocms.online_clinic_management_system.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ChatMapper {

    @Mapping(target = "userId", source = "id")
    @Mapping(target = "fullName", source = "fullName")
    @Mapping(target = "role", source = "role.roleName")
    ChatParticipantResponse toChatParticipantResponse(User user);

    @Mapping(target = "roomId", source = "chatRoom.id")
    ChatMessageResponse toChatMessageResponse(ChatMessage chatMessage);

    List<ChatMessageResponse> toChatMessageResponseList(List<ChatMessage> chatMessages);

    @Mapping(target = "patient", source = "patient.user")
    @Mapping(target = "doctor", source = "doctor.user")
    ChatRoomResponse toChatRoomResponse(ChatRoom chatRoom);

    List<ChatRoomResponse> toChatRoomResponseList(List<ChatRoom> chatRooms);

    @Mapping(target = "patient", source = "patient.user")
    @Mapping(target = "doctor", source = "doctor.user")
    ChatRoomDetailResponse toChatRoomDetailResponse(ChatRoom chatRoom);
}