package com.ocms.online_clinic_management_system.laboratory.repository;
import com.ocms.online_clinic_management_system.common.constant.enums.TestOrderStatus;
import com.ocms.online_clinic_management_system.laboratory.entity.TestOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestOrderRepository extends JpaRepository<TestOrder, Long> {

    List<TestOrder> findByMedicalRecordIdOrderByOrderDateDesc(Long medicalRecordId);
    List<TestOrder> findByMedicalRecordPatientIdOrderByOrderDateDesc(Long patientId);
    Page<TestOrder> findByStatusOrderByOrderDateAsc(TestOrderStatus status, Pageable pageable);
}