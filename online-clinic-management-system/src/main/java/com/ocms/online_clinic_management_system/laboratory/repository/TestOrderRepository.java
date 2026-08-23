package com.ocms.online_clinic_management_system.laboratory.repository;
import com.ocms.online_clinic_management_system.laboratory.entity.TestOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestOrderRepository extends JpaRepository<TestOrder, Long> {

    List<TestOrder> findByMedicalRecordIdOrderByOrderDateDesc(Long medicalRecordId);
    List<TestOrder> findByMedicalRecordPatientIdOrderByOrderDateDesc(Long patientId);
}