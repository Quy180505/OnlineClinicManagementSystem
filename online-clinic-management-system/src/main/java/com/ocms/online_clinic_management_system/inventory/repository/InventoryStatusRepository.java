package com.ocms.online_clinic_management_system.inventory.repository;
import com.ocms.online_clinic_management_system.inventory.entity.InventoryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface InventoryStatusRepository extends JpaRepository<InventoryStatus, Long> {

    Optional<InventoryStatus> findByStatusNameIgnoreCase(String statusName);
    boolean existsByStatusNameIgnoreCase(String statusName);
}