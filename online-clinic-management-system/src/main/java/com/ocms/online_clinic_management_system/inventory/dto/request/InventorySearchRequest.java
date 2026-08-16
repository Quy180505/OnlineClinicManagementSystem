package com.ocms.online_clinic_management_system.inventory.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class InventorySearchRequest {

    private Long medicineId;

    private Long medicineCategoryId;

    private Long inventoryStatusId;

    private LocalDate expireDateFrom;

    private LocalDate expireDateTo;

    private Boolean availableOnly;
}