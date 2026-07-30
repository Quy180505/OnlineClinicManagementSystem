package com.ocms.online_clinic_management_system.chatbot.entity;

import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "knowledge_chunk")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class KnowledgeChunk extends BaseEntity {

    @Column(nullable = false, length = 255)
    private String title;

    @Lob
    @Column(name = "chunk_text", nullable = false)
    private String chunkText;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "embedding_json", nullable = false, columnDefinition = "json")
    private List<Double> embeddingJson;

    @Column(length = 255)
    private String source;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
