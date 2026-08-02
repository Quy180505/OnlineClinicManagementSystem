package com.ocms.online_clinic_management_system.service.repository;


import com.ocms.online_clinic_management_system.service.entity.MedicalService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicalServiceRepository extends JpaRepository<MedicalService, Long>,
        JpaSpecificationExecutor<MedicalService> {

    Optional<MedicalService> findByServiceNameAndSpecialty_Id(String serviceName, Long specialtyId);

    boolean existsByServiceNameAndSpecialty_Id(String serviceName, Long specialtyId);
    List<MedicalService> findAllBySpecialty_IdOrderByServiceName(Long specialtyId);
}