package com.ocms.online_clinic_management_system.inventory.repository;

import com.ocms.online_clinic_management_system.inventory.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface MedicineRepository extends JpaRepository<Medicine, Long>, JpaSpecificationExecutor<Medicine> {

    boolean existsByMedicineNameIgnoreCase(String medicineName);
    boolean existsByMedicineNameIgnoreCaseAndIdNot(String medicineName, Long id);
    Optional<Medicine> findByMedicineNameIgnoreCase(String medicineName);
    Optional<Medicine> findByIdAndIsActiveTrue(Long id);
    Optional<Medicine> findByIdAndIsActiveFalse(Long id);
}