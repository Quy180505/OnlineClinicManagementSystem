package com.ocms.online_clinic_management_system.prescription.repository;
import com.ocms.online_clinic_management_system.prescription.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.Optional;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long>, JpaSpecificationExecutor<Prescription> {

    Optional<Prescription> findByMedicalRecordId(Long medicalRecordId);
    boolean existsByMedicalRecordId(Long medicalRecordId);
}