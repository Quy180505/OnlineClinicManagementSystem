package com.ocms.online_clinic_management_system.inventory.repository;
import com.ocms.online_clinic_management_system.inventory.entity.MedicineInventory;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface MedicineInventoryRepository extends JpaRepository<MedicineInventory, Long>, JpaSpecificationExecutor<MedicineInventory> {

    List<MedicineInventory> findByMedicine_Id(Long medicineId);
    boolean existsByMedicine_IdAndQuantityInStockGreaterThan(Long medicineId, Integer quantity);
    List<MedicineInventory> findByMedicine_IdAndQuantityInStockGreaterThan(Long medicineId, Integer quantity);

    @Query("""
            SELECT COALESCE(SUM(mi.quantityInStock), 0)
            FROM MedicineInventory mi
            WHERE mi.medicine.id = :medicineId
            AND mi.expireDate >= :currentDate
            AND mi.quantityInStock > 0
            """)
    Integer getTotalAvailableQuantity(@Param("medicineId") Long medicineId, @Param("currentDate") LocalDate currentDate);

    @Query("""
            SELECT mi
            FROM MedicineInventory mi
            WHERE mi.medicine.id = :medicineId
            AND mi.expireDate >= :currentDate
            AND mi.quantityInStock > 0
            ORDER BY mi.expireDate ASC, mi.quantityInStock ASC
            """)
    List<MedicineInventory> findAvailableInventories(@Param("medicineId") Long medicineId, @Param("currentDate") LocalDate currentDate);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
            SELECT mi
            FROM MedicineInventory mi
            WHERE mi.medicine.id = :medicineId
            AND mi.expireDate >= :currentDate
            AND mi.quantityInStock > 0
            ORDER BY mi.expireDate ASC, mi.quantityInStock ASC
            """)
    List<MedicineInventory> findAvailableInventoriesForUpdate(@Param("medicineId") Long medicineId, @Param("currentDate") LocalDate currentDate);

    @Query("""
            SELECT mi
            FROM MedicineInventory mi
            WHERE mi.expireDate < :currentDate
            ORDER BY mi.expireDate ASC
            """)
    List<MedicineInventory> findExpiredInventories(@Param("currentDate") LocalDate currentDate);


}