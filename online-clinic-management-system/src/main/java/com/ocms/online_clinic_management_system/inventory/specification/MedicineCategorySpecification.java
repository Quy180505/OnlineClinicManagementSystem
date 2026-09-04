package com.ocms.online_clinic_management_system.inventory.specification;
import com.ocms.online_clinic_management_system.inventory.entity.MedicineCategory;
import org.springframework.data.jpa.domain.Specification;

public class MedicineCategorySpecification {

    public static Specification<MedicineCategory> hasCategoryName(String categoryName) {
        return (root, query, criteriaBuilder) -> {

            if (categoryName == null || categoryName.trim().isEmpty()) {
                return null;
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("categoryName")), "%" + categoryName.trim().toLowerCase() + "%");
        };
    }
}