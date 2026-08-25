package com.ocms.online_clinic_management_system.patient.repository;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import com.ocms.online_clinic_management_system.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long>, JpaSpecificationExecutor<Patient> {

    Optional<Patient> findByUser(User user);
    Optional<Patient> findByCitizenId(String citizenId);
    Optional<Patient> findByUserId(Long userId);
    boolean existsByCitizenId(String citizenId);
    boolean existsByCitizenIdAndIdNot(String citizenId, Long patientId);

}