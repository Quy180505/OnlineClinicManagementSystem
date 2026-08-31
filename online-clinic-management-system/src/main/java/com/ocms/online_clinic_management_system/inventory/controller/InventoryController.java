package com.ocms.online_clinic_management_system.inventory.controller;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.inventory.dto.request.ImportMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.InventorySearchRequest;
import com.ocms.online_clinic_management_system.inventory.dto.response.InventoryStatusResponse;
import com.ocms.online_clinic_management_system.inventory.dto.response.InventoryTransactionResponse;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineInventoryResponse;
import com.ocms.online_clinic_management_system.inventory.entity.InventoryStatus;
import com.ocms.online_clinic_management_system.inventory.service.InventoryService;
import com.ocms.online_clinic_management_system.inventory.service.InventoryStatusService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;
    private final InventoryStatusService inventoryStatusService;

    @GetMapping("/statuses")
    public ResponseEntity<ApiResponse<List<InventoryStatusResponse>>> getInventoryStatuses() {
        return ResponseEntity.ok(ApiResponse.success(inventoryStatusService.getInventoryStatuses()));
    }


    @PostMapping("/import")
    public ResponseEntity<ApiResponse<MedicineInventoryResponse>> importMedicine(@Valid @RequestBody ImportMedicineRequest request) {
        return ResponseEntity.ok(ApiResponse.success(inventoryService.importMedicine(request)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicineInventoryResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(inventoryService.getById(id)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<MedicineInventoryResponse>>> search(@ParameterObject InventorySearchRequest request, @ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(inventoryService.search(request, pageable)));
    }

    @GetMapping("/{id}/transactions")
    public ResponseEntity<ApiResponse<PageResponse<InventoryTransactionResponse>>> getTransactions(@PathVariable Long id, @ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(inventoryService.getTransactions(id, pageable)));
    }
}