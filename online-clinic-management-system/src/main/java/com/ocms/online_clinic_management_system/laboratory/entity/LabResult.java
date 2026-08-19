package com.ocms.online_clinic_management_system.laboratory.entity;

import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "lab_result")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class LabResult extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_order_detail_id", nullable = false, unique = true)
    private TestOrderDetail testOrderDetail;

    @Lob
    @Column(name = "result_content",columnDefinition = "TEXT", nullable = false)
    private String resultContent;

    @Column(name = "result_date", nullable = false)
    private LocalDateTime resultDate;
}