package com.ocms.online_clinic_management_system.chatbot.entity;

import com.ocms.online_clinic_management_system.common.constant.enums.ChatbotRole;
import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import com.ocms.online_clinic_management_system.specialty.entity.Specialty;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "chatbot_message")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ChatbotMessage extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversation_id", nullable = false)
    private ChatbotConversation conversation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recommended_specialty_id")
    private Specialty recommendedSpecialty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ChatbotRole role;

    @Lob
    @Column(nullable = false)
    private String content;
}