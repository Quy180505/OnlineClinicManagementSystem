package com.ocms.online_clinic_management_system.staff.repository;

import com.ocms.online_clinic_management_system.staff.entity.Staff;
import com.ocms.online_clinic_management_system.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    Optional<Staff> findByUser(User user);

    boolean existsByUser(User user);

}