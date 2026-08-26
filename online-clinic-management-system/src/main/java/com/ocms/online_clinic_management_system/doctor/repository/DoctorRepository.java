package com.ocms.online_clinic_management_system.doctor.repository;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> , JpaSpecificationExecutor<Doctor> {

    Optional<Doctor> findByUser(User user);
    boolean existsByUser(User user);
    Optional<Doctor> findByUserId(Long userId);
}