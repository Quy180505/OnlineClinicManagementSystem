package com.ocms.online_clinic_management_system.chat.websocket;

import com.ocms.online_clinic_management_system.auth.security.UserPrincipal;
import com.ocms.online_clinic_management_system.chat.dto.request.SendMessageRequest;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatMessageResponse;
import com.ocms.online_clinic_management_system.chat.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.send")
    public void sendMessage(SendMessageRequest request, StompHeaderAccessor accessor) {

        Principal principal = accessor.getUser();

        if (!(principal instanceof Authentication authentication)) {
            throw new IllegalStateException("WebSocket authentication is missing");
        }

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long currentUserId = userPrincipal.getId();
        ChatMessageResponse response = chatMessageService.sendMessage(request, currentUserId);

        messagingTemplate.convertAndSend("/topic/chat/room/" + request.getRoomId(), response);
    }
}