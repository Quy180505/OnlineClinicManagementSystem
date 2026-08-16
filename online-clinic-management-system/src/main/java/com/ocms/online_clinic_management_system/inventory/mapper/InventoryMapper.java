package com.ocms.online_clinic_management_system.inventory.mapper;

import com.ocms.online_clinic_management_system.inventory.dto.request.ImportMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.response.InventoryTransactionResponse;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineInventoryResponse;
import com.ocms.online_clinic_management_system.inventory.entity.InventoryTransaction;
import com.ocms.online_clinic_management_system.inventory.entity.MedicineInventory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InventoryMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "medicine", ignore = true)
    @Mapping(target = "inventoryStatus", ignore = true)
    @Mapping(target = "quantityInStock", source = "quantity")
    @Mapping(target = "lastUpdated", ignore = true)
    @Mapping(target = "inventoryTransactions", ignore = true)
    MedicineInventory toEntity(ImportMedicineRequest request);

    @Mapping(target = "medicineId", source = "medicine.id")
    @Mapping(target = "medicineName", source = "medicine.medicineName")
    @Mapping(target = "inventoryStatusId", source = "inventoryStatus.id")
    @Mapping(target = "inventoryStatusName", source = "inventoryStatus.statusName")
    MedicineInventoryResponse toInventoryResponse(MedicineInventory medicineInventory);

    @Mapping(target = "medicineInventoryId", source = "medicineInventory.id")
    @Mapping(target = "medicineId", source = "medicineInventory.medicine.id")
    @Mapping(target = "medicineName", source = "medicineInventory.medicine.medicineName")
    @Mapping(target = "prescriptionDetailId", source = "prescriptionDetail.id")
    InventoryTransactionResponse toTransactionResponse(InventoryTransaction inventoryTransaction);
}