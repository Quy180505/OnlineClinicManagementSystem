package com.ocms.online_clinic_management_system.inventory.service.impl;

import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.inventory.dto.request.CreateMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.InventorySearchRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.MedicineSearchRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.UpdateMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineDetailResponse;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineResponse;
import com.ocms.online_clinic_management_system.inventory.entity.Medicine;
import com.ocms.online_clinic_management_system.inventory.entity.MedicineCategory;
import com.ocms.online_clinic_management_system.inventory.mapper.MedicineMapper;
import com.ocms.online_clinic_management_system.inventory.repository.MedicineRepository;
import com.ocms.online_clinic_management_system.inventory.service.MedicineService;
import com.ocms.online_clinic_management_system.inventory.specification.MedicineSpecification;
import com.ocms.online_clinic_management_system.inventory.validator.MedicineCategoryValidator;
import com.ocms.online_clinic_management_system.inventory.validator.MedicineValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MedicineServiceImpl implements MedicineService {

    private final MedicineRepository medicineRepository;
    private final MedicineMapper medicineMapper;
    private final MedicineValidator medicineValidator;
    private final MedicineCategoryValidator medicineCategoryValidator;

    @Override
    public void restore(Long medicineId) {

        Medicine medicine = medicineValidator.validateInactiveMedicineExists(medicineId);

        medicine.setIsActive(true);
    }
    @Override
    public MedicineResponse create(CreateMedicineRequest request) {

        medicineValidator.validateMedicineNameNotExists(request.getMedicineName());

        MedicineCategory category = medicineCategoryValidator.validateMedicineCategoryExists(request.getMedicineCategoryId());

        Medicine medicine = medicineMapper.toEntity(request);
        medicine.setIsActive(true);
        medicine.setMedicineCategory(category);

        medicine = medicineRepository.save(medicine);

        return medicineMapper.toResponse(medicine);
    }

    @Override
    public MedicineResponse update(Long medicineId, UpdateMedicineRequest request) {

        Medicine medicine = medicineValidator.validateMedicineExists(medicineId);

        if (request.getMedicineName() != null && !request.getMedicineName().equalsIgnoreCase(medicine.getMedicineName())) {
            medicineValidator.validateMedicineNameNotExistsForUpdate(request.getMedicineName(), medicineId);
        }

        MedicineCategory category = null;

        if (request.getMedicineCategoryId() != null) {
            category = medicineCategoryValidator.validateMedicineCategoryExists(request.getMedicineCategoryId());
        }

        medicineMapper.updateEntity(request, medicine);

        if (category != null) {
            medicine.setMedicineCategory(category);
        }

        medicine = medicineRepository.save(medicine);
        return medicineMapper.toResponse(medicine);
    }

    @Override
    @Transactional(readOnly = true)
    public MedicineDetailResponse getById(Long medicineId) {
        Medicine medicine = medicineValidator.validateMedicineExists(medicineId);
        return medicineMapper.toDetailResponse(medicine);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<MedicineResponse> search(MedicineSearchRequest request, Pageable pageable) {

        Specification<Medicine> specification = Specification.allOf(
                MedicineSpecification.isActive(),
                MedicineSpecification.hasMedicineName(request.getMedicineName()),
                MedicineSpecification.hasCategoryId(request.getMedicineCategoryId())
        );

        Page<MedicineResponse> responsePage = medicineRepository.findAll(specification, pageable).map(medicineMapper::toResponse);
        return PageResponse.of(responsePage);
    }

    @Override
    public void delete(Long medicineId) {
        Medicine medicine = medicineValidator.validateMedicineExists(medicineId);
        medicine.setIsActive(false);
    }
}