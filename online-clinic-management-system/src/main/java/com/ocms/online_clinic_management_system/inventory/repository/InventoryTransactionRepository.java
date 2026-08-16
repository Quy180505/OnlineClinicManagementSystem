package com.ocms.online_clinic_management_system.inventory.repository;

import com.ocms.online_clinic_management_system.inventory.entity.InventoryTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryTransactionRepository extends JpaRepository<InventoryTransaction, Long> {

    Page<InventoryTransaction> findByMedicineInventory_IdOrderByCreatedAtDesc(Long medicineInventoryId, Pageable pageable);


    List<InventoryTransaction> findByMedicineInventory_Medicine_IdOrderByCreatedAtDesc(Long medicineId);

    List<InventoryTransaction> findByPrescriptionDetail_Id(Long prescriptionDetailId);
}