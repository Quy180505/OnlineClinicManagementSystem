package com.ocms.online_clinic_management_system.inventory.entity;

import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Entity
@Table(name = "medicine")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Medicine extends BaseEntity {

    @Column(name = "medicine_name", nullable = false, unique = true, length = 150)
    private String medicineName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "medicine_category_id", nullable = false)
    private MedicineCategory medicineCategory;

    @Column(name = "unit", nullable = false, length = 30)
    private String unit;

    @Column(name = "price", nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

}