package com.ocms.online_clinic_management_system.inventory.dto.response;

import com.ocms.online_clinic_management_system.common.constant.enums.InventoryTransactionType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class InventoryTransactionResponse {

    private Long id;

    private Long medicineInventoryId;
    private Long medicineId;
    private String medicineName;

    private InventoryTransactionType transactionType;

    private Integer quantity;
    private Integer quantityBefore;
    private Integer quantityAfter;

    private Long prescriptionDetailId;

    private String note;
    private LocalDateTime createdAt;
}