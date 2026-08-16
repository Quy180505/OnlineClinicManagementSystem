package com.ocms.online_clinic_management_system.inventory.service.impl;

import com.ocms.online_clinic_management_system.common.constant.enums.InventoryTransactionType;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.inventory.config.InventoryProperties;
import com.ocms.online_clinic_management_system.inventory.dto.request.ImportMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.InventorySearchRequest;
import com.ocms.online_clinic_management_system.inventory.dto.response.InventoryTransactionResponse;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineInventoryResponse;
import com.ocms.online_clinic_management_system.inventory.entity.InventoryStatus;
import com.ocms.online_clinic_management_system.inventory.entity.InventoryTransaction;
import com.ocms.online_clinic_management_system.inventory.entity.Medicine;
import com.ocms.online_clinic_management_system.inventory.entity.MedicineInventory;
import com.ocms.online_clinic_management_system.inventory.mapper.InventoryMapper;
import com.ocms.online_clinic_management_system.inventory.repository.InventoryTransactionRepository;
import com.ocms.online_clinic_management_system.inventory.repository.MedicineInventoryRepository;
import com.ocms.online_clinic_management_system.inventory.service.InventoryService;
import com.ocms.online_clinic_management_system.inventory.specification.MedicineInventorySpecification;
import com.ocms.online_clinic_management_system.inventory.validator.InventoryStatusValidator;
import com.ocms.online_clinic_management_system.inventory.validator.InventoryValidator;
import com.ocms.online_clinic_management_system.inventory.validator.MedicineValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional
public class InventoryServiceImpl implements InventoryService {

    private final MedicineInventoryRepository medicineInventoryRepository;
    private final InventoryTransactionRepository inventoryTransactionRepository;

    private final InventoryMapper inventoryMapper;

    private final MedicineValidator medicineValidator;
    private final InventoryValidator inventoryValidator;
    private final InventoryStatusValidator inventoryStatusValidator;
    private final InventoryProperties inventoryProperties;
    @Override
    public MedicineInventoryResponse importMedicine(ImportMedicineRequest request) {

        Medicine medicine = medicineValidator.validateMedicineExists(request.getMedicineId());
        inventoryValidator.validateExpireDate(request.getImportDate(), request.getExpireDate());
        MedicineInventory medicineInventory = inventoryMapper.toEntity(request);
        medicineInventory.setMedicine(medicine);
        medicineInventory.setQuantityInStock(request.getQuantity());
        InventoryStatus status = determineInventoryStatus(request.getQuantity(), request.getExpireDate());
        medicineInventory.setInventoryStatus(status);
        medicineInventory = medicineInventoryRepository.save(medicineInventory);

        InventoryTransaction transaction = InventoryTransaction.builder()
                        .medicineInventory(medicineInventory)
                        .transactionType(InventoryTransactionType.IMPORT)
                        .quantity(request.getQuantity())
                        .quantityBefore(0)
                        .quantityAfter(request.getQuantity())
                        .note(request.getNote())
                        .build();

        inventoryTransactionRepository.save(transaction);

        medicineInventory.getInventoryTransactions().add(transaction);

        return inventoryMapper.toInventoryResponse(medicineInventory);
    }

    @Override
    @Transactional(readOnly = true)
    public MedicineInventoryResponse getById(Long medicineInventoryId) {

        MedicineInventory medicineInventory = inventoryValidator.validateMedicineInventoryExists(medicineInventoryId);

        return inventoryMapper.toInventoryResponse(medicineInventory);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<MedicineInventoryResponse> search(InventorySearchRequest request, Pageable pageable) {

        Specification<MedicineInventory> specification =
                Specification.allOf(
                        MedicineInventorySpecification.hasMedicineId(request.getMedicineId()),
                        MedicineInventorySpecification.hasMedicineCategoryId(request.getMedicineCategoryId()),
                        MedicineInventorySpecification.hasInventoryStatusId(request.getInventoryStatusId()),
                        MedicineInventorySpecification.expireDateFrom(request.getExpireDateFrom()),
                        MedicineInventorySpecification.expireDateTo(request.getExpireDateTo()),
                        MedicineInventorySpecification.availableOnly(request.getAvailableOnly())
                );

        Page<MedicineInventoryResponse> responsePage = medicineInventoryRepository.findAll(specification, pageable)
                        .map(inventoryMapper::toInventoryResponse);

        return PageResponse.of(responsePage);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<InventoryTransactionResponse> getTransactions(Long medicineInventoryId, Pageable pageable) {

        inventoryValidator.validateMedicineInventoryExists(medicineInventoryId);

        Page<InventoryTransactionResponse> responsePage = inventoryTransactionRepository
                        .findByMedicineInventory_IdOrderByCreatedAtDesc(medicineInventoryId, pageable)
                        .map(inventoryMapper::toTransactionResponse);

        return PageResponse.of(responsePage);
    }


    private InventoryStatus determineInventoryStatus(Integer quantity, LocalDate expireDate) {

        if (expireDate == null || expireDate.isBefore(LocalDate.now())) {
            return inventoryStatusValidator.validateInventoryStatusByName("EXPIRED");
        }

        if (quantity == null || quantity <= 0) {
            return inventoryStatusValidator.validateInventoryStatusByName("OUT_OF_STOCK");
        }

        if (quantity <= inventoryProperties.getLowStockThreshold()) {
            return inventoryStatusValidator.validateInventoryStatusByName("LOW_STOCK");
        }

        return inventoryStatusValidator.validateInventoryStatusByName("IN_STOCK");
    }
}