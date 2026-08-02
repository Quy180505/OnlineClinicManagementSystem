package com.ocms.online_clinic_management_system.specialty.specification;

import com.ocms.online_clinic_management_system.specialty.entity.Specialty;
import org.springframework.data.jpa.domain.Specification;

public final class SpecialtySpecification {

    private SpecialtySpecification() {
    }

    public static Specification<Specialty> hasName(String keyword) {

        return (root, query, criteriaBuilder) -> {

            if (keyword == null || keyword.isBlank()) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")), "%" + keyword.toLowerCase() + "%"
            );
        };
    }

}