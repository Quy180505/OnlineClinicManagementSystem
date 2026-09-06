package com.ocms.online_clinic_management_system.chat.controller;
import com.ocms.online_clinic_management_system.chat.dto.request.SendMessageRequest;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatMessageResponse;
import com.ocms.online_clinic_management_system.chat.service.ChatMessageService;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chat/messages")
@RequiredArgsConstructor
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    @PostMapping
    public ResponseEntity<ApiResponse<ChatMessageResponse>> send(@Valid @RequestBody SendMessageRequest request) {
        return ResponseEntity.ok(ApiResponse.success(chatMessageService.sendMessage(request)));
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<ApiResponse<List<ChatMessageResponse>>> getByRoomId(@PathVariable Long roomId) {
        return ResponseEntity.ok(ApiResponse.success(chatMessageService.getMessagesByRoomId(roomId)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ChatMessageResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(chatMessageService.getMessage(id)));
    }
}