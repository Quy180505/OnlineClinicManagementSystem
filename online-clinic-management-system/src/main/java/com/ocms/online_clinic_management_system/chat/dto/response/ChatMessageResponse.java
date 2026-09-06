package com.ocms.online_clinic_management_system.chat.dto.response;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageResponse {

    private Long id;
    private Long roomId;
    private ChatParticipantResponse sender;
    private String messageContent;
    private LocalDateTime createdAt;
}