package com.ocms.online_clinic_management_system.chat.dto.response;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatParticipantResponse {

    private Long userId;
    private String fullName;
    private String role;
}