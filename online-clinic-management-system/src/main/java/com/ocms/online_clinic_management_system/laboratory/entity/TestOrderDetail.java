package com.ocms.online_clinic_management_system.laboratory.entity;


import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import com.ocms.online_clinic_management_system.service.entity.MedicalService;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "test_order_detail")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class TestOrderDetail extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_order_id", nullable = false)
    private TestOrder testOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    private MedicalService service;

    @OneToOne(mappedBy = "testOrderDetail",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private LabResult labResult;
}