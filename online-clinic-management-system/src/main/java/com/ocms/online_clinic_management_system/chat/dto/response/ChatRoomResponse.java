package com.ocms.online_clinic_management_system.chat.dto.response;
import com.ocms.online_clinic_management_system.common.constant.enums.ChatRoomStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomResponse {

    private Long id;
    private ChatParticipantResponse patient;
    private ChatParticipantResponse doctor;
    private ChatRoomStatus status;
}