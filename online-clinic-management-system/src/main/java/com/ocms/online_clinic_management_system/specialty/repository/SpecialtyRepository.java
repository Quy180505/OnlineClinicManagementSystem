package com.ocms.online_clinic_management_system.specialty.repository;

import com.ocms.online_clinic_management_system.specialty.entity.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface SpecialtyRepository
        extends JpaRepository<Specialty, Long>, JpaSpecificationExecutor<Specialty> {

    Optional<Specialty> findByName(String name);

    boolean existsByName(String name);
}