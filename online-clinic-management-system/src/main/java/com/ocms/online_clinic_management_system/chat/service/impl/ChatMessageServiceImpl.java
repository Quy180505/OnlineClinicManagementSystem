package com.ocms.online_clinic_management_system.chat.service.impl;
import com.ocms.online_clinic_management_system.auth.security.SecurityHelper;
import com.ocms.online_clinic_management_system.chat.dto.request.SendMessageRequest;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatMessageResponse;
import com.ocms.online_clinic_management_system.chat.entity.ChatMessage;
import com.ocms.online_clinic_management_system.chat.entity.ChatRoom;
import com.ocms.online_clinic_management_system.chat.mapper.ChatMapper;
import com.ocms.online_clinic_management_system.chat.repository.ChatMessageRepository;
import com.ocms.online_clinic_management_system.chat.service.ChatMessageService;
import com.ocms.online_clinic_management_system.chat.validator.ChatValidator;
import com.ocms.online_clinic_management_system.user.entity.User;
import com.ocms.online_clinic_management_system.user.exception.UserNotFoundException;
import com.ocms.online_clinic_management_system.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatMapper chatMapper;
    private final ChatValidator chatValidator;
    private final SecurityHelper securityHelper;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public ChatMessageResponse sendMessage(SendMessageRequest request) {
        Long currentUserId = securityHelper.getCurrentUserId();
        return sendMessage(request, currentUserId);
    }

    @Override
    @Transactional
    public ChatMessageResponse sendMessage(SendMessageRequest request, Long currentUserId) {

        ChatRoom chatRoom = chatValidator.validateChatRoomExists(request.getRoomId());
        chatValidator.validateChatRoomAccess(chatRoom, currentUserId);
        chatValidator.validateChatRoomOpen(chatRoom);

        User sender = userRepository.findById(currentUserId).orElseThrow(UserNotFoundException::new);

        ChatMessage chatMessage = ChatMessage.builder()
                        .chatRoom(chatRoom)
                        .sender(sender)
                        .messageContent(request.getMessageContent())
                        .build();

        chatMessageRepository.save(chatMessage);

        return chatMapper.toChatMessageResponse(chatMessage);
    }

    @Override
    public List<ChatMessageResponse> getMessagesByRoomId(Long roomId) {

        Long currentUserId = securityHelper.getCurrentUserId();
        ChatRoom chatRoom = chatValidator.validateChatRoomExists(roomId);
        chatValidator.validateChatRoomAccess(chatRoom, currentUserId);
        List<ChatMessage> chatMessages = chatMessageRepository.findByChatRoom_IdOrderByCreatedAtAsc(roomId);

        return chatMapper.toChatMessageResponseList(chatMessages);
    }

    @Override
    public ChatMessageResponse getMessage(Long messageId) {

        Long currentUserId = securityHelper.getCurrentUserId();
        ChatMessage chatMessage = chatValidator.validateChatMessageExists(messageId);
        chatValidator.validateChatRoomAccess(chatMessage.getChatRoom(), currentUserId);

        return chatMapper.toChatMessageResponse(chatMessage);
    }
}