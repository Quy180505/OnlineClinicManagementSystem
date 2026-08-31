package com.ocms.online_clinic_management_system.inventory.service;
import com.ocms.online_clinic_management_system.inventory.dto.response.InventoryStatusResponse;
import java.util.List;

public interface InventoryStatusService {
    List<InventoryStatusResponse> getInventoryStatuses();
}
