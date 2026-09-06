package com.ocms.online_clinic_management_system.chat.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateChatRoomRequest {
    @NotNull(message = "Doctor ID is required")
    private Long doctorId;
}