package com.ocms.online_clinic_management_system.chat.dto.response;
import com.ocms.online_clinic_management_system.common.constant.enums.ChatRoomStatus;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomDetailResponse {

    private Long id;
    private ChatParticipantResponse patient;
    private ChatParticipantResponse doctor;
    private ChatRoomStatus status;
    private List<ChatMessageResponse> messages;
}