package com.ocms.online_clinic_management_system.inventory.service.impl;
import com.ocms.online_clinic_management_system.inventory.dto.response.InventoryStatusResponse;
import com.ocms.online_clinic_management_system.inventory.entity.InventoryStatus;
import com.ocms.online_clinic_management_system.inventory.repository.InventoryStatusRepository;
import com.ocms.online_clinic_management_system.inventory.service.InventoryStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InventoryStatusServiceImpl implements InventoryStatusService {

    private final InventoryStatusRepository inventoryStatusRepository;

    @Override
    @Transactional(readOnly = true)
    public List<InventoryStatusResponse> getInventoryStatuses() {
        return inventoryStatusRepository.findAll().stream()
                .map(status -> new InventoryStatusResponse(status.getId(), status.getStatusName()))
                .toList();
    }
}