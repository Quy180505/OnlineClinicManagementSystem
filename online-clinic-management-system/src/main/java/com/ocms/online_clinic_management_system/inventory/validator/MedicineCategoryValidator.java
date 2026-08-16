package com.ocms.online_clinic_management_system.inventory.validator;

import com.ocms.online_clinic_management_system.inventory.entity.MedicineCategory;
import com.ocms.online_clinic_management_system.inventory.exception.MedicineCategoryAlreadyExistsException;
import com.ocms.online_clinic_management_system.inventory.exception.MedicineCategoryNotFoundException;
import com.ocms.online_clinic_management_system.inventory.repository.MedicineCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MedicineCategoryValidator {

    private final MedicineCategoryRepository medicineCategoryRepository;

    public MedicineCategory validateMedicineCategoryExists(Long categoryId) {
        return medicineCategoryRepository.findById(categoryId)
                .orElseThrow(MedicineCategoryNotFoundException::new);
    }

    public void validateCategoryNameNotExists(String categoryName) {
        if (medicineCategoryRepository.existsByCategoryNameIgnoreCase(categoryName)) {
            throw new MedicineCategoryAlreadyExistsException();
        }
    }

    public void validateCategoryNameNotExistsForUpdate(String categoryName, Long categoryId) {
        if (medicineCategoryRepository.existsByCategoryNameIgnoreCaseAndIdNot(categoryName, categoryId)) {
            throw new MedicineCategoryAlreadyExistsException();
        }
    }
}