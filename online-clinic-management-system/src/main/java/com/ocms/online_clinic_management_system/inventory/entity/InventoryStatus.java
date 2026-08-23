package com.ocms.online_clinic_management_system.inventory.entity;

import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "inventory_status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class InventoryStatus extends BaseEntity {

    @Column(name = "status_name", nullable = false, unique = true, length = 50)
    private String statusName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "inventoryStatus", fetch = FetchType.LAZY)
    private List<MedicineInventory> medicineInventories = new ArrayList<>();
}