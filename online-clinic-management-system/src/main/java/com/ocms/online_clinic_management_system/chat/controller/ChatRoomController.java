package com.ocms.online_clinic_management_system.chat.controller;
import com.ocms.online_clinic_management_system.chat.dto.request.CreateChatRoomRequest;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatRoomDetailResponse;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatRoomResponse;
import com.ocms.online_clinic_management_system.chat.service.ChatRoomService;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chat/rooms")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @PostMapping
    public ResponseEntity<ApiResponse<ChatRoomResponse>> create(@Valid @RequestBody CreateChatRoomRequest request) {
        return ResponseEntity.ok(ApiResponse.success(chatRoomService.createChatRoom(request)));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<ChatRoomResponse>>> getMyChatRooms() {
        return ResponseEntity.ok(ApiResponse.success(chatRoomService.getMyChatRooms()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ChatRoomDetailResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(chatRoomService.getChatRoomDetail(id)));
    }

    @PatchMapping("/{id}/close")
    public ResponseEntity<ApiResponse<ChatRoomResponse>> close(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(chatRoomService.closeChatRoom(id)));
    }

    @PatchMapping("/{id}/open")
    public ResponseEntity<ApiResponse<ChatRoomResponse>> open(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(chatRoomService.openChatRoom(id)));
    }
}