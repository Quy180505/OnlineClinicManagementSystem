package com.ocms.online_clinic_management_system.laboratory.repository;
import com.ocms.online_clinic_management_system.common.constant.enums.TestOrderStatus;
import com.ocms.online_clinic_management_system.laboratory.entity.LabResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface LabResultRepository extends JpaRepository<LabResult, Long> {

    Optional<LabResult> findByTestOrderDetailId(Long testOrderDetailId);
    boolean existsByTestOrderDetailId(Long testOrderDetailId);
    List<LabResult> findByTestOrderDetail_TestOrder_MedicalRecord_Patient_IdAndTestOrderDetail_TestOrder_StatusOrderByResultDateDesc(Long patientId, TestOrderStatus status);
}