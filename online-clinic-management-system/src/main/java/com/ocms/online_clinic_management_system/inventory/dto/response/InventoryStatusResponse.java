package com.ocms.online_clinic_management_system.inventory.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InventoryStatusResponse {

    private Long id;
    private String statusName;
}