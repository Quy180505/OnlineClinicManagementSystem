package com.ocms.online_clinic_management_system.patient.repository;

import com.ocms.online_clinic_management_system.patient.entity.Patient;
import com.ocms.online_clinic_management_system.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByUser(User user);

    Optional<Patient> findByCitizenId(String citizenId);

    boolean existsByCitizenId(String citizenId);

}