package com.ocms.online_clinic_management_system.inventory.service.impl;

import com.ocms.online_clinic_management_system.common.constant.enums.InventoryTransactionType;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.inventory.config.InventoryProperties;
import com.ocms.online_clinic_management_system.inventory.dto.request.ExportMedicineDetailRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.ExportMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.ImportMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.InventorySearchRequest;
import com.ocms.online_clinic_management_system.inventory.dto.response.InventoryTransactionResponse;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineInventoryResponse;
import com.ocms.online_clinic_management_system.inventory.entity.InventoryStatus;
import com.ocms.online_clinic_management_system.inventory.entity.InventoryTransaction;
import com.ocms.online_clinic_management_system.inventory.entity.Medicine;
import com.ocms.online_clinic_management_system.inventory.entity.MedicineInventory;
import com.ocms.online_clinic_management_system.inventory.exception.InsufficientStockException;
import com.ocms.online_clinic_management_system.inventory.exception.InvalidInventoryTransactionException;
import com.ocms.online_clinic_management_system.inventory.mapper.InventoryMapper;
import com.ocms.online_clinic_management_system.inventory.repository.InventoryTransactionRepository;
import com.ocms.online_clinic_management_system.inventory.repository.MedicineInventoryRepository;
import com.ocms.online_clinic_management_system.inventory.service.InventoryService;
import com.ocms.online_clinic_management_system.inventory.specification.MedicineInventorySpecification;
import com.ocms.online_clinic_management_system.inventory.validator.InventoryStatusValidator;
import com.ocms.online_clinic_management_system.inventory.validator.InventoryValidator;
import com.ocms.online_clinic_management_system.inventory.validator.MedicineValidator;
import com.ocms.online_clinic_management_system.prescription.entity.PrescriptionDetail;
import com.ocms.online_clinic_management_system.prescription.repository.PrescriptionDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

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
    private final PrescriptionDetailRepository prescriptionDetailRepository;

    @Override
    public void exportMedicine(ExportMedicineRequest request) {

        for (ExportMedicineDetailRequest detail : request.getDetails()) {


            medicineValidator.validateMedicineExists(detail.getMedicineId());


            PrescriptionDetail prescriptionDetail =
                    inventoryValidator.validatePrescriptionDetailExists(detail.getPrescriptionDetailId(), request.getPrescriptionId());

            if (!prescriptionDetail.getMedicine().getId().equals(detail.getMedicineId())) {
                throw new InvalidInventoryTransactionException();
            }

            if (detail.getQuantity() > prescriptionDetail.getQuantity()) {
                throw new InsufficientStockException();
            }

            List<MedicineInventory> inventories = medicineInventoryRepository
                            .findAvailableInventoriesForUpdate(detail.getMedicineId(), LocalDate.now());

            int totalAvailable = inventories.stream().mapToInt(MedicineInventory::getQuantityInStock).sum();

            if (totalAvailable < detail.getQuantity()) {
                throw new InsufficientStockException();
            }

            int remainingQuantity = detail.getQuantity();

            for (MedicineInventory inventory : inventories) {

                if (remainingQuantity <= 0) {
                    break;
                }

                int quantityBefore = inventory.getQuantityInStock();
                int exportQuantity = Math.min(quantityBefore, remainingQuantity);
                int quantityAfter = quantityBefore - exportQuantity;
                inventory.setQuantityInStock(quantityAfter);

                inventory.setInventoryStatus(determineInventoryStatus(quantityAfter, inventory.getExpireDate()));

                InventoryTransaction transaction = InventoryTransaction.builder()
                        .medicineInventory(inventory)
                        .prescriptionDetail(prescriptionDetail)
                        .transactionType(InventoryTransactionType.EXPORT)
                        .quantity(exportQuantity)
                        .quantityBefore(quantityBefore)
                        .quantityAfter(quantityAfter)
                        .note("Xuất thuốc theo đơn thuốc")
                        .build();

                inventoryTransactionRepository.save(transaction);

                remainingQuantity -= exportQuantity;
            }

            if (remainingQuantity > 0) {
                throw new InsufficientStockException();
            }
        }
    }


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