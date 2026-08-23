package com.ocms.online_clinic_management_system.laboratory.entity;

import com.ocms.online_clinic_management_system.common.constant.enums.TestOrderStatus;
import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecord;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "test_order")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class TestOrder extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medical_record_id", nullable = false)
    private MedicalRecord medicalRecord;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TestOrderStatus status;

    @OneToMany(mappedBy = "testOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TestOrderDetail> details;
}