package com.ocms.online_clinic_management_system.inventory.service.impl;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.inventory.dto.request.CreateMedicineCategoryRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.UpdateMedicineCategoryRequest;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineCategoryResponse;
import com.ocms.online_clinic_management_system.inventory.entity.MedicineCategory;
import com.ocms.online_clinic_management_system.inventory.mapper.MedicineCategoryMapper;
import com.ocms.online_clinic_management_system.inventory.repository.MedicineCategoryRepository;
import com.ocms.online_clinic_management_system.inventory.service.MedicineCategoryService;
import com.ocms.online_clinic_management_system.inventory.validator.MedicineCategoryValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MedicineCategoryServiceImpl implements MedicineCategoryService {

    private final MedicineCategoryRepository medicineCategoryRepository;
    private final MedicineCategoryMapper medicineCategoryMapper;
    private final MedicineCategoryValidator medicineCategoryValidator;

    @Override
    public MedicineCategoryResponse create(CreateMedicineCategoryRequest request) {

        medicineCategoryValidator.validateCategoryNameNotExists(request.getCategoryName());
        MedicineCategory category = medicineCategoryMapper.toEntity(request);
        category = medicineCategoryRepository.save(category);

        return medicineCategoryMapper.toResponse(category);
    }

    @Override
    public MedicineCategoryResponse update(Long categoryId, UpdateMedicineCategoryRequest request) {

        MedicineCategory category = medicineCategoryValidator.validateMedicineCategoryExists(categoryId);

        if (request.getCategoryName() != null && !request.getCategoryName().equalsIgnoreCase(category.getCategoryName())) {
            medicineCategoryValidator.validateCategoryNameNotExistsForUpdate(request.getCategoryName(), categoryId);
        }
        medicineCategoryMapper.updateEntity(request, category);
        category = medicineCategoryRepository.save(category);

        return medicineCategoryMapper.toResponse(category);
    }

    @Override
    @Transactional(readOnly = true)
    public MedicineCategoryResponse getById(Long categoryId) {
        MedicineCategory category = medicineCategoryValidator.validateMedicineCategoryExists(categoryId);
        return medicineCategoryMapper.toResponse(category);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<MedicineCategoryResponse> search(Pageable pageable) {

        Page<MedicineCategoryResponse> responsePage = medicineCategoryRepository.findAll(pageable).map(medicineCategoryMapper::toResponse);
        return PageResponse.of(responsePage);
    }

    @Override
    public void delete(Long categoryId) {
        MedicineCategory category = medicineCategoryValidator.validateMedicineCategoryExists(categoryId);
        medicineCategoryRepository.delete(category);
    }
}