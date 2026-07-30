package com.ocms.online_clinic_management_system.invoice.entity;

import com.ocms.online_clinic_management_system.common.constant.enums.InvoiceItemType;
import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import com.ocms.online_clinic_management_system.laboratory.entity.TestOrderDetail;
import com.ocms.online_clinic_management_system.prescription.entity.PrescriptionDetail;
import com.ocms.online_clinic_management_system.service.entity.MedicalService;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Entity
@Table(name = "invoice_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class InvoiceDetail extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    @Enumerated(EnumType.STRING)
    @Column(name = "item_type", nullable = false)
    private InvoiceItemType itemType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    private MedicalService service;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_order_detail_id")
    private TestOrderDetail testOrderDetail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_detail_id")
    private PrescriptionDetail prescriptionDetail;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "unit_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitPrice;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;
}