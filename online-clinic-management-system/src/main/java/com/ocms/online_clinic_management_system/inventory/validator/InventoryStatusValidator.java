package com.ocms.online_clinic_management_system.inventory.validator;

import com.ocms.online_clinic_management_system.inventory.entity.InventoryStatus;
import com.ocms.online_clinic_management_system.inventory.exception.InventoryStatusNotFoundException;
import com.ocms.online_clinic_management_system.inventory.repository.InventoryStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InventoryStatusValidator {

    private final InventoryStatusRepository inventoryStatusRepository;

    public InventoryStatus validateInventoryStatusExists(Long statusId) {
        return inventoryStatusRepository.findById(statusId).orElseThrow(InventoryStatusNotFoundException::new);
    }

    public InventoryStatus validateInventoryStatusByName(String statusName) {
        return inventoryStatusRepository.findByStatusNameIgnoreCase(statusName).orElseThrow(InventoryStatusNotFoundException::new);
    }
}