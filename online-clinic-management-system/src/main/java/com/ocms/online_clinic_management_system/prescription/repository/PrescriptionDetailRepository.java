package com.ocms.online_clinic_management_system.prescription.repository;
import com.ocms.online_clinic_management_system.prescription.entity.PrescriptionDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PrescriptionDetailRepository extends JpaRepository<PrescriptionDetail, Long> {

    Optional<PrescriptionDetail> findByIdAndPrescriptionId(Long id, Long prescriptionId);
}
