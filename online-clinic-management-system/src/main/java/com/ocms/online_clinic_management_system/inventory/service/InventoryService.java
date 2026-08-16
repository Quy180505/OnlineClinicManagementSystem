package com.ocms.online_clinic_management_system.inventory.service;

import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.inventory.dto.request.ImportMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.InventorySearchRequest;
import com.ocms.online_clinic_management_system.inventory.dto.response.InventoryTransactionResponse;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineInventoryResponse;
import org.springframework.data.domain.Pageable;



public interface InventoryService {

    MedicineInventoryResponse importMedicine(ImportMedicineRequest request);

    MedicineInventoryResponse getById(Long medicineInventoryId);

    PageResponse<MedicineInventoryResponse> search(InventorySearchRequest request, Pageable pageable);

    PageResponse<InventoryTransactionResponse> getTransactions(Long medicineInventoryId, Pageable pageable);

}