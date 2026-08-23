package com.ocms.online_clinic_management_system.inventory.specification;
import com.ocms.online_clinic_management_system.inventory.entity.MedicineInventory;
import org.springframework.data.jpa.domain.Specification;
import java.time.LocalDate;

public class MedicineInventorySpecification {

    private MedicineInventorySpecification() {
    }

    public static Specification<MedicineInventory> hasMedicineId(Long medicineId) {
        return (root, query, criteriaBuilder) -> {

            if (medicineId == null) {
                return null;
            }

            return criteriaBuilder.equal(root.get("medicine").get("id"), medicineId);
        };
    }

    public static Specification<MedicineInventory> hasMedicineCategoryId(Long medicineCategoryId) {
        return (root, query, criteriaBuilder) -> {

            if (medicineCategoryId == null) {
                return null;
            }

            return criteriaBuilder.equal(root.get("medicine").get("medicineCategory").get("id"), medicineCategoryId);
        };
    }

    public static Specification<MedicineInventory> hasInventoryStatusId(Long inventoryStatusId) {
        return (root, query, criteriaBuilder) -> {

            if (inventoryStatusId == null) {
                return null;
            }

            return criteriaBuilder.equal(root.get("inventoryStatus").get("id"), inventoryStatusId);
        };
    }

    public static Specification<MedicineInventory> expireDateFrom(LocalDate expireDateFrom) {
        return (root, query, criteriaBuilder) -> {

            if (expireDateFrom == null) {
                return null;
            }

            return criteriaBuilder.greaterThanOrEqualTo(root.get("expireDate"), expireDateFrom);
        };
    }

    public static Specification<MedicineInventory> expireDateTo(LocalDate expireDateTo) {
        return (root, query, criteriaBuilder) -> {

            if (expireDateTo == null) {
                return null;
            }

            return criteriaBuilder.lessThanOrEqualTo(root.get("expireDate"), expireDateTo);
        };
    }

    public static Specification<MedicineInventory> availableOnly(Boolean availableOnly) {
        return (root, query, criteriaBuilder) -> {

            if (availableOnly == null || !availableOnly) {
                return null;
            }

            return criteriaBuilder.and(criteriaBuilder.greaterThan(root.get("quantityInStock"), 0),
                    criteriaBuilder.greaterThanOrEqualTo(root.get("expireDate"), LocalDate.now()));
        };
    }
}