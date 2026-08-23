package com.ocms.online_clinic_management_system.inventory.specification;
import com.ocms.online_clinic_management_system.inventory.entity.Medicine;
import org.springframework.data.jpa.domain.Specification;
import java.math.BigDecimal;

public class MedicineSpecification {

    private MedicineSpecification() {
    }

    public static Specification<Medicine> isActive() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isTrue(root.get("isActive"));
    }

    public static Specification<Medicine> hasMedicineName(String medicineName) {
        return (root, query, criteriaBuilder) -> {

            if (medicineName == null || medicineName.trim().isEmpty()) {
                return null;
            }

            return criteriaBuilder.like(criteriaBuilder.lower(root.get("medicineName")), "%" + medicineName.trim().toLowerCase() + "%");
        };
    }

    public static Specification<Medicine> hasCategoryId(Long categoryId) {
        return (root, query, criteriaBuilder) -> {

            if (categoryId == null) {
                return null;
            }

            return criteriaBuilder.equal(root.get("medicineCategory").get("id"), categoryId);
        };
    }

    public static Specification<Medicine> hasPriceGreaterThanOrEqual(BigDecimal minPrice) {
        return (root, query, criteriaBuilder) -> {

            if (minPrice == null) {
                return null;
            }
            return criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice);
        };
    }

    public static Specification<Medicine> hasPriceLessThanOrEqual(BigDecimal maxPrice) {
        return (root, query, criteriaBuilder) -> {

            if (maxPrice == null) {
                return null;
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice);
        };
    }
}