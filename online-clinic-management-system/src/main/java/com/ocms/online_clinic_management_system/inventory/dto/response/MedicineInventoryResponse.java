package com.ocms.online_clinic_management_system.inventory.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class MedicineInventoryResponse {

    private Long id;
    private Long medicineId;
    private String medicineName;

    private Long inventoryStatusId;
    private String inventoryStatusName;

    private Integer quantityInStock;

    private LocalDate importDate;
    private LocalDate expireDate;
    private LocalDateTime lastUpdated;
}