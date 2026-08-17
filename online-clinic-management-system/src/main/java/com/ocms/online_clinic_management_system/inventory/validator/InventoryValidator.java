package com.ocms.online_clinic_management_system.inventory.validator;

import com.ocms.online_clinic_management_system.inventory.entity.MedicineInventory;
import com.ocms.online_clinic_management_system.inventory.entity.InventoryTransaction;
import com.ocms.online_clinic_management_system.inventory.exception.ExpiredMedicineException;
import com.ocms.online_clinic_management_system.inventory.exception.InsufficientStockException;
import com.ocms.online_clinic_management_system.inventory.exception.InvalidInventoryTransactionException;
import com.ocms.online_clinic_management_system.inventory.exception.MedicineInventoryNotFoundException;
import com.ocms.online_clinic_management_system.inventory.repository.MedicineInventoryRepository;
import com.ocms.online_clinic_management_system.inventory.repository.InventoryTransactionRepository;
import com.ocms.online_clinic_management_system.prescription.entity.PrescriptionDetail;
import com.ocms.online_clinic_management_system.prescription.exception.PrescriptionDetailNotFoundException;
import com.ocms.online_clinic_management_system.prescription.repository.PrescriptionDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class InventoryValidator {

    private final MedicineInventoryRepository medicineInventoryRepository;
    private final PrescriptionDetailRepository prescriptionDetailRepository;

    public MedicineInventory validateMedicineInventoryExists(Long medicineInventoryId) {
        return medicineInventoryRepository.findById(medicineInventoryId).orElseThrow(MedicineInventoryNotFoundException::new);
    }

    public void validateExpireDate(LocalDate importDate, LocalDate expireDate) {
        if (expireDate == null || importDate == null || !expireDate.isAfter(importDate)) {
            throw new ExpiredMedicineException();
        }
    }

    public void validateStockAvailable(MedicineInventory medicineInventory, Integer quantity) {
        if (quantity == null || quantity <= 0) {
            throw new InsufficientStockException();
        }

        if (medicineInventory.getQuantityInStock() < quantity) {
            throw new InsufficientStockException();
        }
    }

    public void validateInventoryTransaction(InventoryTransaction transaction) {
        if (transaction == null || transaction.getMedicineInventory() == null || transaction.getTransactionType() == null
                || transaction.getQuantity() == null || transaction.getQuantity() <= 0)
        {
            throw new InvalidInventoryTransactionException();
        }
    }

    public void validateMedicineNotExpired(MedicineInventory medicineInventory) {
        if (medicineInventory.getExpireDate() == null || medicineInventory.getExpireDate().isBefore(LocalDate.now()))
        {
            throw new ExpiredMedicineException();
        }
    }

    public PrescriptionDetail validatePrescriptionDetailExists(Long prescriptionDetailId, Long prescriptionId) {
        return prescriptionDetailRepository.findByIdAndPrescriptionId(prescriptionDetailId, prescriptionId)
                .orElseThrow(PrescriptionDetailNotFoundException::new);
    }
}