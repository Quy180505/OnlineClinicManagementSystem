package com.ocms.online_clinic_management_system.inventory.repository;
import com.ocms.online_clinic_management_system.inventory.entity.MedicineCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.Optional;

public interface MedicineCategoryRepository extends JpaRepository<MedicineCategory, Long>, JpaSpecificationExecutor<MedicineCategory> {

    boolean existsByCategoryNameIgnoreCase(String categoryName);
    Optional<MedicineCategory> findByCategoryNameIgnoreCase(String categoryName);
    boolean existsByCategoryNameIgnoreCaseAndIdNot(String categoryName, Long id);
}