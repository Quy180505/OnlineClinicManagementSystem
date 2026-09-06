package com.ocms.online_clinic_management_system.chat.repository;

import com.ocms.online_clinic_management_system.chat.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long>, JpaSpecificationExecutor<ChatMessage> {

    List<ChatMessage> findByChatRoom_IdOrderByCreatedAtAsc(Long roomId);
    List<ChatMessage> findByChatRoom_IdOrderByCreatedAtDesc(Long roomId);
    boolean existsByIdAndChatRoom_Id(Long messageId, Long roomId);
    long countByChatRoom_Id(Long roomId);
}